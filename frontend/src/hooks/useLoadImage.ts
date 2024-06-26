// import { useSupabaseClient } from "@supabase/auth-helpers-react";
// import { Song } from "../../types";
// import { Playlist } from "../../types";

// const useLoadImage = (song: Song, playlist: Playlist) => {
//     const supabaseClient = useSupabaseClient();

//     if(!song) {
//         return null;
//     }

//     if (!playlist || !playlist.image_path) {
// 		return null
// 	}

//     const { data: imageData } = supabaseClient
//        .storage
//        .from("images")
//        .getPublicUrl(song.image_path)

//     return imageData.publicUrl;  
    
    
// }

// export default useLoadImage;

import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Song, Playlist } from '../../types'

type DataWithImagePath = Song | Playlist

const useLoadImage = (data: DataWithImagePath) => {
	const supabaseClient = useSupabaseClient()

	if (!data || !('image_path' in data)) {
		return null
	}

	try {
		const { data: imageData } = supabaseClient.storage
			.from('images')
			.getPublicUrl(data.image_path)

		return imageData?.publicUrl || null
	} catch (error) {
		console.error('Ошибка при загрузке изображения:', error)
		return null
	}
}

export default useLoadImage