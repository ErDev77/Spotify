"use client";

import React from 'react';
import Link from 'next/link';

const Error = () => {
  return (
		<div className='min-h-screen flex flex-col items-center justify-center bg-neutral-900 text-white'>
			<h1 className='text-6xl font-bold'>404</h1>
			<p className='text-2xl mt-4'>Page Not Found</p>
			<Link legacyBehavior href='/'>
				<a className='mt-6 text-blue-500 underline'>Go back to Home</a>
			</Link>
		</div>
	)
};

 export default Error;