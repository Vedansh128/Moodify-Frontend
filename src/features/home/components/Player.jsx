import { useRef, useState, useEffect } from "react";
import YouTube from "react-youtube";
import {
    FaHeart,
    FaRegHeart,
    FaPlay,
    FaPause,
    FaTimes
} from "react-icons/fa";
import { useSong } from "../hooks/useSong";
import "./player.scss";

export default function Player() {

    const {
        songs,
        currentSong,
        favorites,
        setCurrentSong,
        handleFavorite,
        showPlayer,
        setShowPlayer,
    } = useSong();

    if (!currentSong || !showPlayer) return null;

    const playerRef = useRef(null);

    const [playing, setPlaying] = useState(false);


    if (!currentSong) return null;

    const liked = favorites.some(
        fav => fav.videoId === currentSong.videoId
    );

    const opts = {
        height: "190",
        width: "340",
        playerVars: {
            autoplay: 1,
            controls: 1,      // keep YouTube controls
            rel: 0,
            modestbranding: 1,
        },
    };

    function onReady(event) {

        playerRef.current = event.target;

    }

    function onStateChange(event) {

        // 1 = Playing
        if (event.data === 1) {

            setPlaying(true);

        }

        // 2 = Paused
        else if (event.data === 2) {

            setPlaying(false);

        }

        // 0 = Ended
        else if (event.data === 0) {

            setPlaying(false);

        }

    }

    function togglePlay() {

        if (!playerRef.current) return;

        if (playing) {

            playerRef.current.pauseVideo();

        } else {

            playerRef.current.playVideo();

        }

    }

    function nextSong() {

        if (!songs.length) return;

        const index = songs.findIndex(
            s => s.videoId === currentSong.videoId
        );

        const nextIndex =
            (index + 1) % songs.length;

        setCurrentSong(
            songs[nextIndex]
        );

    }

    function previousSong() {

        if (!songs.length) return;

        const index = songs.findIndex(
            s => s.videoId === currentSong.videoId
        );

        const prevIndex =
            (index - 1 + songs.length) %
            songs.length;

        setCurrentSong(
            songs[prevIndex]
        );

    }

    return (

        <div className="player">

                 <button
                 className="close-player"
                 onClick={() => setShowPlayer(false)} >
              <FaTimes />
             </button>
            <div className="player__left">

                <img
                    src={currentSong.posterUrl}
                    alt={currentSong.title}
                    className="player__poster"
                />

                <div>

                    <h3>{currentSong.title}</h3>

                    <p>{currentSong.artist}</p>

                    <span>{currentSong.mood}</span>

                </div>

            </div>

            <div className="player__center">

              <YouTube
    key={currentSong.videoId}
    videoId={currentSong.videoId}
    opts={opts}
    onReady={onReady}
    onStateChange={onStateChange}
                   />

            </div>

            <div className="player__right">

                <button
                    className="player-btn"
                    onClick={previousSong}
                >
                    ⏮
                </button>

                <button
                    className="player-btn play-btn"
                    onClick={togglePlay}
                >
                    {playing ? (
                        <FaPause />
                    ) : (
                        <FaPlay />
                    )}
                </button>

                <button
                    className="player-btn"
                    onClick={nextSong}
                >
                    ⏭
                </button>

                <button
                    className={`favorite-btn-player ${
                        liked ? "active" : ""
                    }`}
                    onClick={() =>
                        handleFavorite(currentSong)
                    }
                >
                    {liked ? (
                        <FaHeart />
                    ) : (
                        <FaRegHeart />
                    )}
                </button>

            </div>

        </div>

    );

}