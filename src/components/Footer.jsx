import React from 'react';

const Footer = () => (
	<div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
		<div className="flex justify-center items-center flex-col mt-5">
			<p className="text-white text-center text-lg">
				Made with 💜 by{' '}
				<a
					href="https://shiv-bhonde.netlify.app/"
					className="text-purple-500"
					target="_blank"
					rel="noreferrer"
				>
					Shiv Bhonde
				</a>
			</p>
		</div>
	</div>
);

export default Footer;
