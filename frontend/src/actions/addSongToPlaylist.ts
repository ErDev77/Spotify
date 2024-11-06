import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error(
		'Supabase URL или Supabase anon key отсутствует в переменных окружения.'
	)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

const addSongToPlaylist = async (
	playlistId: string,
	songId: string
): Promise<void> => {
	const { data, error } = await supabase
		.from('playlist_songs')
		.insert({ playlist_id: playlistId, song_id: songId })

	if (error) {
		console.error('Ошибка при добавлении песни в плейлист:', error)
	} else {
		console.log('Песня успешно добавлена в плейлист:', data)
	}
}

export default addSongToPlaylist
