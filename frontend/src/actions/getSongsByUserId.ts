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

const getSongsByUserId = async (): Promise<Song[]> => {
	const {
		data: sessionData,
		error: sessionError
	} = await supabase.auth.getSession();

	if(sessionError) {
		console.log(sessionError.message);
		return [];
	}

	const { data, error } = await supabase
	.from("songs")
	.select("*")
	.eq("user_id", sessionData.session?.user.id)
	.order("created_at", { ascending: false });

	if(error) {
		console.log(error.message);
	}

	return data || []
}

export default getSongsByUserId;
