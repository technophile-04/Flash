import React, { useContext, useState } from 'react';
import { HiMenuAlt4 } from 'react-icons/hi';
import { AiFillPlayCircle, AiOutlineClose } from 'react-icons/ai';
import { TransactionContext } from '../context/TransactionContext';

const Navbar = () => {
	const { currentAccount, connectWallet } = useContext(TransactionContext);
	const [toggleMenu, setToggleMenu] = useState(false);

	return (
		<nav className="w-full flex md:justify-center justify-between p-4 items-center">
			<div className="text-white md:flex-[0.5]  flex-initial justify-center items-center">
				<div className="flex items-center">
					<p className="text-3xl font-logo font-medium  mr-2">Flash</p>
					<span className="text-3xl">⚡️</span>
				</div>
			</div>
			<ul className="text-white md:flex hidden list-none justify-between items-center flex-initial">
				<li className="mx-4 cursor-pointer font-semibold">
					<a href="#transactions">Transactions</a>
				</li>
				{!currentAccount && (
					<li>
						<button
							type="button"
							className="flex flex-row justify-center items-center  bg-[rgb(41,82,227)] p-2 px-3 rounded-full cursor-pointer hover:bg-[#2546bd] mx-2  pr-4"
							onClick={connectWallet}
						>
							<AiFillPlayCircle className="text-white mr-2" />
							<p className="text-white text-base font-semibold">
								Connect Wallet
							</p>
						</button>
					</li>
				)}
			</ul>
			<div className="flex relative">
				{toggleMenu ? (
					<AiOutlineClose
						fontSize={28}
						className="text-white md:hidden cursor-pointer"
						onClick={() => setToggleMenu(false)}
					/>
				) : (
					<HiMenuAlt4
						fontSize={28}
						className="text-white md:hidden cursor-pointer"
						onClick={() => setToggleMenu(true)}
					/>
				)}
				{toggleMenu && (
					<ul
						className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
				flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
					>
						<li className="text-xl w-full my-2">
							<AiOutlineClose onClick={() => setToggleMenu(false)} />
						</li>
						<li className="mx-4 cursor-pointer font-semibold my-2 text-lg">
							<a href="#transactions">Transactions</a>
						</li>
					</ul>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
