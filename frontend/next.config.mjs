import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/app/i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ['kzwyvxsgqdmygqixnkhd.supabase.co'],
	},
}

export default withNextIntl(nextConfig)
