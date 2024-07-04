"use client";

import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/useUser'
import { useEffect } from 'react'
import useAuthModal from '@/hooks/useAuthModal'
const ArtistsContent = () => {
    	const { isLoading, user } = useUser()
        const router = useRouter()
        const authModal = useAuthModal()
        if(!user) {
            return authModal.onOpen();
        }

		 useEffect(() => {
		if (!isLoading && !user) {
				router.replace('/')
		 	}
		}, [isLoading, user, router])
}

export default ArtistsContent;