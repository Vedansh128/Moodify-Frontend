import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaCamera, FaSmileBeam } from "react-icons/fa";
import { init, detect } from "../utils/utils";
import "./faceExpression.scss";

export default function FaceExpression({ onClick = () => {} }) {

    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [expression, setExpression] = useState("Not Detected");
    const [confidence, setConfidence] = useState(0);
    const [cameraReady, setCameraReady] = useState(false);

    async function handleDetect() {

        try {

            setLoading(true);

            if (!cameraReady) {

                await init({
                    landmarkerRef,
                    videoRef,
                    streamRef,
                });

                setCameraReady(true);

            }

            const result = await detect({
                landmarkerRef,
                videoRef,
            });

            setExpression(result.mood);
            setConfidence(result.confidence);

            onClick(result.mood);

            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }

            videoRef.current.srcObject = null;
            setCameraReady(false);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    }

    return (

        <motion.div
            className="face-card"
            initial={{opacity:0,y:40}}
            animate={{opacity:1,y:0}}
        >

            <h1>

                <FaSmileBeam />

                AI Mood Detection

            </h1>

            <div className={`camera ${loading ? "camera--loading" : ""}`}>

                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                />

                {loading &&

                    <div className="scanner">

                        <div className="scanner-line"/>

                    </div>

                }

            </div>

            <div className="result">

                <h2>{expression.toUpperCase()}</h2>

                <div className="progress">

                    <div
                        className="progress-fill"
                        style={{
                            width:`${confidence}%`
                        }}
                    />

                </div>

                <p>

                    Confidence {confidence}%

                </p>

            </div>

            <button

                className="button detect"

                disabled={loading}

                onClick={handleDetect}

            >

                <FaCamera />

                {

                    loading ?

                    "Scanning Face..." :

                    "Detect Mood"

                }

            </button>

        </motion.div>

    );

}
