'use client'

import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/useUser'
import { useEffect } from 'react'
import useAuthModal from '@/hooks/useAuthModal'

const ArtistsContent = () => {
	const { isLoading, user } = useUser()
	const router = useRouter()
	const authModal = useAuthModal()

	useEffect(() => {
		if (!isLoading && !user) {
			authModal.onOpen() 
		}
	}, [isLoading, user, authModal])

	useEffect(() => {
		if (!isLoading && !user) {
			router.replace('/') 
		}
	}, [isLoading, user, router])


	return null 
}

export default ArtistsContent
