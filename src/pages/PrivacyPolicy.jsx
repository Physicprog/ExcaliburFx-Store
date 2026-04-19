import React, { useEffect } from 'react';
import AOS from 'aos';
import { Link } from 'react-router-dom';
const PrivacyPolicy = () => {
    useEffect(() => {
        AOS.init({
            duration: 700,
            easing: 'ease-out-cubic',
            once: true,
            offset: 60,
        });
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <section className="policy-hero">
                <div data-aos="fade-up">
                    <h1>Privacy Policy & Cookies</h1>
                    <p>Your privacy matters to us</p>
                    <Link to="/" className='btn-primary' style={{ marginTop: '50px' }}>Back to Home</Link>
                </div>
            </section>

            <section className="policy-content">
                <div className="policy-container">
                    <div className="policy-section" data-aos="fade-up">
                        <h2>About ExcaliburFX</h2>
                        <p>
                            ExcaliburFX is a <strong>private project</strong> created to provide motion designers with a powerful toolkit for After Effects.
                            While this is a personal endeavor, we are <strong>fully open to improvements, suggestions, and community feedback</strong>.
                        </p>
                        <p>
                            Your input helps us continuously enhance the project and make it more valuable for the entire community.
                        </p>
                    </div>

                    <div className="policy-section" data-aos="fade-up" data-aos-delay="50">
                        <h2>Privacy Policy</h2>

                        <h3>Information I Collect</h3>
                        <p>
                            When you purchase a license or use our services, I collect:
                        </p>
                        <ul className="policy-list">
                            <li>Email address for license registration</li>
                            <li>License key and activation information</li>
                            <li>Device HWID information for licensing purposes (up to 6 devices per license)</li>
                        </ul>

                        <p>
                            I do not collect any personal information beyond what is necessary for license management and customer support.
                        </p>

                        <h3>How I Use Your Information</h3>
                        <p>
                            Your information is used exclusively for:
                        </p>
                        <ul className="policy-list">
                            <li>License generation and management</li>
                            <li>Sending license keys and updates</li>
                            <li>Providing customer support</li>
                            <li>Preventing license abuse</li>
                        </ul>

                        <h3>Data Security</h3>
                        <p>
                            I take your data seriously. Your email and license information are stored securely and never shared with third parties without your consent.
                        </p>
                    </div>

                    <div className="policy-section" data-aos="fade-up" data-aos-delay="100">
                        <h2>Cookies Policy</h2>

                        <p>
                            Our website uses cookies to enhance your experience. These cookies help me understand how you use our platform and improve our services.
                        </p>

                        <h3>Types of Cookies I Use</h3>
                        <ul className="policy-list">
                            <li><strong>Essential Cookies:</strong> Required for website functionality (theme preferences, session data)</li>
                            <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                        </ul>

                        <h3>Managing Cookies</h3>
                        <p>
                            You can control cookie preferences through your browser settings. However, disabling certain cookies may affect website functionality.
                        </p>
                    </div>

                    <div className="policy-section" data-aos="fade-up" data-aos-delay="150">
                        <h2>Open to Feedback</h2>
                        <p>
                            As a private project, I actively welcome suggestions and improvements from my community. If you have ideas,
                            concerns about privacy, or notice any issues, please reach out to me through my contact page.
                        </p>
                        <p>
                            Your feedback directly influences how I develop and improve ExcaliburFX for everyone.
                        </p>
                    </div>

                    <div className="policy-section" data-aos="fade-up" data-aos-delay="200">
                        <h2>Contact Us</h2>
                        <p>
                            Have questions about our privacy policy or cookies? I'd love to hear from you.
                        </p>
                        <p>
                            <strong>Email:</strong> <a href="mailto:physicvfx.pro@gmail.com">physicvfx.pro@gmail.com</a>
                        </p>
                    </div>

                    <div className="policy-section" data-aos="fade-up" data-aos-delay="250">
                        <h3>Last Updated</h3>
                        <p>This Privacy Policy was last updated on {new Date().toLocaleDateString()}.</p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PrivacyPolicy;
