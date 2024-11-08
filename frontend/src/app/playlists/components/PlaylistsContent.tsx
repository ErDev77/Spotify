import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import PlaylistItem from '@/components/PlaylistItem'
import { Playlist, Song } from '../../../../types'
import fetchData from '../../../../fetchData'
import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/useUser';

interface PlaylistContentProps {
	playlist: Playlist[];
	songs: Song[];
}

const PlaylistContent: React.FC<PlaylistContentProps> = ({ playlist }) => {
	const [loadedPlaylists, setLoadedPlaylists] = useState<Playlist[]>([])
    const { isLoading, user } = useUser()
	const router = useRouter()
	    useEffect(() => {
        if(!isLoading && !user) {
            router.replace('/');
        }
    }, [isLoading, user, router]);

	useEffect(() => {
		const fetchPlaylists = async () => {
			try {
				const data = await fetchData()
				setLoadedPlaylists(data)
			} catch (error) {
				console.error('Ошибка при загрузке плейлистов:', error)
			}
		}

		fetchPlaylists()
	}, [])


	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4'>
			{loadedPlaylists.map(playlist => (
				<PlaylistItem
					key={playlist.id}
					playlist={playlist}
				/>
			))}
		</div>
	)
}

export default PlaylistContent;
