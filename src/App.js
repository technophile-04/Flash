import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Footer, Navbar, Transactions, Welcome } from './components';

const App = () => {
	if (!window.ethereum) {
		return (
			<div className="w-full h-screen flex justify-center items-center bg-black">
				<h1 className="text-2xl text-white">
					Please intall wallet like Metamask
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
