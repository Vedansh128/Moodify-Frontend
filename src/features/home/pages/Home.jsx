import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import FaceExpression from "../../Expression/components/FaceExpression.jsx";
import MoodCard from "../components/MoodCard.jsx";
import SongGrid from "../components/SongGrid.jsx";
import Player from "../components/Player.jsx";
import SearchBar from "../components/SearchBar.jsx";
import { useSong } from "../hooks/useSong.js";
import { useEffect } from "react";
import { useAuth } from "../../auth/hooks/useAuth.js";
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