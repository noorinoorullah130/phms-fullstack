import React from "react";
import "./Header.css";

const Header = () => {
    const currentDate = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <header className="pharmacy-header">
            <div className="header-left">
                <div className="logo">
                    <span className="logo-icon">💊</span>
                    <div className="logo-text">
                        <h1>PharmaCare</h1>
                        <p className="logo-subtitle">Management System</p>
                    </div>
                </div>
            </div>

            <div className="header-center">
                <div className="pharmacy-info">
                    <div className="location">
                        <span className="location-icon">📍</span>
                        <span>Main Pharmacy Branch</span>
                    </div>
                    <div className="status-indicator">
                        <span>System: Online</span>
                    </div>
                </div>
            </div>

            <div className="header-right">
                <div className="date-time">
                    <div className="date">{currentDate}</div>
                </div>

                <div className="user-profile">
                    <div className="user-avatar">
                        <span className="avatar-icon">👨‍⚕️</span>
                    </div>
                    <div className="user-info">
                        <span className="user-name">Dr. Smith</span>
                        <span className="user-role">Admin</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
