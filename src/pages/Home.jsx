import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import AOS from 'aos';

const FB_API_KEY = "AIzaSyDuUUoknI4EbHsrJjTKmKAS9IR7ctO0hvU";
const FB_DB_URL = "https://excaliburfx-a1407-default-rtdb.europe-west1.firebasedatabase.app";

emailjs.init({
    publicKey: "F46T7yFFam6IWXFpL",
    limitRate: { id: 'emailjs_rate_limit', throttle: 50 }
});

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFeaturesModalOpen, setIsFeaturesModalOpen] = useState(false);
    const [purchaseData, setPurchaseData] = useState({ email: '', confirmEmail: '', plan: 'Premium', price: '€29' });
    const [lastGeneratedKey, setLastGeneratedKey] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState({ show: false, msg: '', type: 'success' });
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        AOS.init({
            duration: 700,
            easing: 'ease-out-cubic',
            once: true,
            offset: 60,
        });
    }, []);

    const showToast = (msg, type = 'success') => {
        setToast({ show: true, msg, type });
        setTimeout(() => setToast(t => ({ ...t, show: false })), 3500);
    };

    const generateLicenseKey = () => {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        const seg = () => Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
        return `EXCL-${seg()}-${seg()}-${seg()}`;
    };

    const dbUrl = (path, token) =>
        `${FB_DB_URL}${path}.json${token ? `?auth=${token}` : ""}`;

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const validatePurchaseForm = () => {
        const { email, confirmEmail } = purchaseData;
        if (!email.trim()) return { valid: false, error: "Veuillez entrer votre email" };
        if (!confirmEmail.trim()) return { valid: false, error: "Veuillez confirmer votre email" };
        if (!validateEmail(email)) return { valid: false, error: "Format email invalide" };
        if (!validateEmail(confirmEmail)) return { valid: false, error: "Format email de confirmation invalide" };
        if (email !== confirmEmail) return { valid: false, error: "Les emails ne correspondent pas" };
        return { valid: true };
    };

    const sendLicenseEmail = async (userEmail, licenseKey, plan, price) => {
        try {
            await emailjs.send("service_4l0lpbm", "template_xql1wru", {
                to_email: userEmail,
                email: userEmail,
                license_key: licenseKey,
                user_name: userEmail.split('@')[0],
                plan,
                price
            });
            return true;
        } catch (error) {
            console.error("EmailJS error:", error.status, error.text);
            return false;
        }
    };

    const submitPurchase = async () => {
        const validation = validatePurchaseForm();
        if (!validation.valid) return showToast(validation.error, "error");
        setIsLoading(true);

        const emailKey = purchaseData.email.replace(/[@.]/g, '_');
        const key = generateLicenseKey();

        const userData = {
            id: emailKey,
            email: purchaseData.email,
            license_key: key,
            premium: true,
            plan: purchaseData.plan,
            banned: false,
            number_hwid: 0,
            hwid_list: [],
            created_at: new Date().toISOString(),
        };

        try {
            const writeRes = await fetch(dbUrl(`/USERS/${emailKey}`), {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            });

            if (!writeRes.ok) {
                const errData = await writeRes.json().catch(() => ({}));
                throw new Error(errData.error || `Erreur (${writeRes.status})`);
            }

            const emailSent = await sendLicenseEmail(purchaseData.email, key, purchaseData.plan, purchaseData.price);
            setLastGeneratedKey(key);
            showToast(emailSent ? "Licence generated ! Email sent" : "Licence generated (email failed)", emailSent ? "success" : "error");

        } catch (e) {
            console.error("Error:", e);
            showToast(e.message || "Server error", "error");
        }

        setIsLoading(false);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(lastGeneratedKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const openModal = () => {
        setPurchaseData({ email: '', confirmEmail: '', plan: 'Premium', price: '€29' });
        setLastGeneratedKey(null);
        setIsModalOpen(true);
    };

    return (
        <>
            <section className="hero">
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div className="hero-eyebrow" data-aos="fade-up">After Effects Motion Tools</div>
                    <h1 data-aos="fade-up" data-aos-delay="100">The ultimate<br /><em>AE toolkit.</em></h1>
                    <p data-aos="fade-up" data-aos-delay="200">Made by a creator for creators.</p>
                    <div
                        style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}
                        data-aos="fade-up"
                        data-aos-delay="300"
                    >
                        <button className="btn-primary" onClick={() => document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })}>
                            Get Premium version
                        </button>
                        <button className="btn-outline" onClick={() => document.getElementById('download').scrollIntoView({ behavior: 'smooth' })}>
                            Download Installer
                        </button>
                        <button className="btn-ghost" onClick={() => setIsFeaturesModalOpen(true)}>
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            <section id="demo" className="demo-section">
                <div className="demo-container">

                    <div className="demo-text" data-aos="fade-right">
                        <div className="section-label">Demo</div>
                        <h2>Try ExcaliburFX in Real Conditions</h2>
                        <p>
                            Access a demo version. You can test the interface, and see the tools you could use.
                        </p>

                        <ul className="demo-features">
                            <li data-aos="fade-right" data-aos-delay="50">Preset / instant curve, one click to apply as much as you want curves</li>
                            <li data-aos="fade-right" data-aos-delay="100">Many tools to enhance your workflow speed</li>
                            <li data-aos="fade-right" data-aos-delay="150">Add your favorite presets/plugins/assets and apply in one click on the timeline!</li>
                            <li data-aos="fade-right" data-aos-delay="200">6 mini-games included when you have to wait!</li>

                        </ul>

                        <div className="demo-actions" data-aos="fade-up" data-aos-delay="250">
                            <a href="src/Excalibur/index.html" target="_blank" rel="noopener noreferrer" className="btn-primary">
                                Launch Demo
                            </a>
                            <button className="btn-ghost" onClick={() => document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })}>
                                Get Full Version
                            </button>
                        </div>
                    </div>

                    <div className="demo-preview" data-aos="fade-left" data-aos-delay="100">
                        <div className="demo-video-wrap">
                            <iframe
                                src="https://www.youtube.com/embed/VIDEO_ID"
                                title="ExcaliburFX Demo"
                                frameBorder="0"
                                allowFullScreen
                            />
                        </div>
                    </div>

                </div>
            </section>
            <section id="download" className="download-section">
                <div className="section-label" data-aos="fade-up">Installer</div>
                <div className="section-title" data-aos="fade-up" data-aos-delay="50">Download the latest version</div>
                <div className="download-card" data-aos="zoom-in" data-aos-delay="100">
                    <div className="download-icon-wrap">
                        <span className="material-symbols-outlined" style={{ fontSize: '75px' }}>
                            browser_updated
                        </span>
                    </div>
                    <div className="download-content">
                        <h2>Installation File</h2>
                        <p>Download the ExcaliburFX installer for Windows. Requires After Effects CC 2019 or later.</p>
                        <div className="download-meta">
                            <div className="download-meta-item" data-aos="fade-up" data-aos-delay="150">
                                <span className="download-meta-label">Platform</span>
                                <span className="download-meta-value">Windows 10/11</span>
                            </div>
                            <div className="download-meta-item" data-aos="fade-up" data-aos-delay="200">
                                <span className="download-meta-label">Format</span>
                                <span className="download-meta-value">.exe installer</span>
                            </div>
                            <div className="download-meta-item" data-aos="fade-up" data-aos-delay="250">
                                <span className="download-meta-label">Requires</span>
                                <span className="download-meta-value">After Effects CC+</span>
                            </div>
                        </div>
                        <div className="download-actions" data-aos="fade-up" data-aos-delay="300">
                            <button className="btn-primary" onClick={() => {
                                const link = document.createElement('a');
                                link.href = '/excaliburfx_downloader.exe';
                                link.download = 'excaliburfx_downloader.exe';
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                            }}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M8 1v9M5 7l3 3 3-3M2 12v1a1 1 0 001 1h10a1 1 0 001-1v-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Download Now
                            </button>
                            <button className="btn-ghost" onClick={() => document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })}>
                                Need a license?
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <div className="premium-pricing-wrapper">
                <section className='Premium-advantage'>
                    <div className="premium-content">
                        <div className="premium-advantage-container">
                            <div className="premium-advantage-text" data-aos="fade-right" data-aos-delay="100">
                                <h3>Why go Premium?</h3>
                                <p>
                                    The free version gives you a preview of ExcaliburFX.
                                    The premium version unlocks all tools, presets, and features to improve your workflow.

                                    One-time payment. Lifetime access. No subscription. No hidden fees.

                                    No pressure to buy. It adds value to your workflow and supports the project.
                                    If you want full access and pro-level tools, go for the premium version.

                                </p>
                                <ul className="premium-features">
                                    <li data-aos="fade-right" data-aos-delay="50">
                                        <strong>Complete Toolkit</strong><br />Unlock new panels to make your workflow more efficient. The premium version is your full creative arsenal.
                                    </li>
                                    <li data-aos="fade-right" data-aos-delay="100">
                                        <strong>Lifetime Updates</strong><br />Buy once, get everything we release in the future. New tools, presets, and features will be added regularly based on user feedback.
                                    </li>
                                    <li data-aos="fade-right" data-aos-delay="150">
                                        <strong>Support the Project</strong><br />Support the project and future development. Your purchase helps us keep improving and adding value for all users.
                                    </li>
                                </ul>
                                <button className="btn-primary" onClick={() => setIsFeaturesModalOpen(true)}>
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="comparison-section">
                    <div className="comparison-container" data-aos="fade-up">

                        <h2>Choose Your Version</h2>
                        <div className="section-label">Free vs Premium</div>
                        <p>See what's included in each plan</p>

                        <div className="comparison-table-wrap">
                            <table className="comparison-table">
                                <thead>
                                    <tr>
                                        <th>Features</th>
                                        <th>Free Version</th>
                                        <th>Premium Version</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="feature-name">Curve</td>
                                        <td><span className="check"><span class="material-symbols-outlined">
                                            check
                                        </span></span></td>
                                        <td><span className="check"><span class="material-symbols-outlined">
                                            check
                                        </span></span></td>
                                    </tr>
                                    <tr>
                                        <td className="feature-name">Main Tools</td>
                                        <td><span className="check"><span class="material-symbols-outlined">
                                            check
                                        </span></span></td>
                                        <td><span className="check"><span class="material-symbols-outlined">
                                            check
                                        </span></span></td>
                                    </tr>
                                    <tr>
                                        <td className="feature-name">Presets</td>
                                        <td><span className="check"><span class="material-symbols-outlined">
                                            check
                                        </span></span></td>
                                        <td><span className="check"><span class="material-symbols-outlined">
                                            check
                                        </span></span></td>
                                    </tr>
                                    <tr>
                                        <td className="feature-name">Settings</td>
                                        <td><span className="check"><span class="material-symbols-outlined">
                                            check
                                        </span></span></td>
                                        <td><span className="check"><span class="material-symbols-outlined">
                                            check
                                        </span></span></td>
                                    </tr>
                                    <tr className="premium-feature">
                                        <td className="feature-name">SFX</td>
                                        <td><span className="cross"><span class="material-symbols-outlined">
                                            close
                                        </span></span></td>
                                        <td><span className="check"><span class="material-symbols-outlined">
                                            check
                                        </span></span></td>
                                    </tr>
                                    <tr className="premium-feature">
                                        <td className="feature-name">Effects Pack</td>
                                        <td><span className="cross"><span class="material-symbols-outlined">
                                            close
                                        </span></span></td>
                                        <td><span className="check"><span class="material-symbols-outlined">
                                            check
                                        </span></span></td>
                                    </tr>
                                    <tr className="premium-feature">
                                        <td className="feature-name">Mini Games</td>
                                        <td><span className="cross"><span class="material-symbols-outlined">
                                            close
                                        </span></span></td>
                                        <td><span className="check"><span class="material-symbols-outlined">
                                            check
                                        </span></span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div >
            <section id="pricing" className="pricing">
                <div className="pricing-content">
                    <div className="section-label" data-aos="fade-up">Pricing</div>
                    <h3 className="section-title" data-aos="fade-up" data-aos-delay="50">One plan.<br />Everything included.</h3>

                    <div style={{ display: 'flex', gap: '100px', justifyContent: 'center', alignItems: 'stretch', flexWrap: 'wrap', width: '100%' }}>
                        <div className="plan-card" data-aos="zoom-in" data-aos-delay="100" style={{ margin: 0 }}>
                            <div className="plan-badge">Lifetime Access</div>
                            <div className="plan-name">Premium</div>
                            <div className="plan-price">€29</div>
                            <div className="plan-price-note">One-time payment, no subscription</div>
                            <ul className="plan-features">
                                <li>All shake effects & camera rigs</li>
                                <li>More panel options</li>
                                <li>Up to 6 devices per license</li>
                                <li>Lifetime updates included</li>
                            </ul>
                            <div style={{ width: '100%' }}>
                                <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={openModal}>
                                    Buy Now
                                </button>
                            </div>
                        </div>

                        <div className="plan-card" data-aos="zoom-in" data-aos-delay="150" style={{ margin: 0 }}>
                            <div className="plan-badge">Support the Project</div>
                            <div className="plan-name">Complete Bundle</div>
                            <div className="plan-price">€49</div>
                            <div className="plan-price-note">One-time payment, no subscription</div>
                            <ul className="plan-features">
                                <li>Editing pack in addition to premium</li>
                                <li>Full SFX library, presets ready to use, color grading tools</li>
                                <li>Up to 6 devices per license</li>
                                <li>Lifetime updates included</li>
                            </ul>
                            <div style={{ width: '100%' }}>
                                <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={openModal}>
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {
                isFeaturesModalOpen && (
                    <div className="modal-overlay" onClick={() => setIsFeaturesModalOpen(false)}>
                        <div className="features-modal-content" onClick={e => e.stopPropagation()}>
                            <button className="close-btn" onClick={() => setIsFeaturesModalOpen(false)}>
                                <span class="material-symbols-outlined">
                                    close
                                </span>
                            </button>

                            <div className="features-modal-header">
                                <h2>ExcaliburFX Panels & Features</h2>
                                <p>Discover what each panel can do</p>
                            </div>

                            <div className="features-grid">
                                <div className="feature-card">
                                    <h3>Curve Panel</h3>
                                    <p>Create and apply custom curve presets to your animations. Smooth, easing, or custom motion curves at a single click.</p>
                                    <span className="feature-badge">Free & Premium</span>
                                </div>

                                <div className="feature-card">
                                    <h3>Main Tools</h3>
                                    <p>Access the core toolset including shake effects, camera rigs, and motion design utilities for professional workflows.</p>
                                    <span className="feature-badge">Free & Premium</span>
                                </div>

                                <div className="feature-card">
                                    <h3>Presets</h3>
                                    <p>Browse and apply professionally crafted presets for common motion design tasks. Build your own custom library.</p>
                                    <span className="feature-badge">Free & Premium</span>
                                </div>

                                <div className="feature-card">
                                    <h3>Settings</h3>
                                    <p>Customize ExcaliburFX behavior, interface preferences, and performance settings to match your workflow.</p>
                                    <span className="feature-badge">Free & Premium</span>
                                </div>

                                <div className="feature-card premium">
                                    <h3>SFX Library</h3>
                                    <p>Access an extensive library of sound effects and audio presets to enhance your motion design projects.</p>
                                    <span className="feature-badge premium">Premium Only</span>
                                </div>

                                <div className="feature-card premium">
                                    <h3>Effects Pack</h3>
                                    <p>Unlock premium visual effects, advanced transitions, and exclusive motion design tools for unlimited creativity.</p>
                                    <span className="feature-badge premium">Premium Only</span>
                                </div>

                                <div className="feature-card premium">
                                    <h3>Mini Games</h3>
                                    <p>Take a break while rendering! Play engaging mini-games to stay entertained during long processing times.</p>
                                    <span className="feature-badge premium">Premium Only</span>
                                </div>
                            </div>

                            <div className="features-modal-footer">
                                <button className="btn-primary" onClick={() => { setIsFeaturesModalOpen(false); document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' }); }}>
                                    View Pricing
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                isModalOpen && (
                    <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                        <div className="modal-content" data-aos="zoom-in" data-aos-duration="300" onClick={e => e.stopPropagation()}>
                            <button className="close-btn" onClick={() => setIsModalOpen(false)}>✕</button>

                            {!lastGeneratedKey ? (
                                <>
                                    <div className="modal-header">
                                        <h2>Checkout</h2>
                                        <p>Enter your email to receive your license key</p>
                                    </div>

                                    <div className="order-summary" data-aos="fade-up" data-aos-delay="50">
                                        <span className="order-summary-label">Premium, Lifetime</span>
                                        <span className="order-summary-price">€29</span>
                                    </div>

                                    <div className="input-group" data-aos="fade-up" data-aos-delay="100">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            placeholder="you@example.com"
                                            value={purchaseData.email}
                                            onChange={e => setPurchaseData({ ...purchaseData, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="input-group" data-aos="fade-up" data-aos-delay="150">
                                        <label>Confirm Email</label>
                                        <input
                                            type="email"
                                            placeholder="you@example.com"
                                            value={purchaseData.confirmEmail}
                                            onChange={e => setPurchaseData({ ...purchaseData, confirmEmail: e.target.value })}
                                        />
                                    </div>

                                    <div data-aos="fade-up" data-aos-delay="200">
                                        <button className="btn-submit" onClick={submitPurchase} disabled={isLoading}>
                                            {isLoading ? 'Processing...' : 'Generate License for €29 only'}
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="success-screen" data-aos="zoom-in">
                                    <div className="success-icon"><span className="material-symbols-outlined">
                                        download_done
                                    </span></div>
                                    <h3>License Ready!</h3>
                                    <p> you will get a pop-up on ExcaliburFX when updates are available, just download and run the new installer (on the download page)</p>
                                    <p>Your license key has been sent to {purchaseData.email}</p>
                                    <div className="key-display">{lastGeneratedKey}</div>
                                    <button className="btn-submit" onClick={handleCopy}>
                                        {copied ? 'Copied' : 'Copy License Key'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div >
                )
            }

            {toast.show && <div className={`toast ${toast.type}`}>{toast.msg}</div>}
        </>
    );
};

export default Home;
