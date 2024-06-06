import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'


export default async function LocaleLayout({
	children,
	params: { locale },
}: {
	children: React.ReactNode
	params: { locale: string }
}) {
	const messages = await getMessages({ locale })

	  if (!messages || Object.keys(messages).length === 0) {
			return (
				<html lang='en'>
					<body>
						<div>Locale not found</div>
					</body>
				</html>
			)
		}

	return (
		<html lang={locale}>
			<body>
				<NextIntlClientProvider locale={locale} messages={messages}>
					{children}
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
