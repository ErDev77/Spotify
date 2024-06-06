import { getRequestConfig } from 'next-intl/server'

const locales = ['en', 'fr', 'ru']

export default getRequestConfig(async ({ locale }) => {
	if (!locales.includes(locale)) {
		// Возвращаем пустой объект сообщений для недостающих локалей
		return { messages: {} }
	}

	return {
		messages: (await import(`../../messages/${locale}.json`)).default,
	}
})
