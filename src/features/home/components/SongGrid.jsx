import { useSong } from "../hooks/useSong";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./songgrid.scss";

export default function SongGrid() {

    const {
        songs,
        favorites,
       setCurrentSong,
       setShowPlayer,
        handleFavorite,
    } = useSong();

    if (!songs.length) return null;

    function isFavorite(song) {

        return favorites.some(
            fav => fav.videoId === song.videoId
        );

    }

    return (

        <div className="song-grid">

            {

                songs.map(song => (

                    <div
                        key={song.videoId}
                        className="song-card"
                       onClick={() => {
                         setCurrentSong(song);
                           setShowPlayer(true);
                                 }}
                    >

                        <img
                            src={song.posterUrl}
                            alt={song.title}
                        />

                        <div className="song-card__footer">

                            <div>

                                <h3>{song.title}</h3>

                                <p>{song.artist}</p>

                            </div>

                            <button

                                className={`favorite-btn ${
                                    isFavorite(song)
                                        ? "active"
                                        : ""
                                }`}

                                onClick={(e)=>{

                                    e.stopPropagation();

                                    handleFavorite(song);

                                }}

                            >

                                {

                                    isFavorite(song)

                                    ?

                                    <FaHeart/>

                                    :

                                    <FaRegHeart/>

                                }

                            </button>

                        </div>

                    </div>

                ))

            }

        </div>

    );

}