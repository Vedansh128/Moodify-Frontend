import { motion } from "framer-motion";
import "./hero.scss";

export default function Hero() {
    return (
        <motion.section
            className="hero"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .7 }}
        >
            <h1>
                Discover Music Through
                <span> Your Emotions</span>
            </h1>

            <p>
                Detect your facial expression using AI and instantly
                receive songs that perfectly match your mood.
            </p>
        </motion.section>
    );
}