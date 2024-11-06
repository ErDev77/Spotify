'use client';

import Header from '@/components/Header'
import { RiPlayListAddLine } from 'react-icons/ri'
import useAuthModal from '@/hooks/useAuthModal'
import { useUser } from '@/hooks/useUser'
import PlaylistModal from '@/components/PlaylistModal';
import { useState } from 'react';
import PlaylistContent from './components/PlaylistsContent'; 
import { fetchData } from '../../../fetchData';

const Playlists = () => {
	const { user } = useUser()
	const authModal = useAuthModal();
	const [isPlaylistModalOpen, setPlaylistModalOpen] = useState(false);

	const onClick = () => {
		if (!user) {
			return authModal.onOpen()
		}

		return setPlaylistModalOpen(true);
	}

	const handleCloseModal = () => {
			setPlaylistModalOpen(false)
		}

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
			<Header>
				<div className='mt-20'>
					<div
						className='
                    flex
                    flex-col
                    md:flex-row
                    items-center
                    gap-x-5
                    '
					>
						<div
							className='
                        cursor-pointer
                        relative
                        items-center
                        h-10
                        w-22
                        lg:h-10
                        lg:w-20
                        '
						>
							<RiPlayListAddLine size={40} onClick={onClick} />
						</div>
						<div
							className='
                        flex
                        flex-col
                        gap-y-2
                        mt-4
                        md:mt-0
                        '
						>
							<h1
								className='
                            text-white
                            text-4xl
                            sm:text-5xl
                            lg:text-7xl
                            font-bold
                            '
							>
								Playlists
							</h1>
						</div>
					</div>
				</div>
			</Header>
			<PlaylistModal
				isOpen={isPlaylistModalOpen}
				onClose={handleCloseModal}
				user_id='user.id'
			/>
			{/* <PlaylistContent songs = {songs} playlist={[]} /> */}
		</div>
	)
}

export default Playlists;
