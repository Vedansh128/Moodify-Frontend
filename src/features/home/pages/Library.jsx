import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Player from "../components/Player";
import { useSong } from "../hooks/useSong";

export default function Library(){

    const{

        favorites,

        loadFavorites,

        setCurrentSong,

        setShowPlayer,

    }=useSong();

useEffect(() => {

    loadFavorites();

}, [loadFavorites]);

    return(

        <div className="home">

            <Navbar/>

            <div

                style={{

                    maxWidth:"1100px",

                    margin:"40px auto",

                    padding:"20px",

                }}

            >

                <h1

                    style={{

                        color:"#7CFF8A",

                        marginBottom:"30px",

                    }}

                >

                    My Library

                </h1>

                {

                    favorites.length===0

                    ?

                    <p>No favorite songs.</p>

                    :

                    favorites.map(song=>(

                        <div

                            key={song.videoId}

                          onClick={() => {

                             setCurrentSong(song);

                             setShowPlayer(true);

                            }}

                            style={{

                                display:"flex",

                                gap:"20px",

                                background:"#1c1c1c",

                                padding:"15px",

                                borderRadius:"16px",

                                marginBottom:"15px",

                                cursor:"pointer",

                            }}

                        >

                            <img

                                src={song.posterUrl}

                                width="90"

                            />

                            <div>

                                <h3>{song.title}</h3>

                                <p>{song.artist}</p>

                                <span>{song.mood}</span>

                            </div>

                        </div>

                    ))

                }

            </div>

            <Player/>

        </div>

    );

}