import axios from "axios";

const api = axios.create({
    baseURL: "https://moodify-backend-bizr.onrender.com",
    withCredentials: true,
});

export async function getSong({ mood }) {
    const { data } = await api.get("/api/songs", {
        params: { mood },
    });

    return data;
}

export async function searchSong(query) {
    const { data } = await api.get("/api/songs/search", {
        params: {
            q: query,
        },
    });

    return data;
}