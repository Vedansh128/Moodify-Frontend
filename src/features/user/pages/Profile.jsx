import { useAuth } from "../../auth/hooks/useAuth";
import Navbar from "../../home/components/Navbar";
import "./profile.scss";

export default function Profile() {

    const {
        user,
        handleLogout,
    } = useAuth();

    return (
        <>
        <div className="home">
        <Navbar />

            <div className="profile">

                <div className="profile-card">

                    <img
                        src={
                            user?.avatar ||
                            "https://ui-avatars.com/api/?name=" +
                                user?.username
                        }
                        alt="avatar"
                    />

                    <h2>{user?.username}</h2>

                    <p>{user?.email}</p>

                    <button
                        className="button"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </div>
            </div>
        </>
    );
}