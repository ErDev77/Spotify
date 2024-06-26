// pages/app/playlists/[id].tsx

import React, { useEffect, useState } from 'react'
import Header from '@/components/Header'
import PlaylistContent from './components/PlaylistsContent'
import { Playlist } from '../../../types' 
import fetchData from '../../../fetchData'
import { useRouter } from 'next/router'

const PlaylistPage = () => {
	const [playlist, setPlaylist] = useState<Playlist | null>(null)
	const router = useRouter()
	const { id } = router.query

	useEffect(() => {
		const fetchPlaylistById = async () => {
			try {
				const data = await fetchData()
				const foundPlaylist = data.find((item: Playlist) => item.id === id)
				if (foundPlaylist) {
					setPlaylist(foundPlaylist)
				} else {
					throw new Error('Плейлист не найден')
				}
			} catch (error) {
				console.error('Ошибка при загрузке плейлиста:', error)
			}
		}

		if (id) {
			fetchPlaylistById()
		}
	}, [id])

	if (!playlist) {
		return <div>Loading...</div>
	}

	return (
		<div className='bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto'>
			<Header>
				<h1 className='text-white text-4xl sm:text-5xl lg:text-7xl font-bold'>
					{playlist.title}
				</h1>
			</Header>
			<PlaylistContent playlist={[playlist]} />
		</div>
	)
}

export default PlaylistPage;
