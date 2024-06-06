// import  useTranslation  from 'next-translate/useTranslation'
// import en from '../../messages/en.json'
// import fr from '../../messages/fr.json'
// import ru from '../../messages/ru.json'

// type Lang = 'en' | 'fr' | 'ru'

// interface CommonTranslation {
// 	welcome: string
// 	likedSongs: string
// 	noSongsAvailable: string
// 	popularSongs: string
// 	search: string
// 	liked: string
// }

// interface Translation {
// 	common: CommonTranslation
// 	header: {
// 		playlist: string
// 		likedSongs: string
// 	}
// 	search: {
// 		search: string
// 		chooseYourPreferredLanguage: string
// 		noSongsFound: string
// 	}
// 	modal: {
// 		title: string
// 		description: string
// 	}
// 	uploadModal: {
// 		uploadSongTitle: string
// 		uploadSongDescription: string
// 		selectSongFile: string
// 		selectImage: string
// 		create: string
// 	}
// }

// const translations: Record<Lang, Translation> = { en, fr, ru }
// const useTranslationCustom = (lang: Lang) => {
// 	const currentLang = lang as Lang

// 	const t = (key: keyof CommonTranslation) => {
// 		const translation = translations[currentLang]
// 		if (translation && translation.common[key]) {
// 			return translation.common[key]
// 		} else {
// 			return key
// 		}
// 	}

// 	return { t }
// }


// export default useTranslationCustom


import useTranslation from 'next-translate/useTranslation'

const useTranslationCustom = () => {
	const { t } = useTranslation()
	return { t }
}

export default useTranslationCustom;