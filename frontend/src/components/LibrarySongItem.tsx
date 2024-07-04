'use client'

import useLoadImage from '@/hooks/useLoadImage'
import { Song } from '../../types'
import Image from 'next/image'
import LikeButton from './LikeButton';


interface LibrarySongItemProps {
	data: Song,
	onClick: (id: string) => void,
	song: Song
}

const LibrarySongItem: React.FC<LibrarySongItemProps> = ({
	data,
	onClick,
	song,
}) => {
	const imagePath = useLoadImage(data)

	return (
		<div
			onClick={() => onClick(data.id)}
			className='
				flex
				items-center
				justify-between
				w-full
				bg-neutral-900
				cursor-pointer
				hover:bg-neutral-800
				transition
				p-1
				rounded-md
			'
		>
			<div className='flex items-center gap-x-4'>
				<div className='relative w-16 h-16 rounded-md overflow-hidden'>
					<Image
						className='object-cover'
						src={imagePath || '/Spotify/frontend/public/images/liked.png'}
						fill
						alt='Image'
					/>
				</div>
				<div className='flex flex-col'>
					<p className='text-white font-semibold truncate'>{data.title}</p>
					<p className='text-neutral-400 text-sm truncate'>{data.author}</p>
				</div>
			</div>
			<div className='flex items-center gap-x-2'>
				<LikeButton songId={song.id} />
			</div>
		</div>
	)
}

export default LibrarySongItem

// "use client";

// import useLoadImage from '@/hooks/useLoadImage';
// import { Song } from '../../types';
// import Image from 'next/image';

// interface LibrarySongItem {
// 	data: Song;
// 	onClick: (id: string) => void;
// }

// const LibrarySongItem: React.FC<LibrarySongItem> = ({
//     data,
//     onClick
// }) => {
//     const imagePath = useLoadImage(data);

// return (
// 	<div
// 		onClick={() => onClick(data.id)}
// 		className='
// 				flex
// 				items-center
// 				justify-between
// 				w-full
// 				bg-neutral-400/5
// 				cursor-pointer
// 				hover:bg-neutral-400/10
// 				transition
// 				p-4
// 				rounded-md
// 			'
// 	>
// 		<div className='flex items-center gap-x-4'>
// 			<div className='relative w-16 h-16 rounded-md overflow-hidden'>
// 				<Image
// 					className='object-cover'
// 					src={imagePath || '/Spotify/frontend/public/images/liked.png'}
// 					fill
// 					alt='Image'
// 				/>
// 			</div>
// 			<div className='flex flex-col'>
// 				<p className='text-white font-semibold truncate'>{data.title}</p>
// 				<p className='text-neutral-400 text-sm truncate'>{data.author}</p>
// 			</div>
// 		</div>
// 	</div>
// )
// }

// export default LibrarySongItem;
