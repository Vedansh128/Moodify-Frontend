import { useSong } from "../hooks/useSong";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./songgrid.scss";

export default function SongGrid() {

    const {
        songs,
        favorites,
        setCurrentSong,
        setShowPlayer,
        setCurrentTime,
        setWasPlaying,
        handleFavorite,
    } = useSong();


    if (!songs.length) return null;


    function isFavorite(song) {

        return favorites.some(
            fav => fav.videoId === song.videoId
        );

    }


    function handleSongClick(song) {

        /*
         * A new song is selected.
         * Always start it from the beginning.
         */

        setCurrentTime(0);

        /*
         * Automatically play the newly selected song.
         */

        setWasPlaying(true);

        /*
         * Set the new song.
         */

        setCurrentSong(song);

        /*
         * Show the player.
         */

        setShowPlayer(true);

    }


    return (

        <div className="song-grid">

            {

                songs.map(song => (

                    <div
                        key={song.videoId}
                        className="song-card"

                        onClick={() =>
                            handleSongClick(song)
                        }

                    >

                        <img
                            src={song.posterUrl}
                            alt={song.title}
                        />


                        <div className="song-card__footer">

                            <div>

                                <h3>
                                    {song.title}
                                </h3>

                                <p>
                                    {song.artist}
                                </p>

                            </div>


                            <button

                                className={`favorite-btn ${
                                    isFavorite(song)
                                        ? "active"
                                        : ""
                                }`}

                                onClick={(e) => {

                                    e.stopPropagation();

                                    handleFavorite(song);

                                }}

                            >

                                {

                                    isFavorite(song)

                                        ?

                                        <FaHeart />

                                        :

                                        <FaRegHeart />

                                }

                            </button>

                        </div>

                    </div>

                ))

            }

        </div>

    );

}