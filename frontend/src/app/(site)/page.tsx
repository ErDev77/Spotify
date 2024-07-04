"use client";
	
import React, { useEffect, useState } from 'react'
import Header from '@/components/Header'
import ListItem from '@/components/ListItem'
import getSongs from '@/actions/getSongs';
import PageContent from './components/PageContent'
import { Song } from '../../../types'
import useTranslation from 'next-translate/useTranslation'

const Home: React.FC = () => {
	const [songs, setSongs] = useState<Song[]>([])
	const { t } = useTranslation()
	useEffect(() => {
		const fetchSongs = async () => {
			try {
				const loadedSongs = await getSongs()
				setSongs(loadedSongs)
			} catch (error) {
				console.error('Error fetching songs:', error)
			}
		}

		fetchSongs()
	}, [])


	return (
		<div className='bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto'>
			<Header>
				<div className='mb-2'>
					<h1 className='text-white text-3xl font-semibold'>{t('Welcome to Spotify')}</h1>
					<div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4'>
						<ListItem
							image='/images/liked.png'
							name='Liked Songs'
							href='songs'
						/>
					</div>
				</div>
			</Header>
			<div className='mt-2 mb-7 px-6'>
				<div className='flex justify-between items-center'>
					<h1 className='text-white text-2xl font-semibold'>{t('Popular songs')}</h1>
				</div>
				<PageContent songs={songs} />
			</div>
		</div>
	)
}

export default Home;

