import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer data-aos="fade-up">
            <div className="footer-content">
                <div className="footer-section">
                    <div className="logo">EXCALIBUR<span>FX</span></div>
                    <span>© 2024 ExcaliburFX. All rights reserved.</span>
                </div>
                <div className="footer-links">
                    <Link to="/privacy" className="footer-link">Privacy Policy & Cookies</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
