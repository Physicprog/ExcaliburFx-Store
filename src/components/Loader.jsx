import React from 'react';
import loaderGif from '../assets/Logo/logo.gif';

const Loader = ({ show }) => {
    if (!show) return null;

    return (
        <div className="loader-overlay">
            <div className="loader-container">
                <img
                    src={loaderGif}
                    alt="ExcaliburFX Loading"
                    className="loader-gif"
                />
                <h1 className="loader-title">ExcaliburFX</h1>
                <p className="loader-subtitle">Loading...</p>
            </div>
        </div>
    );
};

export default Loader;
