import { useSong } from "../hooks/useSong";
import "./moodcard.scss";

export default function MoodCard(){

    const { currentSong } = useSong();

    if(!currentSong) return null;

    return(

        <div className="mood-card">

            <h2>{currentSong.mood.toUpperCase()}</h2>

            <p>Music recommendation is ready.</p>

        </div>

    )

}