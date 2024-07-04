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
				console.log('Fetching data...')
				const data = await fetchData()
				console.log('Data fetched:', data)
				const foundPlaylist = data.find(
					(item: Playlist) => item.id.toString() === id
				)
				if (foundPlaylist) {
					setPlaylist(foundPlaylist)
				} else {
					console.warn('Playlist not found, redirecting to 404')
					router.replace('/404')
				}
			} catch (error) {
				console.error('Ошибка при загрузке плейлиста:', error)
				router.replace('/404')
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
