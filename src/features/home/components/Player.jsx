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
    currentTime,
    setCurrentTime,

    wasPlaying,
    setWasPlaying,

} = useSong();

    const playerRef = useRef(null);
    const intervalRef = useRef(null);

    const [playing, setPlaying] = useState(false);

    /*
     * Start tracking playback time whenever
     * the YouTube player becomes ready.
     */
    function startTimeTracking() {

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(() => {

            if (
                playerRef.current &&
                playing
            ) {

                const time =
                    playerRef.current.getCurrentTime();

                setCurrentTime(time);

            }

        }, 500);

    }

    /*
     * Clean up the timer when Player unmounts.
     */
    useEffect(() => {

        return () => {

            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }

        };

    }, []);

    /*
     * Save the latest position when the player
     * is about to disappear.
     */
    useEffect(() => {

        return () => {

            if (playerRef.current) {

                const time =
                    playerRef.current.getCurrentTime();

                setCurrentTime(time);

            }

        };

    }, [setCurrentTime]);


    /*
     * IMPORTANT:
     * Hooks are above the conditional return.
     */
    if (!currentSong || !showPlayer) {
        return null;
    }


    const liked = favorites.some(
        fav => fav.videoId === currentSong.videoId
    );


    const opts = {

        height: "190",
        width: "340",

        playerVars: {

            autoplay: 0,
            controls: 1,
            rel: 0,
            modestbranding: 1,

        },

    };


  function onReady(event) {

    playerRef.current = event.target;

    // Restore previous position
    if (currentTime > 0) {

        event.target.seekTo(
            currentTime,
            true
        );

    }

    // Restore previous play/pause state
    if (wasPlaying) {

        event.target.playVideo();

    } else {

        event.target.pauseVideo();

    }

    startTimeTracking();

}


   function onStateChange(event) {

    // Playing
    if (event.data === 1) {

        setPlaying(true);
        setWasPlaying(true);

    }

    // Paused
    else if (event.data === 2) {

        setPlaying(false);
        setWasPlaying(false);

        if (playerRef.current) {

            const time =
                playerRef.current.getCurrentTime();

            setCurrentTime(time);

        }

    }

    // Ended
    else if (event.data === 0) {

        setPlaying(false);
        setWasPlaying(false);
        setCurrentTime(0);

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

        /*
         * Reset position for the new song.
         */
        setCurrentTime(0);

        const index =
            songs.findIndex(
                s =>
                    s.videoId ===
                    currentSong.videoId
            );

        const nextIndex =
            (index + 1) % songs.length;

        setCurrentSong(
            songs[nextIndex]
        );

    }


    function previousSong() {

        if (!songs.length) return;

        /*
         * Reset position for the new song.
         */
        setCurrentTime(0);

        const index =
            songs.findIndex(
                s =>
                    s.videoId ===
                    currentSong.videoId
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
                onClick={() =>
                    setShowPlayer(false)
                }
            >
                <FaTimes />
            </button>


            <div className="player__left">

                <img
                    src={currentSong.posterUrl}
                    alt={currentSong.title}
                    className="player__poster"
                />

                <div>

                    <h3>
                        {currentSong.title}
                    </h3>

                    <p>
                        {currentSong.artist}
                    </p>

                    <span>
                        {currentSong.mood}
                    </span>

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