import { createClient } from '@supabase/supabase-js'
import { Song } from '../../types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error(
		'Supabase URL или Supabase anon key отсутствует в переменных окружения.'
	)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

const getPlaylistSongs = async (playlistId: string): Promise<Song[]> => {
	const { data, error } = await supabase
		.from('playlist_songs')
		.select('songs(*)')
		.eq('playlist_id', playlistId)

	if (error) {
		console.log(error)
		return []
	}

	return (data as any).map((item: { songs: Song }) => item.songs) || []
}

export default getPlaylistSongs
