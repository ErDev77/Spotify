import Modal from './Modal'
import Input from './Input'
import Button from './Button'
import { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import toast from 'react-hot-toast'
import uniqid from 'uniqid'
import { useUser } from '@/hooks/useUser'

interface PlaylistModalProps {
	isOpen: boolean
	onClose: (open: boolean) => void
	user_id: string
}

const PlaylistModal: React.FC<PlaylistModalProps> = ({
	isOpen,
	onClose,
	user_id,
}) => {
	const { user } = useUser()
	const [isLoading, setIsLoading] = useState(false)
	const supabaseClient = useSupabaseClient()

	const { register, handleSubmit, reset } = useForm<FieldValues>({
		defaultValues: {
			title: '',
			image: null,
		},
	})

	const onSubmit = async (values: FieldValues) => {
		try {
			setIsLoading(true)

			const imageFile = values.image?.[0]

			if (!imageFile) {
				toast.error('Please select an image')
				return
			}

			const uniqueID = uniqid()

			const { data: imageData, error: imageError } =
				await supabaseClient.storage
					.from('images')
					.upload(`image-${values.title}-${uniqueID}`, imageFile, {
						cacheControl: '3600',
						upsert: false,
					})

			if (imageError) {
				setIsLoading(false)
				toast.error('Failed image upload')
				return
			}

			const { error: supabaseError } = await supabaseClient
				.from('playlists')
				.insert([
					{
						user_id: user?.id,
						title: values.title,
						image_path: imageData.path,
					},
				])

			if (supabaseError) {
				setIsLoading(false)
				toast.error(supabaseError.message)
				return
			}

			toast.success('Playlist created successfully!')
			reset()
			onClose(false)
		} catch (error) {
			setIsLoading(false)
			toast.error('Failed to create playlist')
		}
	}

	const handleCloseModal = () => {
		reset()
		onClose(false)
	}

	return (
		<>
			{isOpen && (
				<Modal
					title='Create a playlist'
					description='Playlist description'
					isOpen={isOpen}
					onChange={handleCloseModal}
				>
					<form
						className='flex flex-col gap-y-4'
						onSubmit={handleSubmit(onSubmit)}
					>
						<Input
							id='title'
							disabled={isLoading}
							{...register('title', { required: true })}
							placeholder='Playlist title'
						/>
						<div>
							<div className='pb-1'>Select an image</div>
							<Input
								id='image'
								type='file'
								disabled={isLoading}
								accept='image/*'
								{...register('image', { required: true })}
							/>
						</div>
						<Button disabled={isLoading} type='submit'>
							Create
						</Button>
					</form>
				</Modal>
			)}
		</>
	)
}

export default PlaylistModal;

// "use client";

// import Modal from "./Modal";
// import Input from './Input';
// import { useState } from "react";
// import { FieldValues, useForm } from 'react-hook-form';
// import Button from './Button';
// import { useUser } from '@/hooks/useUser'
// import toast from 'react-hot-toast'
// import { useSupabase } from 'use-supabase'
// import { useRouter } from 'next/router'

// interface PlaylistModalProps {
// 	isOpen: boolean
// 	onClose: (open: boolean) => void
// }

// const PlaylistModal: React.FC<PlaylistModalProps> = ({ isOpen, onClose }) => {
// 	const [isLoading, setIsLoading] = useState(false)

// 	const { register } = useForm<FieldValues>({
// 		defaultValues: {
// 			title: '',
// 			image: null,
// 		},
// 	})

// 	return (
// 		<>
// 			{isOpen && (
// 				<Modal
// 					title='Create a playlist'
// 					description='Playlist description'
// 					isOpen={isOpen}
// 					onChange={onClose}
// 				>
// 					<form className='flex flex-col gap-y-4'>
// 						<Input
// 							id='title'
// 							disabled={isLoading}
// 							{...register('title', { required: true })}
// 							placeholder='Playlist title'
// 						/>
// 						<div>
// 							<div className='pb-1'>Select an image</div>
// 							<Input
// 								id='image'
// 								type='file'
// 								disabled={isLoading}
// 								accept='image/*'
// 								{...register('image', { required: true })}
// 							/>
// 						</div>
// 						<Button disabled={isLoading} type='submit'>
// 							Create
// 						</Button>
// 					</form>
// 				</Modal>
// 			)}
// 		</>
// 	)
// }

// export default PlaylistModal;
