import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
	const provider = new ethers.providers.Web3Provider(ethereum);
	const signer = provider.getSigner();
	const transactionContract = new ethers.Contract(
		contractAddress,
		contractABI,
		signer
	);

	return transactionContract;
};

export const TransactionProvider = ({ children }) => {
	const [currentAccount, setCurrentAccount] = useState('');
	const [transactions, setTransactions] = useState([]);
	const [formData, setFormData] = useState({
		addressTo: '',
		amount: '',
		keyword: '',
		message: '',
	});
	const [loading, setLoading] = useState(false);
	const [transactionCount, setTransactionCount] = useState(
		localStorage.getItem('transactionCount')
	);

	const handleChange = (e, name) => {
		setFormData((prev) => ({ ...prev, [name]: e.target.value }));
	};

	const getAllTransaction = async () => {
		try {
			if (!ethereum) alert('You dont have ethereum wallet installed');
			const transactionContract = getEthereumContract();
			const awailableTransaction =
				await transactionContract.getAllTransactions();

			const structuredTransactions = awailableTransaction.map(
				(transaction) => ({
					addressTo: transaction.receiver,
					addressFrom: transaction.sender,
					timestamp: new Date(
						transaction.timestamp.toNumber() * 1000
					).toLocaleString(),
					message: transaction.message,
					keyword: transaction.keyword,
					amount: parseInt(transaction.amount._hex) / 10 ** 18,
				})
			);
			console.log(structuredTransactions);
			setTransactions(structuredTransactions);
		} catch (error) {
			console.log(error);
			throw new Error(error.message);
		}
	};

	const checkIfWalletIsConnected = async () => {
		try {
			if (!ethereum) alert('You dont have ethereum wallet installed');
			const accounts = await ethereum.request({ method: 'eth_accounts' });
			if (accounts.length > 0) {
				setCurrentAccount(accounts[0]);
			} else {
				console.log('NO accoutns found');
			}
			console.log(accounts);
		} catch (error) {
			console.log(error);
			throw new Error(error.message);
		}
	};

	const connectWallet = async () => {
		try {
			console.log('COnnetct called ');
			if (!ethereum) alert('You dont have ethereum wallet installed');
			const accounts = await ethereum.request({
				method: 'eth_requestAccounts',
			});
			console.log(accounts);
			setCurrentAccount(accounts[0]);
		} catch (error) {
			console.log(error);
			throw new Error(error.message);
		}
	};

	const checkIfTransactionsExist = async () => {
		try {
			const transactionContract = getEthereumContract();
			const transactionCount = await transactionContract.getTransactionCount();

			window.localStorage.setItem('transactionCount', transactionCount);
		} catch (error) {
			console.log(error);
			throw new Error(error.message);
		}
	};

	const sendTransaction = async () => {
		try {
			if (!ethereum) alert('You dont have ethereum wallet installed');
			const { addressTo, amount, message, keyword } = formData;
			const transactionContract = getEthereumContract();
			const parsedAmount = ethers.utils.parseEther(amount);
			// console.log(formData, parsedAmount);
			await ethereum.request({
				method: 'eth_sendTransaction',
				params: [
					{
						from: currentAccount,
						to: addressTo,
						gas: '0x5208',
						value: parsedAmount._hex,
					},
				],
			});
			const txn = await transactionContract.addToBlockchain(
				addressTo,
				parsedAmount,
				message,
				keyword
			);
			setLoading(true);
			console.log(`Loading-${txn.hash}`);
			await txn.wait();
			setLoading(false);
			console.log(`Sucess-${txn.hash}`);

			const transactionCount = await transactionContract.getTransactionCount();
			setTransactionCount(transactionCount.toNumber());
			window.reload();
		} catch (error) {
			console.log(error);
			throw new Error(error.message);
		}
	};

	useEffect(() => {
		checkIfWalletIsConnected();
		checkIfTransactionsExist();
		getAllTransaction();
	}, []);

	return (
		<TransactionContext.Provider
			value={{
				connectWallet,
				currentAccount,
				formData,
				setFormData,
				handleChange,
				sendTransaction,
				transactions,
				loading,
			}}
		>
			{children}
		</TransactionContext.Provider>
	);
};
