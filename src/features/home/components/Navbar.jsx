import { useState } from "react";
import { FaMusic, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router";
import "./navbar.scss";

export default function Navbar() {

    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);

    return (

        <>
            <nav className="navbar">

                <div
                    className="navbar__logo"
                    onClick={() => navigate("/")}
                    style={{ cursor: "pointer" }}
                >
                    <FaMusic />
                    <span>Moodify</span>
                </div>

                {/* Desktop Navigation */}
                <div className="navbar__links">

                    <button onClick={() => navigate("/")}>
                        Home
                    </button>

                    <button onClick={() => navigate("/library")}>
                        Library
                    </button>

                    <button onClick={() => navigate("/about")}>
                        About
                    </button>

                    <button onClick={() => navigate("/profile")}>
                        Profile
                    </button>

                </div>

                {/* Mobile Hamburger */}
                <button
                    className="menu-btn"
                    onClick={() => setMenuOpen(true)}
                >
                    <FaBars />
                </button>

            </nav>

{
    menuOpen && (
        <div
            className="mobile-overlay"
            onClick={() => setMenuOpen(false)}
        />
    )
}
            {/* Mobile Drawer */}

            <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>

                <button
                    className="close-menu"
                    onClick={() => setMenuOpen(false)}
                >
                    <FaTimes />
                </button>

                <button
                    onClick={() => {
                        navigate("/");
                        setMenuOpen(false);
                    }}
                >
                    Home
                </button>

                <button
                    onClick={() => {
                        navigate("/library");
                        setMenuOpen(false);
                    }}
                >
                    Library
                </button>

                <button
                    onClick={() => {
                        navigate("/about");
                        setMenuOpen(false);
                    }}
                >
                    About
                </button>

                <button
                    onClick={() => {
                        navigate("/profile");
                        setMenuOpen(false);
                    }}
                >
                    Profile
                </button>

            </div>

        </>

    );

}