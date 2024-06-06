

import { createClient } from '@supabase/supabase-js'
import { Song } from '../../types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error(
		'Supabase URL or Supabase anon key is missing in the environment variables.'
	)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

const getLikedSongs = async (): Promise<Song[]> => {

	const {
		data: {
			 session
		}
	} = await supabase.auth.getSession();

		if (!session?.user?.id) {
			console.error('No user session found')
			return []
		}

		const { data, error } = await supabase
			.from('liked_songs')
			.select('*')
			.eq('user_id', session?.user?.id)
			.order('created_at', { ascending: false })

			console.log('Data:', data)
			console.log('Error:', error)

	 	if (error) {
			 console.error('Error fetching liked songs:', error.message)
			return [];
		}

		if (!data) {
			console.warn('No data found for liked songs.')
			return []
		}

		return data.map((item) => ({
			...item.songs
		}))

};

export default getLikedSongs;
