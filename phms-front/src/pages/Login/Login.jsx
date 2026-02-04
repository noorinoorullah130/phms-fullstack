import React, { useState } from "react";

import "./Login.css";
import { useNavigate } from "react-router";

const Login = () => {
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(loginForm);
        navigate("/app");
    };

    return (
        <div className="pharmacy-login">
            <div className="login-container">
                <div className="login-header">
                    <div className="pharmacy-icon">💊</div>
                    <h1>Pharmacy Management System</h1>
                    <p>Secure access to pharmacy operations</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    <h2>Staff Login</h2>

                    <div className="input-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={loginForm.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={loginForm.password}
                                onChange={handleInputChange}
                                placeholder="Enter your password"
                                required
                            />
                            <button
                                type="button"
                                className="show-password"
                                aria-label="Show password"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </button>
                        </div>
                    </div>

                    <div className="form-options">
                        <label className="remember-me">
                            <input type="checkbox" />
                            <span>Remember me</span>
                        </label>
                        <a href="#" className="forgot-password">
                            Forgot password?
                        </a>
                    </div>

                    <button type="submit" className="login-btn">
                        Sign In
                    </button>

                    <div className="login-footer">
                        <p>
                            Need help? Contact{" "}
                            <a href="#">noorinoorullah130.com</a>
                        </p>
                        <p>
                            @ {new Date().getFullYear()} Pharmacy Management
                            System by Noorullah Noori. All rights reserved.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
