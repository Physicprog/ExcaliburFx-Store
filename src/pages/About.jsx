import React, { useEffect } from 'react';
import AOS from 'aos';
import { Link, useNavigate } from 'react-router-dom';
import loaderGif from '../assets/Logo/logo.png';
const About = () => {
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({
            duration: 700,
            easing: 'ease-out-cubic',
            once: true,
            offset: 60,
        });
    }, []);

    const goToDownload = () => {
        navigate('/');
        setTimeout(() => {
            document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    return (
        <>

            <section className="about-hero">
                <div data-aos="fade-up">
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
                            <h1>About ExcaliburFX</h1>
                            <img src={loaderGif} alt="ExcaliburFX Logo" style={{ width: '105px', height: '105px', objectFit: 'contain', marginBottom: '20px' }} />
                        </div>
                        <p>The story behind</p>
                    </div>
                </div>
            </section>


            <section className="about-section">
                <div className="about-container">
                    <div className="about-content" data-aos="fade-up">
                        <h2>Why I Created ExcaliburFX</h2>
                        <p>
                            ExcaliburFX was born from frustration. As motion designers / editors ourselves, I was tired of spending countless hours recreating the same effects, applying the same presets, and spamming the same keyboard shortcuts in every project.
                        </p>
                        <p>
                            I realized that the most powerful tool is not always the one with the most creative features, but the one that understands the creator's workflow. That's when I decided to build something different; a toolkit that doesn't just add functionality, but reimagines how motion designers work.

                        </p>
                        <p>
                            Made by an editor for editors.
                        </p>
                    </div>

                    <div className="about-content" data-aos="fade-up" data-aos-delay="100">
                        <h2>My Mission</h2>
                        <p>
                            My goal is to provide motion designers with a powerful yet intuitive toolkit that streamlines their workflow and unlocks their creative potential. Created to make an edit feel more faster, more intuitive, and more enjoyable, ExcaliburFX is designed to be the ultimate companion for any motion design project.
                        </p>
                        <p>
                            Whether you're working on a fast-paced commercial, a cinematic opening sequence, or experimental motion art, ExcaliburFX gives you professional-grade tools that adapt to your workflow, not the other way around.
                        </p>
                    </div>

                    <div className="about-content" data-aos="fade-up" data-aos-delay="200">
                        <h2>Our Values</h2>
                        <ul className="values-list">
                            <li data-aos="fade-right" data-aos-delay="50">
                                <strong>Simplicity Through Power</strong><br />Complex tools should feel intuitive. We believe in elegant design that doesn't compromise on capability.
                            </li>
                            <li data-aos="fade-right" data-aos-delay="100">
                                <strong>Community First</strong><br />I listen to all our users. Your feedback shapes our roadmap and ensures ExcaliburFX evolves with your needs.
                            </li>
                            <li data-aos="fade-right" data-aos-delay="150">
                                <strong>Continuous Innovation</strong><br />Motion design is always evolving. We're committed to staying ahead with regular updates and new features.
                            </li>
                            <li data-aos="fade-right" data-aos-delay="200">
                                <strong>For all</strong><br />Whether you're a freelancer, a studio, or a hobbyist, ExcaliburFX is designed to empower creators of all levels and backgrounds. My goal is to make some process wich everyone have to do in every project, faster, more intuitive, and more enjoyable.
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="about-cta">
                <div className="cta-content" data-aos="fade-up">
                    <h2>Ready to Join the Community?</h2>
                    <p>Experience the ultimate After Effects toolkit and transform your motion design workflow.</p>
                    <button onClick={goToDownload} className="btn-primary">Get Started</button>
                </div>
            </section>
        </>
    );
};

export default About;
