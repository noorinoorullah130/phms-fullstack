import React from "react";
import "./Footer.css";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <p className="copyright">
                © {currentYear} PharmaCare Management System Created by
                <span className="author-name"> Noorullah Noori</span>. All
                Rights Reserved.
            </p>
        </footer>
    );
};

export default Footer;
