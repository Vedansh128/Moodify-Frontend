import { useContext } from "react";

import { SongContext } from "../song.context";

import {
    getSong,
    searchSong
} from "../service/song.api";

import {
    getFavorites,
    toggleFavorite,
} from "../../user/services/user.api";


export const useSong = () => {

    const {

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

    } = useContext(SongContext);


    /*
    |--------------------------------------------------------------------------
    | Select a completely new song
    |--------------------------------------------------------------------------
    */

    function selectSong(song) {

        /*
         * Tell Player that this is a NEW song.
         */
        setResetPlayback(true);

        /*
         * New song starts at zero.
         */
        setCurrentTime(0);

        /*
         * New song should automatically play.
         */
        setWasPlaying(true);

        /*
         * Set the new song.
         */
        setCurrentSong(song);

        /*
         * Show player.
         */
        setShowPlayer(true);

    }


    /*
    |--------------------------------------------------------------------------
    | Get songs according to detected mood
    |--------------------------------------------------------------------------
    */

    async function handleGetSong(result) {

        try {

            setLoading(true);

            const mood =
                typeof result === "string"
                    ? result
                    : result.mood;

            console.log(
                "Detected Mood:",
                mood
            );

            const response =
                await getSong({ mood });

            console.log(
                "Backend Response:",
                response
            );

            const fetchedSongs =
                response.data || [];

            setSongs(fetchedSongs);


            if (fetchedSongs.length > 0) {

                selectSong(
                    fetchedSongs[0]
                );


                window.scrollTo({

                    top:
                        document.body.scrollHeight,

                    behavior: "smooth",

                });

            }

        }

        catch (err) {

            console.error(
                "Song Fetch Error:",
                err
            );

        }

        finally {

            setLoading(false);

        }

    }


    /*
    |--------------------------------------------------------------------------
    | Load favorites
    |--------------------------------------------------------------------------
    */

    async function loadFavorites() {

        try {

            const data =
                await getFavorites();

            setFavorites(
                data.favoriteSongs || []
            );

        }

        catch (err) {

            console.log(
                "Favorites Error:",
                err
            );

        }

    }


    /*
    |--------------------------------------------------------------------------
    | Favorite / unfavorite
    |--------------------------------------------------------------------------
    */

    async function handleFavorite(song) {

        try {

            const data =
                await toggleFavorite(song);

            setFavorites(
                data.favoriteSongs
            );

        }

        catch (err) {

            console.log(
                "Favorite Error:",
                err
            );

        }

    }


    /*
    |--------------------------------------------------------------------------
    | Search songs
    |--------------------------------------------------------------------------
    */

    async function handleSearch(query) {

        if (!query.trim()) return;


        try {

            setLoading(true);

            const data =
                await searchSong(query);

            setSongs(data.data);


            if (data.data.length) {

                selectSong(
                    data.data[0]
                );

            }

        }

        catch (err) {

            console.error(
                "Search Error:",
                err
            );

        }

        finally {

            setLoading(false);

        }

    }


  return {
    loading,
    songs,
    currentSong,
    showPlayer,
    setShowPlayer,
    favorites,

    currentTime,
    setCurrentTime,

    wasPlaying,
    setWasPlaying,

    resetPlayback,
    setResetPlayback,

    selectSong,

    handleGetSong,
    handleFavorite,
    loadFavorites,
    handleSearch,
};

}