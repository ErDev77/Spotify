// translations.ts

export type Lang = 'en' | 'fr' | 'ru'

export interface CommonTranslation {
	welcome: string
	likedSongs: string
	noSongsAvailable: string
	popularSongs: string
	search: string
	liked: string
}

export interface Translation {
	common: CommonTranslation
	header: {
		playlist: string
		likedSongs: string
	}
	search: {
		search: string
		chooseYourPreferredLanguage: string
		noSongsFound: string
	}
	modal: {
		title: string
		description: string
	}
	uploadModal: {
		uploadSongTitle: string
		uploadSongDescription: string
		selectSongFile: string
		selectImage: string
		create: string
	}
}

const translations: Record<Lang, Translation> = {
	en: {
		common: {
			welcome: 'Welcome',
			likedSongs: 'Liked Songs',
			noSongsAvailable: 'No Songs Available',
			popularSongs: 'Popular Songs',
			search: 'Search',
			liked: 'Liked',
		},
		header: {
			playlist: 'Playlist',
			likedSongs: 'Liked Songs',
		},
		search: {
			search: 'Search',
			chooseYourPreferredLanguage: 'Choose Your Preferred Language',
			noSongsFound: 'No Songs Found',
		},
		modal: {
			title: 'Welcome to Spotify',
			description: 'Log in to your account',
		},
		uploadModal: {
			uploadSongTitle: 'Upload Song Title',
			uploadSongDescription: 'Upload Song Description',
			selectSongFile: 'Select Song File',
			selectImage: 'Select Image',
			create: 'Create',
		},
	},
	fr: {
        "common": {
		"welcome": "Bienvenue sur Spotify",
		"likedSongs": "Chansons aimées",
		"noSongsAvailable": "Aucune chanson disponible",
		"popularSongs": "Chansons populaires",
		"search": "Chercher",
		"liked": "Aimé"
	},
	"header": {
		"playlist": "Playlist",
		"likedSongs": "Chansons aimées"
	},
	"search": {
		"search": "Chercher",
		"chooseYourPreferredLanguage": "Choisissez votre langue préférée",
		"noSongsFound": "Aucune chanson trouvée"
	},
	"modal": {
		"title": "Bienvenue sur Spotify",
		"description": "Connectez-vous à votre compte"
	},
	"uploadModal": {
		"uploadSongTitle": "Titre de la chanson à télécharger",
		"uploadSongDescription": "Description de la chanson à télécharger",
		"selectSongFile": "Sélectionnez un fichier audio",
		"selectImage": "Sélectionnez une image",
		"create": "Créer"
	}
},
	ru: { 
    "common": {
		"welcome": "Добро пожаловать на Spotify",
		"likedSongs": "Понравившиеся песни",
		"noSongsAvailable": "Нет доступных песен",
		"popularSongs": "Популярные песни",
		"search": "Поиск",
		"liked": "Понравилось"
	},
	"header": {
		"playlist": "Плейлист",
		"likedSongs": "Понравившиеся песни"
	},
	"search": {
		"search": "Поиск",
		"chooseYourPreferredLanguage": "Выберите ваш предпочитаемый язык",
		"noSongsFound": "Песни не найдены"
	},
	"modal": {
		"title": "Добро пожаловать на Spotify",
		"description": "Войдите в свою учетную запись"
	},
	"uploadModal": {
		"uploadSongTitle": "Заголовок загружаемой песни",
		"uploadSongDescription": "Описание загружаемой песни",
		"selectSongFile": "Выберите файл песни",
		"selectImage": "Выберите изображение",
		"create": "Создать"
	}

}
}


export default translations;
