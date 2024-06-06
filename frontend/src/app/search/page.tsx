'use client';

import getSongsByTitle from '@/actions/getSongsByTitle'
import Header from '@/components/Header'
import SearchInput from '@/components/SearchInput'
import SearchContent from './components/SearchContent'
import useTranslation from 'next-translate/useTranslation'
import { useState, useEffect } from 'react'
import { Song } from '../../../types'
interface SearchProps {
	searchParams: {
		title: string
	}
}



const Search = ({ searchParams }: SearchProps) => {
	const { t } = useTranslation()
	const [songs, setSongs] = useState<Song[]>([])

	useEffect(() => {
		const fetchSongs = async () => {
			const fetchedSongs: Song[] = await getSongsByTitle(searchParams.title)
			setSongs(fetchedSongs)
		}

		fetchSongs()
	}, [searchParams.title])
	return (
		<div
			className='
        bg-neutral-900
        rounded-lg
        h-full
        w-full
        overflow-hidden
        overflow-y-auto 
        '
		>
			<Header className='from-bg-neutral-900'>
				<div className='mb-2 flex flex-col gap-y-6'>
					<h1 className='text-white text-3xl font-semibold'>
						{t('Search')}
					</h1>
					<SearchInput />
				</div>
			</Header>
			<SearchContent songs={songs} />
		</div>
	)
}

export default Search;
