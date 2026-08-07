import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FaceExpression from "../../Expression/components/FaceExpression";
import MoodCard from "../components/MoodCard.jsx";
import SongGrid from "../components/SongGrid";
import Player from "../components/Player";
import SearchBar from "../components/SearchBar";
import { useSong } from "../hooks/useSong";
import { useEffect } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import "./home.scss";

const Home = () => {
   const {
    handleGetSong,
    loadFavorites,
} = useSong();

    const { handleLogout } = useAuth();

    async function onLogout() {
        await handleLogout();
        window.location.href = "/login";
    }

    useEffect(() => {
    loadFavorites();
}, []);

    return (
        <div className="home">
            <Navbar onLogout={onLogout} />

            <Hero />

           <FaceExpression
              onClick={handleGetSong}
                   />

            <MoodCard />

            <SearchBar/>
          
            <SongGrid />

            <Player />
        </div>
    );
};

export default Home;