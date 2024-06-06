import { useState } from 'react'
import { FaGlobe } from 'react-icons/fa'
import LanguageSwitcher from './LanguageSwitcher'
import Modal from './Modal'
import useTranslation from 'next-translate/useTranslation'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
import { setLanguage } from '@/redux/reducers/Language.Reducer'


const LanguageModal = () => {
	const [isOpen, setIsOpen] = useState(false)
	const { t } = useTranslation()
	const locale = useSelector((state: RootState) => state.language.locale)
	const dispatch = useDispatch()

	const handleOpenChange = (open: boolean) => {
		setIsOpen(open)
	}

	  const handleLanguageChange = (newLocale: string) => {
			dispatch(setLanguage(newLocale))
			setIsOpen(false)
		}

	return (
		<>
			<button
				onClick={() => handleOpenChange(true)}
				className='flex items-center px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none'
			>
				<FaGlobe className='mr-2' />
				{t('Select Language')}
			</button>
			{isOpen && (
				<Modal
					title={t('Select Language')}
					description={t('Choose your preferred language')}
					isOpen={isOpen}
					onChange={handleOpenChange}
					width='80vw'
					maxWidth='400px'
					height='auto'
					maxHeight='70vh'
				>
					<LanguageSwitcher onLanguageChange={handleLanguageChange} />
				</Modal>
			)}
		</>
	)

}

export default LanguageModal;
