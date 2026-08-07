import { useState } from "react";
import {
    toggleFavorite,
    getFavorites,
} from "../services/user.api";

export function useFavorite() {

    const [favorites, setFavorites] = useState([]);

 async function handleToggleFavorite(song) {

    const data = await toggleFavorite(song);

    return data;

}

    async function handleGetFavorites() {

        const data = await getFavorites();

        setFavorites(data.favoriteSongs);

        return data.favoriteSongs;
    }

    return {
        favorites,
        handleToggleFavorite,
        handleGetFavorites,
    };
}