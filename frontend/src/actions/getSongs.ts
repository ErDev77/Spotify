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

const getSongs = async (): Promise<Song[]> => {

		const { data, error } = await supabase
			.from('songs')
			.select('*')
			.order('created_at', { ascending: false })

		if (error) {
			console.log(error);
		}

		return (data as any) || []
}

export default getSongs;
