import { createContext, useState } from "react";

export const SongContext = createContext();

export const SongContextProvider = ({ children }) => {

    const [songs, setSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showPlayer, setShowPlayer] = useState(false);

    // Store the current playback position
    const [currentTime, setCurrentTime] = useState(0);

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

            }}
        >
            {children}
        </SongContext.Provider>
    );
};