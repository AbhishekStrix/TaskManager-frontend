import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import "../styles/HomePage.css";

const HomePage = ({ currUser, handleLogout }) => {
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        // Delay content appearance until cube animation is complete
        setTimeout(() => setShowContent(true), 2000);
    }, []);

    return (
        <div className="home-container">
            <Navbar currUser={currUser} handleLogout={handleLogout} />

            {/* Rolling Cube Animation */}
            {!showContent && (
                <div className="cube-wrapper">
                    <div className="cube">
                        <div className="face front">🚀</div>
                        <div className="face back">🔥</div>
                        <div className="face left">💻</div>
                        <div className="face right">🎯</div>
                        <div className="face top">⚡</div>
                        <div className="face bottom">🌟</div>
                    </div>
                </div>
            )}

            {/* Main Content (Appears after animation) */}
            {showContent && (
                <div className="card">
                    <h1>Welcome, {currUser?.name || "Guest"}!</h1>
                    <p>Explore the features and manage your account.</p>
                    <button onClick={handleLogout} className="logout-btn">
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default HomePage;
