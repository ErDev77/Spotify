'use client';

import Link from 'next/link'
import { Playlist } from '../../types'
import Image from 'next/image'
import useLoadImage from '@/hooks/useLoadImage';
interface PlaylistItemProps {
	playlist: Playlist;
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({ playlist }) => {

const imagePath = useLoadImage(playlist) as string | null

	return (
		<Link href={`/playlists/${playlist.id}`}>
			<div
				className='
					relative
					group
					flex
					flex-col
					items-center
					justify-center
					rounded-md
					overflow-hidden
					gap-x-2
					bg-neutral-400-5
					cursor-pointer
					hover:bg-neutral-400/10
					transition
					p-3
				'
			>
				<div
					className='
						relative
						aspect-square
						w-full
						h-full
						rounded-md
						overflow-hidden
					'
				>
					{imagePath && (
						<Image className='object-cover' src={imagePath} fill alt='Image' />
					)}
				</div>
				<div
					className='
						flex
						flex-col
						items-start
						w-full
						pt-4
						gap-y-1
					'
				>
					<p
						className='
							font-semibold
							truncate
							w-full
						'
					>
						{playlist.title}
					</p>
				</div>
			</div>
		</Link>
	)
}

export default PlaylistItem;
