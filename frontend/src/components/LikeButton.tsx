"use client";

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSessionContext } from '@supabase/auth-helpers-react'
import toast from 'react-hot-toast'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import useAuthModal from '@/hooks/useAuthModal'
import { useUser } from '@/hooks/useUser'

interface LikeButtonProps {
	songId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ songId }) => {
	const router = useRouter();
	const authModal = useAuthModal();
	const { user } = useUser();
	const { supabaseClient } = useSessionContext();

	const [isLiked, setIsLiked] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			if (!songId) {
				return [];
			}

			if (!user || !user.id) {
				return
			}

			const { data, error } = await supabaseClient
				.from('liked_songs')
				.select('*')
				.eq('user_id', user.id)
				.eq('song_id', songId)
				.single()

        if(!error && data) {
        setIsLiked(true);
        } else if (data) {
			setIsLiked(true)
		    }

		if (error) {
        console.error('Error fetching liked songs:', error.message);
      } else if (data) {
        setIsLiked(true);
      }	
		}

		fetchData()
	}, [songId, supabaseClient, user]);

    const Icon = isLiked ? AiFillHeart : AiOutlineHeart

	const handleLike = async () => {
		 if (!user) {
            return  authModal.onOpen();
        }

        if(isLiked) {
            const { error } = await supabaseClient
            .from("liked_songs")
            .delete()
            .eq("user_id", user.id)
            .eq("song_id", songId)

            if(error) {
                toast.error(error.message)
            } else {
                setIsLiked(false);
            }
        } else {
            const { error } = await supabaseClient
            .from("liked_songs")
            .insert({
                song_id: songId,
                user_id: user.id
            })

            if(error) {
                toast.error(error.message);
            } else {
                setIsLiked(true);
                toast.success("Liked!");    
            }
        }
        router.refresh();
	}

	return (
		<button onClick={handleLike} className='hover:opacity-75 transition'>
			{isLiked ? (
				<AiFillHeart color='#22c55e' size={25} />
			) : (
				<AiOutlineHeart color='white' size={25} />
			)}
		</button>
	)
}

export default LikeButton;
