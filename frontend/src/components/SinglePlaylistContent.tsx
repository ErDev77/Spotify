import { Playlist } from "../../types"
import PlaylistItem from "./PlaylistItem"
import { Song } from "../../types"

interface SinglePlaylistContentProps {
	playlist: Playlist
	songs: Song[]
}

const SinglePlaylistContent: React.FC<SinglePlaylistContentProps> = ({
	playlist,
    songs
}) => {

      if (!playlist) {
				return <div>Loading...</div>
			}
	return (
		<div className='grid grid-cols-1 gap-4 p-4'>
			<PlaylistItem key={playlist.id} playlist={playlist} />
		</div>
	)
}

export default SinglePlaylistContent