import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const shouldBeDark = savedTheme ? savedTheme === 'dark' : prefersDark;

        setIsDarkMode(shouldBeDark);
        document.documentElement.setAttribute('data-theme', shouldBeDark ? 'dark' : 'light');
    }, []);

    const closeMenu = () => setIsOpen(false);

    const handleThemeToggle = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        document.documentElement.setAttribute('data-theme', newMode ? 'dark' : 'light');
        localStorage.setItem('theme', newMode ? 'dark' : 'light');
    };

    return (
        <>
            {isOpen && <div className="menu-overlay" onClick={closeMenu}></div>}
            <nav data-aos="fade-down" className="navbar">
                <Link to="/" className="logo">
                    EXCALIBUR<span>FX</span>
                </Link>

                <div className={`nav-links ${isOpen ? 'active' : ''}`}>
                    <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={closeMenu}>
                        Home
                    </Link>
                    <Link to="/about" className={location.pathname === '/about' ? 'active' : ''} onClick={closeMenu}>
                        About
                    </Link>
                    <Link to="/portfolio" className={location.pathname === '/portfolio' ? 'active' : ''} onClick={closeMenu}>
                        Portfolio
                    </Link>
                    <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''} onClick={closeMenu}>
                        Contact
                    </Link>
                </div>

                <div className="nav-controls">
                    <input
                        type="checkbox"
                        id="dark-mode-toggle"
                        checked={!isDarkMode}
                        onChange={handleThemeToggle}
                    />
                    <label htmlFor="dark-mode-toggle" className="toggle"></label>
                </div>

                <button
                    className="hamburger"
                    onClick={() => {
                        setIsOpen(!isOpen);
                    }}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </nav >
        </>
    );
};

export default Navbar;
