import { useContext } from "react";
import { SongContext } from "../song.context";
import { getSong, searchSong } from "../service/song.api";
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

} = useContext(SongContext);

   async function handleGetSong(result) {

    try {

        setLoading(true);

        const mood =
            typeof result === "string"
                ? result
                : result.mood;

        console.log("Detected Mood:", mood);

        const response = await getSong({ mood });

        console.log("Backend Response:", response);

        const fetchedSongs = response.data || [];

        setSongs(fetchedSongs);

        if (fetchedSongs.length > 0) {
            setCurrentSong(fetchedSongs[0]);
            setShowPlayer(true);
            window.scrollTo({

       top: document.body.scrollHeight,

        behavior: "smooth",

});
        }

    } catch (err) {

        console.error("Song Fetch Error:", err);

    } finally {

        setLoading(false);

    }

}

  async function loadFavorites(){

    try{

        const data=await getFavorites();

        setFavorites(data.favoriteSongs || []);

    }

    catch(err){

        console.log(err);

    }

}

    async function handleFavorite(song){

    try{

        const data=await toggleFavorite(song);

        setFavorites(data.favoriteSongs);

    }

    catch(err){

        console.log(err);

    }

}

    async function handleSearch(query) {

    if (!query.trim()) return;

    try {

        setLoading(true);

        const data = await searchSong(query);

        setSongs(data.data);

        if (data.data.length) {
            setCurrentSong(data.data[0]);
            setShowPlayer(true)
        }

    } catch (err) {

        console.error(err);

    } finally {

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

    handleGetSong,
    handleFavorite,
    loadFavorites,
    setCurrentSong,
    handleSearch,
};

};