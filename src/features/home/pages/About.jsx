import {
    SiReact,
    SiVite,
    SiNodedotjs,
    SiExpress,
    SiMongodb,
    SiMongoose,
    SiAxios,
    SiSass,
    SiYoutube,
    SiFramer
} from "react-icons/si";

import { MdFaceRetouchingNatural } from "react-icons/md";
import Navbar from "../components/Navbar";

import "./about.scss";

const technologies = [

    {
        name:"React",
        icon:<SiReact/>,
        url:"https://react.dev"
    },

    {
        name:"Vite",
        icon:<SiVite/>,
        url:"https://vitejs.dev"
    },

    {
        name:"Node.js",
        icon:<SiNodedotjs/>,
        url:"https://nodejs.org"
    },

    {
        name:"Express",
        icon:<SiExpress/>,
        url:"https://expressjs.com"
    },

    {
        name:"MongoDB",
        icon:<SiMongodb/>,
        url:"https://mongodb.com"
    },

    {
        name:"Mongoose",
        icon:<SiMongoose/>,
        url:"https://mongoosejs.com"
    },

    {
        name:"Axios",
        icon:<SiAxios/>,
        url:"https://axios-http.com"
    },

    {
        name:"SCSS",
        icon:<SiSass/>,
        url:"https://sass-lang.com"
    },

    {
        name:"YouTube API",
        icon:<SiYoutube/>,
        url:"https://developers.google.com/youtube"
    },

    {
        name:"MediaPipe",
        icon:<MdFaceRetouchingNatural/>,
        url:"https://ai.google.dev/edge/mediapipe"
    },

    {
        name:"Framer Motion",
        icon:<SiFramer/>,
        url:"https://www.framer.com/motion/"
    }

];

export default function About(){

    return(

          <div className="home">
        
           <Navbar />
                    
        <div className="about">

            <div className="hero">

                <h1>About Moodify </h1>

                <p>

                    Moodify uses Artificial Intelligence to detect
                    facial expressions in real-time and recommend
                    music that perfectly matches your mood.

                </p>

            </div>

            <section className="tech-section">

                <h2>Technologies Used</h2>

                <div className="tech-grid">

                    {

                        technologies.map(tech=>(

                            <a

                                key={tech.name}

                                href={tech.url}

                                target="_blank"

                                rel="noreferrer"

                                className="tech-card"

                            >

                                <div className="icon">

                                    {tech.icon}

                                </div>

                                <h3>

                                    {tech.name}

                                </h3>

                            </a>

                        ))

                    }

                </div>

            </section>

            <section className="features">

                <h2>Features</h2>

                <div className="feature-grid">

                    <div> AI Mood Detection</div>

                    <div> Smart Song Recommendation</div>

                    <div> Favorite Songs</div>

                    <div> Personal Library</div>

                    <div> Search Songs</div>

                    <div> Embedded YouTube Player</div>

                </div>

            </section>

            <footer>

                Designed & Developed by Vedansh Sharma

             <p>• MERN Stack Developer • AI Enthusiast • Data Science Student </p>
            </footer>

        </div>
        </div>

    );

}