import React, { useContext } from 'react';
import { SiEthereum } from 'react-icons/si';
import { BsInfoCircle } from 'react-icons/bs';
import { Loader } from '.';
import { TransactionContext } from '../context/TransactionContext';
import { shortenAddress } from '../utils/shortenAddress';
import toast from 'react-hot-toast';

const Input = ({ placeholder, name, type, value, handleChange }) => (
	<input
		placeholder={placeholder}
		type={type}
		step="0.0001"
		value={value}
		onChange={(e) => handleChange(e, name)}
		className="my-2 w-full py-2 px-4 outline-none bg-transparent text-white border-none text-sm white-glassmorphism rounded-2xl"
	/>
);

const Welcome = () => {
	const {
		isCorrectNetwork,
		currentAccount,
		formData,
		handleChange,
		sendTransaction,
		loading,
	} = useContext(TransactionContext);
	const handleSubmit = (e) => {
		e.preventDefault();
		const { addressTo, amount, message, keyword } = formData;

		if (!addressTo || !amount || !message || !keyword) {
			toast.error('Please fill all the fields!');
			return;
		}
		if (isCorrectNetwork) {
			sendTransaction();
		} else {
			toast.error('Please select Ropsten network!');
		}
	};

	return (
		<div className="flex w-full justify-center items-center">
			<div className="flex mf:flex-row flex-col items-start justify-between mf:p-20 mf:py-12 py-12 px-4">
				<div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
					<div className="p-3 flex justify-end items-start flex-col rounded-xl h-44 sm:w-[23.5rem] w-full my-5 eth-card">
						<div className="flex justify-between flex-col w-full h-full">
							<div className="flex justify-between items-start">
								<div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
									<SiEthereum fontSize={21} color="#fff" />
								</div>
								<BsInfoCircle fontSize={17} color="#fff" />
							</div>
							<div>
								<p className="text-white font-semibold text-sm">
									{shortenAddress(currentAccount)}
								</p>
								<p className="text-white font-bold text-lg mt-1">Ethereum</p>
							</div>
						</div>
					</div>
					<div className="p-5 sm:w-[30rem] w-full flex flex-col justify-start items-center blue-glassmorphism">
						<Input
							placeholder="Address To"
							name="addressTo"
							type="text"
							handleChange={handleChange}
						/>
						<Input
							placeholder="Amount (ETH)"
							name="amount"
							type="number"
							handleChange={handleChange}
						/>
						<Input
							placeholder="Keyword (Gif)"
							name="keyword"
							type="text"
							handleChange={handleChange}
						/>
						<Input
							placeholder="Enter Message"
							name="message"
							type="text"
							handleChange={handleChange}
						/>

						<div className="h-[1px] w-full bg-gray-400 my-2" />

						{loading ? (
							<Loader />
						) : (
							<button
								type="button"
								onClick={handleSubmit}
								className="text-white w-full mt-2 border-[1px] p-2 border-[#433d7c] transition-all ease-out duration-500  hover:bg-[#433d7c] rounded-full cursor-pointer"
							>
								Send now
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Welcome;
