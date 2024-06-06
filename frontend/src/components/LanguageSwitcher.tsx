'use client'

import { useRouter, usePathname } from 'next/navigation'
import useTranslation from 'next-translate/useTranslation'
import { useDispatch } from 'react-redux'

interface LanguageSwitcherProps {
	onLanguageChange: (locale: string) => void
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
	onLanguageChange,
}) => {
	const router = useRouter()
	const pathname = usePathname()
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const changeLanguage = (newLocale: string) => {
		dispatch({ type: 'SET_LOCALE', payload: newLocale })
	}

	return (
		<select
			className='block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
			onChange={e => changeLanguage(e.target.value)}
		>
			<option value='en'>{t('English')}</option>
			<option value='fr'>{t('French')}</option>
			<option value='de'>{t('German')}</option>
			<option value='es'>{t('Spanish')}</option>
			<option value='ru'>{t('Russian')}</option>
		</select>
	)
}

export default LanguageSwitcher;
