import '@/styles/globals.css';
import React from 'react';
import Link from 'next/link';
import { logo } from '@/public/assets';
import Image from 'next/image';

export default function App({ Component, pageProps }) {
	return (
		<React.Fragment>
			<header className=" max-w-5xl mx-auto flex justify-between items-centerbg-white sm:px-0 px-4 py-4 border-b border-b-[#e6ebf4]">
				<Link href="/">
					<Image src={logo} alt="logo" className="w-28 object-contain" />
				</Link>

				<Link
					href="/createpost"
					className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
				>
					Create
				</Link>
			</header>
			<main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
				<Component {...pageProps} />
			</main>
		</React.Fragment>
	);
}
