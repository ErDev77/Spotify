'use client'
import React, { useState, useEffect } from 'react'
import Input from '@/components/Input'
import {
	useSupabaseClient,
	useSessionContext,
} from '@supabase/auth-helpers-react'
import { User } from '@supabase/supabase-js'
import { toast } from 'react-hot-toast'

const AccountContent = () => {
	const supabase = useSupabaseClient()
	const { session } = useSessionContext()
	const user: User | null = session?.user ?? null
	const [name, setName] = useState('')
	const [surname, setSurname] = useState('')
	const [email, setEmail] = useState('')
	const [currentPassword, setCurrentPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [songCount, setSongCount] = useState(0)
	const [playlistCount, setPlaylistCount] = useState(0)
	const [passwordLength, setPasswordLength] = useState(0) // State to hold password length

    useEffect(() => {
			const fetchData = async () => {
				if (user) {
					// Получение текущего пароля из базы данных
					const { data: userCredentials, error: credentialsError } =
						await supabase
							.from('user_credentials')
							.select('password')
							.eq('user_id', user.id)
							.single()
					if (credentialsError) {
						console.error(
							'Error fetching user credentials:',
							credentialsError.message
						)
						return
					}
					setCurrentPassword(userCredentials?.password || '') // Установка текущего пароля
				}
			}

			fetchData()
		}, [supabase, user])

	useEffect(() => {
		const fetchData = async () => {
			if (user) {
				setEmail(user.email || '')

    

				// Fetch user data
				const { data: userData, error: userError } = await supabase
					.from('users')
					.select('name, surname, password_length')
					.eq('id', user.id)
					.single()
				if (userError) {
					console.error('Error fetching user data:', userError.message)
					return
				}
				setName(userData?.name || '')
				setSurname(userData?.surname || '')
				setPasswordLength(userData?.password_length || 0) 
				setCurrentPassword('your_current_password') 

				const { data: songs, error: songError } = await supabase
					.from('songs')
					.select('*')
					.eq('user_id', user.id)
				if (songError) {
					console.error('Error fetching songs:', songError.message)
					return
				}

				const { data: playlists, error: playlistError } = await supabase
					.from('playlists')
					.select('*')
					.eq('user_id', user.id)
				if (playlistError) {
					console.error('Error fetching playlists:', playlistError.message)
					return
				}

				setSongCount(songs?.length || 0)
				setPlaylistCount(playlists?.length || 0)
			}
		}

		fetchData()
	}, [supabase, user])

	const handleSave = async () => {
		if (user) {
			const updates = {
				id: user.id,
				name,
				surname,
				updated_at: new Date().toISOString(),
			}

			// Update user data in 'users' table
			const { error: updateError } = await supabase
				.from('users')
				.upsert(updates)
			if (updateError) {
				console.error('Error saving user data:', updateError.message)
				toast.error('Error saving changes!')
				return
			}

			// Update password if 'newPassword' is provided
			if (newPassword) {
				try {
					const { error: passwordError } = await supabase.auth.updateUser({
						password: newPassword,
					})
					if (passwordError) {
						console.error('Error updating password:', passwordError.message)
						toast.error('Error updating password!')
						return
					}
					toast.success('Password updated successfully!')
					setNewPassword('')
					setCurrentPassword('')
				} catch (error: any) {
					console.error('Error updating password:', error.message)
					toast.error('Error updating password!')
				}
			}

			toast.success('Changes saved successfully!')
		}
	}

	return (
		<div className='p-6 space-y-6'>
			<div className='flex space-x-4'>
				<Input
					type='text'
					value={name}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setName(e.target.value)
					}
					placeholder='Name'
					className='flex-1'
				/>
				<Input
					type='text'
					value={surname}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setSurname(e.target.value)
					}
					placeholder='Surname'
					className='flex-1'
				/>
			</div>
			<Input
				type='email'
				value={email}
				disabled
				placeholder='Email'
				className='opacity-50 cursor-not-allowed'
			/>
			<Input
				type='password'
				value={currentPassword.substring(0, 8)}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setCurrentPassword(e.target.value)
				}
				placeholder='Current Password'
				readOnly
			/>
			<Input
				type='password'
				value={newPassword}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setNewPassword(e.target.value)
				}
				placeholder='New Password'
			/>
			<button
				onClick={handleSave}
				className='bg-blue-500 text-white px-4 py-2 rounded-lg'
			>
				Save Changes
			</button>
			<div className='text-white mt-6'>
				<h2 className='text-xl font-semibold'>Account Information</h2>
				<p>Songs: {songCount}</p>
				<p>Playlists: {playlistCount}</p>
			</div>
		</div>
	)
}

export default AccountContent;
