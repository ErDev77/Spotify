// import createNextIntlPlugin from 'next-intl/plugin'
// const withNextIntl = createNextIntlPlugin('./src/app/i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['kzwyvxsgqdmygqixnkhd.supabase.co'],
	},
	async redirects() {
		return [
			{
				source: '/app/playlists/:id', 
				destination: '/app/playlists/[id]', 
				permanent: true,
			},
		]
	},
}

export default nextConfig;