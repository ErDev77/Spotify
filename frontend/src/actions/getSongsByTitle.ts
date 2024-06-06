
import { createClient } from '@supabase/supabase-js'
import { Song } from '../../types'
import getSongs from './getSongs'


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY


if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error(
		'Supabase URL or Supabase anon key is missing in the environment variables.'
	)
}


const supabase = createClient(supabaseUrl, supabaseAnonKey)

const getSongsByTitle = async (title: string): Promise<Song[]> => {

	if(!title) {
		const allSongs = await getSongs();
		return allSongs;
	}

	const { data, error } = await supabase
	.from("songs")
	.select("*")
	.ilike("title", `%${title}%`)
	.order("created_at", { ascending: false });

	if(error) {
		console.log(error.message);
	}

	return data || []
}

export default getSongsByTitle;
