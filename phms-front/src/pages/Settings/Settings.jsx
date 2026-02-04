import React, { useState } from "react";

import "./Settings.css";
import {
    MdSettings,
    MdSecurity,
    MdNotifications,
    MdPeople,
    MdBusiness,
    MdReceipt,
    MdStorage,
    MdBackup,
    MdHelp,
    MdInfo,
    MdLanguage,
    MdPalette,
    MdSave,
    MdRefresh,
    MdDownload,
    MdUpload,
    MdLock,
    MdVisibility,
    MdVisibilityOff,
    MdQrCode,
    MdTwoWheeler,
} from "react-icons/md";

const Settings = () => {
    const [activeTab, setActiveTab] = useState("general");
    const [settings, setSettings] = useState({
        // General Settings
        pharmacyName: "PharmaCare Pharmacy",
        pharmacyAddress: "123 Medical Street, New York, NY 10001",
        phoneNumber: "(555) 123-4567",
        email: "contact@pharmacare.com",
        workingHours: "8:00 AM - 10:00 PM",
        currency: "USD",
        timezone: "America/New_York",
        dateFormat: "MM/DD/YYYY",

        // Security Settings
        sessionTimeout: "30",
        passwordExpiry: "90",
        twoFactorAuth: true,
        ipWhitelist: ["192.168.1.1", "10.0.0.1"],
        failedLoginAttempts: "5",

        // Notification Settings
        emailNotifications: true,
        smsNotifications: false,
        lowStockAlerts: true,
        expiryAlerts: true,
        salesReports: true,
        paymentReminders: true,

        // User Management
        userRegistration: true,
        autoApproveUsers: false,
        defaultUserRole: "technician",

        // Billing Settings
        taxRate: "7.5",
        discountPercentage: "5",
        invoicePrefix: "INV",
        invoiceStartingNumber: "1001",
        paymentMethods: ["cash", "credit-card", "debit-card", "insurance"],

        // System Settings
        autoBackup: true,
        backupFrequency: "daily",
        backupLocation: "cloud",
        dataRetention: "365",
        systemMaintenance: "02:00",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordStrength, setPasswordStrength] = useState("weak");
    const [passwordMatch, setPasswordMatch] = useState(null);

    const tabs = [
        { id: "general", label: "General", icon: <MdSettings /> },
        { id: "security", label: "Security", icon: <MdSecurity /> },
        {
            id: "notifications",
            label: "Notifications",
            icon: <MdNotifications />,
        },
        { id: "users", label: "User Management", icon: <MdPeople /> },
        { id: "billing", label: "Billing", icon: <MdReceipt /> },
        { id: "system", label: "System", icon: <MdStorage /> },
        { id: "backup", label: "Backup & Restore", icon: <MdBackup /> },
        { id: "appearance", label: "Appearance", icon: <MdPalette /> },
        { id: "about", label: "About", icon: <MdInfo /> },
    ];

    const currencies = [
        { value: "USD", label: "US Dollar ($)" },
        { value: "EUR", label: "Euro (€)" },
        { value: "GBP", label: "British Pound (£)" },
        { value: "INR", label: "Indian Rupee (₹)" },
        { value: "AED", label: "UAE Dirham (د.إ)" },
    ];

    const timezones = [
        { value: "America/New_York", label: "Eastern Time (ET)" },
        { value: "America/Chicago", label: "Central Time (CT)" },
        { value: "America/Denver", label: "Mountain Time (MT)" },
        { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
        { value: "Europe/London", label: "London (GMT)" },
        { value: "Europe/Paris", label: "Paris (CET)" },
        { value: "Asia/Dubai", label: "Dubai (GST)" },
        { value: "Asia/Kolkata", label: "India (IST)" },
    ];

    const dateFormats = [
        { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
        { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
        { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
    ];

    const backupFrequencies = [
        { value: "hourly", label: "Every Hour" },
        { value: "daily", label: "Daily" },
        { value: "weekly", label: "Weekly" },
        { value: "monthly", label: "Monthly" },
    ];

    const backupLocations = [
        { value: "local", label: "Local Server" },
        { value: "cloud", label: "Cloud Storage" },
        { value: "external", label: "External Drive" },
    ];

    const handleInputChange = (field, value) => {
        setSettings((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleToggleChange = (field) => {
        setSettings((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const handleSaveSettings = () => {
        alert("Settings saved successfully!");
        // In real app: API call to save settings
    };

    const handleResetSettings = () => {
        if (
            window.confirm(
                "Are you sure you want to reset all settings to default?",
            )
        ) {
            alert("Settings reset to default!");
            // In real app: Reset to default settings
        }
    };

    const handleBackupNow = () => {
        alert("Starting backup process...");
        // In real app: Backup functionality
    };

    const handleRestoreBackup = () => {
        alert("Select backup file to restore...");
        // In real app: Restore functionality
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

    const renderGeneralSettings = () => (
        <div className="settings-section">
            <h3>General Settings</h3>
            <div className="settings-grid">
                <div className="setting-item">
                    <label>Pharmacy Name</label>
                    <input
                        type="text"
                        value={settings.pharmacyName}
                        onChange={(e) =>
                            handleInputChange("pharmacyName", e.target.value)
                        }
                        placeholder="Enter pharmacy name"
                    />
                </div>

                <div className="setting-item">
                    <label>Pharmacy Address</label>
                    <textarea
                        value={settings.pharmacyAddress}
                        onChange={(e) =>
                            handleInputChange("pharmacyAddress", e.target.value)
                        }
                        placeholder="Enter pharmacy address"
                        rows="3"
                    />
                </div>

                <div className="setting-item">
                    <label>Phone Number</label>
                    <input
                        type="tel"
                        value={settings.phoneNumber}
                        onChange={(e) =>
                            handleInputChange("phoneNumber", e.target.value)
                        }
                        placeholder="Enter phone number"
                    />
                </div>

                <div className="setting-item">
                    <label>Email Address</label>
                    <input
                        type="email"
                        value={settings.email}
                        onChange={(e) =>
                            handleInputChange("email", e.target.value)
                        }
                        placeholder="Enter email address"
                    />
                </div>

                <div className="setting-item">
                    <label>Working Hours</label>
                    <input
                        type="text"
                        value={settings.workingHours}
                        onChange={(e) =>
                            handleInputChange("workingHours", e.target.value)
                        }
                        placeholder="e.g., 8:00 AM - 10:00 PM"
                    />
                </div>

                <div className="setting-item">
                    <label>Currency</label>
                    <select
                        value={settings.currency}
                        onChange={(e) =>
                            handleInputChange("currency", e.target.value)
                        }
                    >
                        {currencies.map((currency) => (
                            <option key={currency.value} value={currency.value}>
                                {currency.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="setting-item">
                    <label>Timezone</label>
                    <select
                        value={settings.timezone}
                        onChange={(e) =>
                            handleInputChange("timezone", e.target.value)
                        }
                    >
                        {timezones.map((tz) => (
                            <option key={tz.value} value={tz.value}>
                                {tz.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="setting-item">
                    <label>Date Format</label>
                    <select
                        value={settings.dateFormat}
                        onChange={(e) =>
                            handleInputChange("dateFormat", e.target.value)
                        }
                    >
                        {dateFormats.map((format) => (
                            <option key={format.value} value={format.value}>
                                {format.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );

    const renderSecuritySettings = () => (
        <div className="settings-section">
            <h3>Security Settings</h3>

            <div className="settings-grid">
                <div className="setting-item">
                    <label>Session Timeout (minutes)</label>
                    <input
                        type="number"
                        value={settings.sessionTimeout}
                        onChange={(e) =>
                            handleInputChange("sessionTimeout", e.target.value)
                        }
                        min="5"
                        max="120"
                    />
                </div>

                <div className="setting-item">
                    <label>Password Expiry (days)</label>
                    <input
                        type="number"
                        value={settings.passwordExpiry}
                        onChange={(e) =>
                            handleInputChange("passwordExpiry", e.target.value)
                        }
                        min="30"
                        max="365"
                    />
                </div>

                <div className="setting-item">
                    <label>Failed Login Attempts Allowed</label>
                    <input
                        type="number"
                        value={settings.failedLoginAttempts}
                        onChange={(e) =>
                            handleInputChange(
                                "failedLoginAttempts",
                                e.target.value,
                            )
                        }
                        min="1"
                        max="10"
                    />
                </div>
            </div>

            <div className="toggle-settings">
                <div className="toggle-item">
                    <div className="toggle-info">
                        <h4>Two-Factor Authentication</h4>
                        <p>Add an extra layer of security to your account</p>
                    </div>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={settings.twoFactorAuth}
                            onChange={() => handleToggleChange("twoFactorAuth")}
                        />
                        <span className="toggle-slider"></span>
                    </label>
                </div>

                <div className="toggle-item">
                    <div className="toggle-info">
                        <h4>IP Whitelist</h4>
                        <p>Restrict access to specific IP addresses</p>
                    </div>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={settings.ipWhitelist.length > 0}
                            onChange={() =>
                                handleInputChange(
                                    "ipWhitelist",
                                    settings.ipWhitelist.length > 0
                                        ? []
                                        : ["192.168.1.1"],
                                )
                            }
                        />
                        <span className="toggle-slider"></span>
                    </label>
                </div>
            </div>

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
                                        className={`strength-bar ${passwordStrength === "weak" || passwordStrength === "medium" || passwordStrength === "strong" ? "weak" : ""}`}
                                    ></div>
                                    <div
                                        className={`strength-bar ${passwordStrength === "medium" || passwordStrength === "strong" ? "medium" : ""}`}
                                    ></div>
                                    <div
                                        className={`strength-bar ${passwordStrength === "strong" ? "strong" : ""}`}
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
                                className={`password-match ${passwordMatch ? "match" : "mismatch"}`}
                            >
                                {passwordMatch
                                    ? "✓ Passwords match"
                                    : "✗ Passwords do not match"}
                            </div>
                        )}
                    </div>

                    <div className="password-requirements">
                        <h5>Password Requirements:</h5>
                        <div className="requirement-list">
                            <div
                                className={`requirement-item ${newPassword.length >= 8 ? "valid" : "invalid"}`}
                            >
                                <span className="requirement-check">
                                    {newPassword.length >= 8 ? "✓" : "✗"}
                                </span>
                                At least 8 characters
                            </div>
                            <div
                                className={`requirement-item ${/[A-Z]/.test(newPassword) ? "valid" : "invalid"}`}
                            >
                                <span className="requirement-check">
                                    {/[A-Z]/.test(newPassword) ? "✓" : "✗"}
                                </span>
                                At least one uppercase letter
                            </div>
                            <div
                                className={`requirement-item ${/[0-9]/.test(newPassword) ? "valid" : "invalid"}`}
                            >
                                <span className="requirement-check">
                                    {/[0-9]/.test(newPassword) ? "✓" : "✗"}
                                </span>
                                At least one number
                            </div>
                            <div
                                className={`requirement-item ${/[!@#$%^&*]/.test(newPassword) ? "valid" : "invalid"}`}
                            >
                                <span className="requirement-check">
                                    {/[!@#$%^&*]/.test(newPassword) ? "✓" : "✗"}
                                </span>
                                At least one special character
                            </div>
                        </div>
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

    const renderNotificationSettings = () => (
        <div className="settings-section">
            <h3>Notification Settings</h3>
            <div className="toggle-settings">
                <div className="toggle-item">
                    <div className="toggle-info">
                        <h4>Email Notifications</h4>
                        <p>Receive important updates via email</p>
                    </div>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={settings.emailNotifications}
                            onChange={() =>
                                handleToggleChange("emailNotifications")
                            }
                        />
                        <span className="toggle-slider"></span>
                    </label>
                </div>

                <div className="toggle-item">
                    <div className="toggle-info">
                        <h4>SMS Notifications</h4>
                        <p>Receive alerts via SMS</p>
                    </div>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={settings.smsNotifications}
                            onChange={() =>
                                handleToggleChange("smsNotifications")
                            }
                        />
                        <span className="toggle-slider"></span>
                    </label>
                </div>

                <div className="toggle-item">
                    <div className="toggle-info">
                        <h4>Low Stock Alerts</h4>
                        <p>Get notified when stock is low</p>
                    </div>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={settings.lowStockAlerts}
                            onChange={() =>
                                handleToggleChange("lowStockAlerts")
                            }
                        />
                        <span className="toggle-slider"></span>
                    </label>
                </div>

                <div className="toggle-item">
                    <div className="toggle-info">
                        <h4>Expiry Alerts</h4>
                        <p>Get notified before medicines expire</p>
                    </div>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={settings.expiryAlerts}
                            onChange={() => handleToggleChange("expiryAlerts")}
                        />
                        <span className="toggle-slider"></span>
                    </label>
                </div>

                <div className="toggle-item">
                    <div className="toggle-info">
                        <h4>Daily Sales Reports</h4>
                        <p>Receive daily sales summary</p>
                    </div>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={settings.salesReports}
                            onChange={() => handleToggleChange("salesReports")}
                        />
                        <span className="toggle-slider"></span>
                    </label>
                </div>

                <div className="toggle-item">
                    <div className="toggle-info">
                        <h4>Payment Reminders</h4>
                        <p>Send payment due reminders</p>
                    </div>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={settings.paymentReminders}
                            onChange={() =>
                                handleToggleChange("paymentReminders")
                            }
                        />
                        <span className="toggle-slider"></span>
                    </label>
                </div>
            </div>
        </div>
    );

    const renderUserManagementSettings = () => (
        <div className="settings-section">
            <h3>User Management Settings</h3>
            <div className="toggle-settings">
                <div className="toggle-item">
                    <div className="toggle-info">
                        <h4>Allow User Registration</h4>
                        <p>Allow new users to register for accounts</p>
                    </div>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={settings.userRegistration}
                            onChange={() =>
                                handleToggleChange("userRegistration")
                            }
                        />
                        <span className="toggle-slider"></span>
                    </label>
                </div>

                <div className="toggle-item">
                    <div className="toggle-info">
                        <h4>Auto-Approve New Users</h4>
                        <p>Automatically approve new user registrations</p>
                    </div>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={settings.autoApproveUsers}
                            onChange={() =>
                                handleToggleChange("autoApproveUsers")
                            }
                        />
                        <span className="toggle-slider"></span>
                    </label>
                </div>
            </div>

            <div className="settings-grid">
                <div className="setting-item">
                    <label>Default User Role</label>
                    <select
                        value={settings.defaultUserRole}
                        onChange={(e) =>
                            handleInputChange("defaultUserRole", e.target.value)
                        }
                    >
                        <option value="technician">Pharmacy Technician</option>
                        <option value="pharmacist">Pharmacist</option>
                        <option value="manager">Manager</option>
                        <option value="admin">Administrator</option>
                    </select>
                </div>
            </div>
        </div>
    );

    const renderBillingSettings = () => (
        <div className="settings-section">
            <h3>Billing Settings</h3>
            <div className="settings-grid">
                <div className="setting-item">
                    <label>Tax Rate (%)</label>
                    <input
                        type="number"
                        value={settings.taxRate}
                        onChange={(e) =>
                            handleInputChange("taxRate", e.target.value)
                        }
                        min="0"
                        max="50"
                        step="0.1"
                    />
                </div>

                <div className="setting-item">
                    <label>Default Discount (%)</label>
                    <input
                        type="number"
                        value={settings.discountPercentage}
                        onChange={(e) =>
                            handleInputChange(
                                "discountPercentage",
                                e.target.value,
                            )
                        }
                        min="0"
                        max="100"
                        step="0.1"
                    />
                </div>

                <div className="setting-item">
                    <label>Invoice Prefix</label>
                    <input
                        type="text"
                        value={settings.invoicePrefix}
                        onChange={(e) =>
                            handleInputChange("invoicePrefix", e.target.value)
                        }
                        placeholder="e.g., INV"
                        maxLength="10"
                    />
                </div>

                <div className="setting-item">
                    <label>Invoice Starting Number</label>
                    <input
                        type="number"
                        value={settings.invoiceStartingNumber}
                        onChange={(e) =>
                            handleInputChange(
                                "invoiceStartingNumber",
                                e.target.value,
                            )
                        }
                        min="1"
                    />
                </div>
            </div>

            <div className="checkbox-settings">
                <h4>Enabled Payment Methods</h4>
                <div className="checkbox-group">
                    <label className="checkbox-item">
                        <input
                            type="checkbox"
                            checked={settings.paymentMethods.includes("cash")}
                            onChange={(e) => {
                                const methods = e.target.checked
                                    ? [...settings.paymentMethods, "cash"]
                                    : settings.paymentMethods.filter(
                                          (m) => m !== "cash",
                                      );
                                handleInputChange("paymentMethods", methods);
                            }}
                        />
                        <span className="checkmark"></span>
                        Cash
                    </label>

                    <label className="checkbox-item">
                        <input
                            type="checkbox"
                            checked={settings.paymentMethods.includes(
                                "credit-card",
                            )}
                            onChange={(e) => {
                                const methods = e.target.checked
                                    ? [
                                          ...settings.paymentMethods,
                                          "credit-card",
                                      ]
                                    : settings.paymentMethods.filter(
                                          (m) => m !== "credit-card",
                                      );
                                handleInputChange("paymentMethods", methods);
                            }}
                        />
                        <span className="checkmark"></span>
                        Credit Card
                    </label>

                    <label className="checkbox-item">
                        <input
                            type="checkbox"
                            checked={settings.paymentMethods.includes(
                                "debit-card",
                            )}
                            onChange={(e) => {
                                const methods = e.target.checked
                                    ? [...settings.paymentMethods, "debit-card"]
                                    : settings.paymentMethods.filter(
                                          (m) => m !== "debit-card",
                                      );
                                handleInputChange("paymentMethods", methods);
                            }}
                        />
                        <span className="checkmark"></span>
                        Debit Card
                    </label>

                    <label className="checkbox-item">
                        <input
                            type="checkbox"
                            checked={settings.paymentMethods.includes(
                                "insurance",
                            )}
                            onChange={(e) => {
                                const methods = e.target.checked
                                    ? [...settings.paymentMethods, "insurance"]
                                    : settings.paymentMethods.filter(
                                          (m) => m !== "insurance",
                                      );
                                handleInputChange("paymentMethods", methods);
                            }}
                        />
                        <span className="checkmark"></span>
                        Insurance
                    </label>
                </div>
            </div>
        </div>
    );

    const renderSystemSettings = () => (
        <div className="settings-section">
            <h3>System Settings</h3>
            <div className="toggle-settings">
                <div className="toggle-item">
                    <div className="toggle-info">
                        <h4>Automatic Backups</h4>
                        <p>Automatically backup system data</p>
                    </div>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={settings.autoBackup}
                            onChange={() => handleToggleChange("autoBackup")}
                        />
                        <span className="toggle-slider"></span>
                    </label>
                </div>
            </div>

            {settings.autoBackup && (
                <div className="settings-grid">
                    <div className="setting-item">
                        <label>Backup Frequency</label>
                        <select
                            value={settings.backupFrequency}
                            onChange={(e) =>
                                handleInputChange(
                                    "backupFrequency",
                                    e.target.value,
                                )
                            }
                        >
                            {backupFrequencies.map((freq) => (
                                <option key={freq.value} value={freq.value}>
                                    {freq.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="setting-item">
                        <label>Backup Location</label>
                        <select
                            value={settings.backupLocation}
                            onChange={(e) =>
                                handleInputChange(
                                    "backupLocation",
                                    e.target.value,
                                )
                            }
                        >
                            {backupLocations.map((loc) => (
                                <option key={loc.value} value={loc.value}>
                                    {loc.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="setting-item">
                        <label>Data Retention (days)</label>
                        <input
                            type="number"
                            value={settings.dataRetention}
                            onChange={(e) =>
                                handleInputChange(
                                    "dataRetention",
                                    e.target.value,
                                )
                            }
                            min="30"
                            max="1095"
                        />
                    </div>

                    <div className="setting-item">
                        <label>System Maintenance Time</label>
                        <input
                            type="time"
                            value={settings.systemMaintenance}
                            onChange={(e) =>
                                handleInputChange(
                                    "systemMaintenance",
                                    e.target.value,
                                )
                            }
                        />
                    </div>
                </div>
            )}
        </div>
    );

    const renderBackupSettings = () => (
        <div className="settings-section">
            <h3>Backup & Restore</h3>

            <div className="backup-actions">
                <div className="backup-action-card">
                    <div className="backup-icon">
                        <MdDownload />
                    </div>
                    <div className="backup-content">
                        <h4>Create Backup</h4>
                        <p>Create a manual backup of all system data</p>
                    </div>
                    <button className="backup-btn" onClick={handleBackupNow}>
                        Backup Now
                    </button>
                </div>

                <div className="backup-action-card">
                    <div className="backup-icon">
                        <MdUpload />
                    </div>
                    <div className="backup-content">
                        <h4>Restore Backup</h4>
                        <p>Restore system from a previous backup</p>
                    </div>
                    <button
                        className="restore-btn"
                        onClick={handleRestoreBackup}
                    >
                        Restore
                    </button>
                </div>
            </div>

            <div className="backup-history">
                <h4>Recent Backups</h4>
                <div className="backup-list">
                    <div className="backup-item">
                        <div className="backup-info">
                            <h5>Full System Backup</h5>
                            <p>Jan 20, 2024 • 2.4 GB • Cloud</p>
                        </div>
                        <div className="backup-actions">
                            <button className="icon-btn" title="Download">
                                <MdDownload />
                            </button>
                            <button className="icon-btn" title="Restore">
                                <MdRefresh />
                            </button>
                        </div>
                    </div>

                    <div className="backup-item">
                        <div className="backup-info">
                            <h5>Database Backup</h5>
                            <p>Jan 19, 2024 • 1.8 GB • Local</p>
                        </div>
                        <div className="backup-actions">
                            <button className="icon-btn" title="Download">
                                <MdDownload />
                            </button>
                            <button className="icon-btn" title="Restore">
                                <MdRefresh />
                            </button>
                        </div>
                    </div>
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

            <div className="dashboard-customization">
                <h4>Dashboard Customization</h4>
                <div className="checkbox-group">
                    <label className="checkbox-item">
                        <input type="checkbox" defaultChecked />
                        <span className="checkmark"></span>
                        Show Revenue Chart
                    </label>
                    <label className="checkbox-item">
                        <input type="checkbox" defaultChecked />
                        <span className="checkmark"></span>
                        Show Stock Alerts
                    </label>
                    <label className="checkbox-item">
                        <input type="checkbox" defaultChecked />
                        <span className="checkmark"></span>
                        Show Recent Sales
                    </label>
                    <label className="checkbox-item">
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                        Show Calendar
                    </label>
                </div>
            </div>
        </div>
    );

    const renderAboutSettings = () => (
        <div className="settings-section">
            <h3>About PharmaCare System</h3>

            <div className="about-info">
                <div className="about-logo">
                    <MdBusiness />
                    <span>PharmaCare Management System</span>
                </div>

                <div className="about-details">
                    <div className="detail-item">
                        <strong>Version:</strong>
                        <span>v2.5.1</span>
                    </div>
                    <div className="detail-item">
                        <strong>Build Date:</strong>
                        <span>January 15, 2024</span>
                    </div>
                    <div className="detail-item">
                        <strong>License:</strong>
                        <span>Commercial</span>
                    </div>
                    <div className="detail-item">
                        <strong>Database:</strong>
                        <span>MySQL 8.0</span>
                    </div>
                    <div className="detail-item">
                        <strong>API Version:</strong>
                        <span>v1.3.2</span>
                    </div>
                </div>

                <div className="system-health">
                    <h4>System Health</h4>
                    <div className="health-metrics">
                        <div className="metric-item">
                            <div className="metric-label">Storage</div>
                            <div className="metric-bar">
                                <div
                                    className="metric-fill"
                                    style={{ width: "65%" }}
                                ></div>
                            </div>
                            <div className="metric-value">65% used</div>
                        </div>
                        <div className="metric-item">
                            <div className="metric-label">Memory</div>
                            <div className="metric-bar">
                                <div
                                    className="metric-fill"
                                    style={{ width: "42%" }}
                                ></div>
                            </div>
                            <div className="metric-value">42% used</div>
                        </div>
                        <div className="metric-item">
                            <div className="metric-label">CPU</div>
                            <div className="metric-bar">
                                <div
                                    className="metric-fill"
                                    style={{ width: "28%" }}
                                ></div>
                            </div>
                            <div className="metric-value">28% used</div>
                        </div>
                    </div>
                </div>

                <div className="support-info">
                    <h4>Support & Help</h4>
                    <p>For technical support or questions, please contact:</p>
                    <div className="support-contacts">
                        <span>📧 support@pharmacare.com</span>
                        <span>📞 (555) 987-6543</span>
                    </div>
                    <button className="help-btn">
                        <MdHelp className="btn-icon" />
                        Open Help Center
                    </button>
                </div>
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case "general":
                return renderGeneralSettings();
            case "security":
                return renderSecuritySettings();
            case "notifications":
                return renderNotificationSettings();
            case "users":
                return renderUserManagementSettings();
            case "billing":
                return renderBillingSettings();
            case "system":
                return renderSystemSettings();
            case "backup":
                return renderBackupSettings();
            case "appearance":
                return renderAppearanceSettings();
            case "about":
                return renderAboutSettings();
            default:
                return renderGeneralSettings();
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

                <div className="header-actions">
                    <button
                        className="action-btn save-btn"
                        onClick={handleSaveSettings}
                    >
                        <MdSave className="btn-icon" />
                        Save Changes
                    </button>
                    <button
                        className="action-btn reset-btn"
                        onClick={handleResetSettings}
                    >
                        <MdRefresh className="btn-icon" />
                        Reset to Default
                    </button>
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
                                className={`nav-item ${activeTab === tab.id ? "active" : ""}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                <span className="nav-icon">{tab.icon}</span>
                                <span className="nav-label">{tab.label}</span>
                            </button>
                        ))}
                    </nav>

                    <div className="sidebar-footer">
                        <div className="system-status">
                            <div className="status-dot online"></div>
                            <span>System Status: Online</span>
                        </div>
                        <div className="last-save">
                            <small>Last saved: Today, 10:30 AM</small>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="settings-content">{renderContent()}</div>
            </div>
        </div>
    );
};

export default Settings;
