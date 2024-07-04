"use client";

import React, { useEffect, useState } from 'react'
import Header from "@/components/Header";
import SongsContent from "./components/SongsContent";
import getSongs from '@/actions/getSongs'
import { Song } from '../../../types'
import { useUser } from '@/hooks/useUser'
import { useSessionContext } from '@supabase/auth-helpers-react';

const Songs: React.FC = () => {
		const [songs, setSongs] = useState<Song[]>([])
		const { user } = useUser()
		const { supabaseClient } = useSessionContext()

	useEffect(() => {
		const fetchLikedSongs = async () => {
			if (!user) {
				return
			}

			try {
				const { data, error } = await supabaseClient
					.from('liked_songs')
					.select('*, songs(*)')
					.eq('user_id', user.id)

				if (error) {
					console.error('Error fetching liked songs:', error)
				} else {
					const songs = data.map((item: any) => item.songs)
					setSongs(songs)
				}
			} catch (error) {
				console.error('Error fetching songs:', error)
			}
		}

		fetchLikedSongs()
	}, [supabaseClient, user])

	return (
		<div className='bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto'>
			<Header>
				<div className='mt-20'>
					<div className='flex flex-col md:flex-row items-center gap-x-5'>
						<div className='flex flex-col gap-y-2 mt-4 md:mt-0'>
							<h1 className='text-white text-4xl sm:text-5xl lg:text-7xl font-bold'>
								Songs
							</h1>
						</div>
					</div>
				</div>
			</Header>
			<div className="p-6">
				<SongsContent songs={songs} />
			</div>
		</div>
	)
}

export default Songs;
