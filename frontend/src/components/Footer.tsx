import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
	return (
		<footer className="text-white py-8 px-4 sm:px-6 lg:px-8">
			<div className="flex flex-col sm:flex-row sm:justify-between max-w-6xl mx-auto space-y-4 sm:space-y-0 sm:space-x-8 ml-4">
				<div className="flex flex-col mb-4 sm:mb-0 space-y-2 text-neutral-400">
					<a href="https://www.spotify.com/am/about-us/contact/" target="_blank" rel="noopener noreferrer" className='hover:text-white transition'>About us</a>
					<a href="https://support.spotify.com/am/" target="_blank" rel="noopener noreferrer" className='hover:text-white transition'>Support</a>
					<a href="https://ads.spotify.com/en-US/" target="_blank" rel="noopener noreferrer" className='hover:text-white transition'>Ads</a>
				</div>

				<div className="flex flex-col space-y-2 text-neutral-400">
					<a href="https://www.spotify.com/am/safetyandprivacy/reporting-content" target="_blank" rel="noopener noreferrer" className='hover:text-white transition'>Privacy Center</a>
					<a href="https://www.spotify.com/am/legal/cookies-policy/" target="_blank" rel="noopener noreferrer" className='hover:text-white transition'>Cookie Policy</a>
					<a href="https://www.spotify.com/am/legal/end-user-agreement/" target="_blank" rel="noopener noreferrer" className='hover:text-white transition'>Legal</a>
				</div>
			</div>

			<div className="flex justify-center items-center mt-8 space-x-4">
				<a href="https://www.instagram.com/spotify/" target="_blank" rel="noopener noreferrer">
					<FaInstagram size={30} />
				</a>
				<a href="https://x.com/spotify" target="_blank" rel="noopener noreferrer">
					<FaTwitter size={30} />
				</a>
				<a href="https://www.facebook.com/Spotify" target="_blank" rel="noopener noreferrer">
					<FaFacebook size={30} />
				</a>
			</div>

			<div className="mt-8 text-sm text-center sm:text-left ml-12">
				<a>© 2024 Spotify AB</a>
			</div>
		</footer>
	);
};

export default Footer;
