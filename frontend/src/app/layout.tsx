import './globals.css'
import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import Sidebar from '@/components/Sidebar'
import SupabaseProvider from '@/providers/SupabaseProvider'
import UserProvider from '@/providers/UserProvider'
import ModalProvider from '@/providers/ModalProvider'
import ToasterProvider from '@/providers/ToasterProvider'
import getSongsByUserId from '@/actions/getSongsByUserId'
import Player from '@/components/Player';
import ClientProvider from '@/providers/ClientProvider'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Spotify',
	description: 'Welcome',
}


// export const revalidate = 0;

export default async function RootLayout({
	children,
	params
}: {
	children: React.ReactNode
	params: { locale: string }
}) {
	const { locale } = params
	const userSongs = await getSongsByUserId()
	const messages = await getMessages({ locale })

	return (
		<html lang='en'>
			<body className={font.className}>
				<NextIntlClientProvider locale={locale} messages={messages}>
					<ClientProvider>
						<ToasterProvider />
						<SupabaseProvider>
							<UserProvider>
								<ModalProvider />
								<Sidebar songs={userSongs}>{children}</Sidebar>
								<Player />
							</UserProvider>
						</SupabaseProvider>
					</ClientProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}



