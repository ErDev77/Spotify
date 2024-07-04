'use client'

import React from 'react'
import { Song } from '../../../../types'
import LibrarySongItem from '../../../components/LibrarySongItem' 
import useOnPlay from '@/hooks/useOnPlay'
import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/useUser'
import { useEffect } from 'react'

interface SongsContent {
	songs: Song[]
}

const SongsContent: React.FC<SongsContent> = ({
    songs
}) => {

	    const { isLoading, user } = useUser()
		const router = useRouter()

		useEffect(() => {
			if (!isLoading && !user) {
				router.replace('/')
			}
		}, [isLoading, user, router])

 		const onPlay = useOnPlay(songs);

    if(songs.length === 0) {
        return (
            <div className="mt-4 text-neutral-400">
                No songs available
            </div>
        )
    }


    return (
			<div
				className='
			flex flex-col gap-4 mt-4
        '
			>
				{songs.map(item => (
					<LibrarySongItem
                        song={item}
						key={item.id}
						onClick={(id: string) => onPlay(id)}
						data={item}
					/>
				))}
			</div>
		)

}

export default SongsContent;