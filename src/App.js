import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Footer, Navbar, Transactions, Welcome } from './components';

const App = () => {
	if (!window.ethereum) {
		return (
			<div className="w-full h-screen flex justify-center items-center gradient-bg-welcome">
				<h1 className="text-2xl text-white text-center">
					Metamask or other EIP-1102 / EIP-1193 compliant wallet not found,
					<br />
					Please install Metamask
				</h1>
			</div>
		);
	}

	return (
		<div className="min-h-screen">
			<Toaster />
			<div className="gradient-bg-welcome">
				<Navbar />
				<Welcome />
			</div>
			<Transactions />
			<Footer />
		</div>
	);
};

export default App;
