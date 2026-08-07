import axios from "axios";

const api = axios.create({
    baseURL: "https://moodify-backend-bizr.onrender.com",
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export async function register({ username, email, password }) {
    const response = await api.post("/api/auth/register", {
        username,
        email,
        password,
    });

    if (response.data.data.token) {
        localStorage.setItem(
            "token",
            response.data.data.token
        );
    }

    return response.data.data;
}

export async function login({ email, username, password }) {
    const response = await api.post("/api/auth/login", {
        email,
        username,
        password,
    });

    if (response.data.data.token) {
        localStorage.setItem(
            "token",
            response.data.data.token
        );
    }

    return response.data.data;
}

export async function getMe() {
    const response = await api.get("/api/auth/get-me");
    return response.data.data;
}

export async function logout() {
    await api.get("/api/auth/logout");
    localStorage.removeItem("token");
}