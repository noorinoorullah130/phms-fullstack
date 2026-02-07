import React, { useState } from "react";

import "./Settings.css";
import {
    MdSettings,
    MdSecurity,
    MdPalette,
    MdSave,
    MdRefresh,
    MdLock,
    MdVisibility,
    MdVisibilityOff,
} from "react-icons/md";

const Settings = () => {
    const [activeTab, setActiveTab] = useState("security");

    const [showPassword, setShowPassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordStrength, setPasswordStrength] = useState("weak");
    const [passwordMatch, setPasswordMatch] = useState(null);

    const tabs = [
        { id: "security", label: "Security", icon: <MdSecurity /> },
        { id: "appearance", label: "Appearance", icon: <MdPalette /> },
    ];

    const handleSaveSettings = () => {
        alert("Settings saved successfully!");
    };

    const handleResetSettings = () => {
        if (
            window.confirm(
                "Are you sure you want to reset all settings to default?",
            )
        ) {
            alert("Settings reset to default!");
        }
    };

    const checkPasswordStrength = (password) => {
        if (password.length === 0) return "weak";
        if (password.length < 8) return "weak";
        if (password.length < 12) return "medium";
        return "strong";
    };

    const handleNewPasswordChange = (value) => {
        setNewPassword(value);
        setPasswordStrength(checkPasswordStrength(value));

        if (confirmPassword && value !== confirmPassword) {
            setPasswordMatch(false);
        } else if (confirmPassword && value === confirmPassword) {
            setPasswordMatch(true);
        } else {
            setPasswordMatch(null);
        }
    };

    const handleConfirmPasswordChange = (value) => {
        setConfirmPassword(value);
        if (newPassword && value !== newPassword) {
            setPasswordMatch(false);
        } else if (newPassword && value === newPassword) {
            setPasswordMatch(true);
        } else {
            setPasswordMatch(null);
        }
    };

    const handleChangePassword = () => {
        if (newPassword !== confirmPassword) {
            alert("New passwords don't match!");
            return;
        }
        alert("Password changed successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setPasswordStrength("weak");
        setPasswordMatch(null);
    };

    const renderSecuritySettings = () => (
        <div className="settings-section">
            <h3>Security Settings</h3>

            {/* Change Password Section */}
            <div className="password-change-section">
                <h4>Change Password</h4>
                <div className="password-form">
                    <div className="password-input-group">
                        <label>Current Password</label>
                        <div className="password-input">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={currentPassword}
                                onChange={(e) =>
                                    setCurrentPassword(e.target.value)
                                }
                                placeholder="Enter current password"
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <MdVisibilityOff />
                                ) : (
                                    <MdVisibility />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="password-input-group">
                        <label>New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) =>
                                handleNewPasswordChange(e.target.value)
                            }
                            placeholder="Enter new password"
                        />
                        {newPassword && (
                            <div className="password-strength">
                                <div className="strength-indicator">
                                    <div
                                        className={`strength-bar ${
                                            passwordStrength === "weak" ||
                                            passwordStrength === "medium" ||
                                            passwordStrength === "strong"
                                                ? "weak"
                                                : ""
                                        }`}
                                    ></div>
                                    <div
                                        className={`strength-bar ${
                                            passwordStrength === "medium" ||
                                            passwordStrength === "strong"
                                                ? "medium"
                                                : ""
                                        }`}
                                    ></div>
                                    <div
                                        className={`strength-bar ${
                                            passwordStrength === "strong"
                                                ? "strong"
                                                : ""
                                        }`}
                                    ></div>
                                </div>
                                <div className="strength-text">
                                    {passwordStrength === "weak" &&
                                        "Weak password"}
                                    {passwordStrength === "medium" &&
                                        "Medium strength"}
                                    {passwordStrength === "strong" &&
                                        "Strong password"}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="password-input-group">
                        <label>Confirm New Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) =>
                                handleConfirmPasswordChange(e.target.value)
                            }
                            placeholder="Confirm new password"
                        />
                        {passwordMatch !== null && (
                            <div
                                className={`password-match ${
                                    passwordMatch ? "match" : "mismatch"
                                }`}
                            >
                                {passwordMatch
                                    ? "✓ Passwords match"
                                    : "✗ Passwords do not match"}
                            </div>
                        )}
                    </div>

                    <button
                        className="change-password-btn"
                        onClick={handleChangePassword}
                        disabled={
                            !currentPassword ||
                            !newPassword ||
                            !confirmPassword ||
                            passwordMatch === false
                        }
                    >
                        <MdLock className="btn-icon" />
                        Change Password
                    </button>
                </div>
            </div>
        </div>
    );

    const renderAppearanceSettings = () => (
        <div className="settings-section">
            <h3>Appearance Settings</h3>

            <div className="theme-selector">
                <h4>Theme</h4>
                <div className="theme-options">
                    <div className="theme-option active">
                        <div className="theme-preview light"></div>
                        <span>Light</span>
                    </div>
                    <div className="theme-option">
                        <div className="theme-preview dark"></div>
                        <span>Dark</span>
                    </div>
                    <div className="theme-option">
                        <div className="theme-preview blue"></div>
                        <span>Blue</span>
                    </div>
                    <div className="theme-option">
                        <div className="theme-preview green"></div>
                        <span>Green</span>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case "security":
                return renderSecuritySettings();
            case "appearance":
                return renderAppearanceSettings();
            default:
                return renderSecuritySettings();
        }
    };

    return (
        <div className="settings">
            <div className="settings-header">
                <div className="header-content">
                    <h1>
                        <MdSettings className="header-icon" /> System Settings
                    </h1>
                    <p>Configure your pharmacy management system preferences</p>
                </div>
            </div>

            <div className="settings-layout">
                {/* Sidebar */}
                <div className="settings-sidebar">
                    <div className="sidebar-header">
                        <h3>Settings</h3>
                    </div>

                    <nav className="settings-nav">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                className={`nav-item ${
                                    activeTab === tab.id ? "active" : ""
                                }`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                <span className="nav-icon">{tab.icon}</span>
                                <span className="nav-label">{tab.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Main Content */}
                <div className="settings-content">{renderContent()}</div>
            </div>
        </div>
    );
};

export default Settings;
