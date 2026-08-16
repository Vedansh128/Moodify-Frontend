import { createContext, useState } from "react";

export const SongContext = createContext();

export const SongContextProvider = ({ children }) => {

    const [songs, setSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);

    const [favorites, setFavorites] = useState([]);

    const [loading, setLoading] = useState(false);

    const [showPlayer, setShowPlayer] = useState(false);

    // Position of the currently playing song
    const [currentTime, setCurrentTime] = useState(0);

    // Whether the current song was playing
    const [wasPlaying, setWasPlaying] = useState(false);

    /*
     * TRUE when a completely new song has been selected.
     *
     * This prevents the previous song's timestamp
     * from being restored into the new song.
     */
    const [resetPlayback, setResetPlayback] = useState(false);

    return (
        <SongContext.Provider
            value={{

                songs,
                setSongs,

                currentSong,
                setCurrentSong,

                favorites,
                setFavorites,

                loading,
                setLoading,

                showPlayer,
                setShowPlayer,

                currentTime,
                setCurrentTime,

                wasPlaying,
                setWasPlaying,

                resetPlayback,
                setResetPlayback,

            }}
        >
            {children}
        </SongContext.Provider>
    );
};