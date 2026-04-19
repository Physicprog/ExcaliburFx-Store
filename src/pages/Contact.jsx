import React, { useEffect } from 'react';
import AOS from 'aos';

const Contact = () => {
    useEffect(() => {
        AOS.init({
            duration: 700,
            easing: 'ease-out-cubic',
            once: true,
            offset: 60,
        });
    }, []);

    return (
        <>
            <section className="contact-hero">
                <div data-aos="fade-up">
                    <h1>Get in Touch</h1>
                    <p>Have questions or want to collaborate? Send us a message!</p>
                </div>
            </section>

            <section className="contact-section">
                <div className="contact-container" data-aos="fade-up">
                    <h2>Send Us a Message</h2>
                    <form className="contact-form" action="https://api.web3forms.com/submit" method="POST">
                        <input type="hidden" name="access_key" value="6ddece2c-a487-4697-be16-8327c0554829" />
                        <input type="text" name="name" placeholder="Your Name" required />
                        <input type="email" name="email" placeholder="Your Email" required />
                        <textarea name="message" placeholder="Your Message" required></textarea>
                        <button type="submit">Send Message</button>
                    </form>
                </div>
            </section>

            <section className="contact-info-social">
                <div className="info-social-container" data-aos="fade-up" data-aos-delay="100">
                    <div className="info-section">
                        <h2>Contact Information</h2>
                        <p><strong>Email:</strong>
                            <a href="mailto:physicvfx.pro@gmail.com">physicvfx.pro@gmail.com</a>
                        </p>
                        <p><strong>Address:</strong> Normandie, France</p>
                    </div>
                    <div className="social-section">
                        <h2>Follow Us</h2>
                        <div className="social-links">
                            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">Facebook</a>
                            <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">Twitter</a>
                            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">Instagram</a>
                            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;
