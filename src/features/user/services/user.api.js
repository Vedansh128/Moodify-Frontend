import axios from "axios";

const api=axios.create({

    baseURL:"https://moodify-backend-bizr.onrender.com",

    withCredentials:true,

});

api.interceptors.request.use(config=>{

    const token=localStorage.getItem("token");

    if(token){

        config.headers.Authorization=`Bearer ${token}`;

    }

    return config;

});

export async function toggleFavorite(song){

    const {data}=await api.post(

        "/api/users/favorites",

        song

    );

    return data;

}

export async function getFavorites(){

    const {data}=await api.get(

        "/api/users/favorites"

    );

    return data;

}