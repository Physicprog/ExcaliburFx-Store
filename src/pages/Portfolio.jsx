import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';

const Portfolio = () => {
    useEffect(() => {
        AOS.init({
            duration: 700,
            easing: 'ease-out-cubic',
            once: true,
            offset: 60,
        });
    }, []);

    const getLevelLabel = (percentage) => {
        if (percentage >= 101) return "Legend+";
        if (percentage >= 91) return "Legend";
        if (percentage >= 71) return "Pro";
        if (percentage >= 41) return "Medium";
        return "Beginner";
    };

    const getLevelColor = (percentage) => {
        if (percentage >= 101) return "#00ff88";
        if (percentage >= 91) return "#d4ae62";
        if (percentage >= 71) return "#b8943e";
        if (percentage >= 41) return "#f59e0b";
        return "#ef4444";
    };

    const projects = [
        {
            id: 1,
            title: "ExcaliburFX",
            category: "After Effects CEP Extension",
            description: "A powerful toolkit for motion designers to streamline their workflow and unleash creativity",
            image: "/src/assets/excaliburfx.jpg",
            year: "2026",
            type: "Informatique",
            link: "/ExcaliburFx-Store/"
        },
        {
            id: 2,
            title: "ArtInstitute",
            category: "PHP & MySQL Web App",
            description: "Website to show all artworks of the Art Institute of Chicago, with an account and cart system",
            image: "/src/assets/artinstitute.jpg",
            year: "2026",
            type: "Informatique",
            link: "https://github.com/Physicprog/ArtInstitute"
        },
        {
            id: 3,
            title: "Task Manager",
            category: "React, MySQL & Node.js App",
            description: "A task management application with user authentication, full card management, and an interface to make organizing your projects with the Kanban method",
            image: "/src/assets/task-manager.jpg",
            year: "2025",
            type: "Informatique",
            link: "https://github.com/Physicprog/TaskManager"
        },
        {
            id: 4,
            title: "Yearbook",
            category: "Python (Tkinter) App",
            description: "A Python Tkinter application to show personalized yearbooks with custom settings",
            image: "/src/assets/yearbook.jpg",
            year: "2023",
            type: "Informatique",
            link: "https://github.com/Physicprog/Yearbook"
        },
        {
            id: 5,
            title: "CineVillage",
            category: "JavaScript website",
            description: "A website to show the trendiest movies of the moment, with a search engine and a detailed page for each movie, using the TMDB API",
            image: "/src/assets/cinevillage.jpg",
            year: "2025",
            type: "Informatique",
            link: "https://github.com/Physicprog/CineVillage"
        },
        {
            id: 6,
            title: "Paid videos for clients list",
            category: "Car edits for clients",
            description: "Here is an example of an automotive video montage I created for a client, with a very trendy style and dynamic editing adapted to the music chosen by the client, in order to maximize the number of views.",
            image: "/src/assets/paid-videos.jpg",
            year: "2025",
            type: "Montage",
            link: ["https://www.instagram.com/p/DPwcJS-kk-5/", "https://www.instagram.com/p/DPN510lkqop/", "https://www.instagram.com/p/DIZXZciyCDm/"]
        }
    ];

    const skillsCode = [
        { name: "HTML", level: 80, estimatedTime: "< 2 ans" },
        { name: "CSS", level: 70, estimatedTime: "< 2 ans" },
        { name: "JavaScript", level: 95, estimatedTime: "< 1 ans" },
        { name: "React", level: 50, estimatedTime: "< 1 ans" },
        { name: "PHP", level: 40, estimatedTime: "< 1 ans" },
        { name: "ExtendScript", level: 80, estimatedTime: "< 1 ans" },
        { name: "Python", level: 95, estimatedTime: "> 4 ans" },
        { name: "MySQL", level: 80, estimatedTime: "> 2 ans" }
    ];

    const skillsPost = [
        { name: "After Effects", level: 110, estimatedTime: "> 10 ans" },
        { name: "Premiere Pro", level: 50, estimatedTime: "> 3 ans" },
        { name: "DaVinci", level: 50, estimatedTime: "> 1 an" },
        { name: "Blender", level: 75, estimatedTime: "> 12 ans" },
        { name: "Lightroom", level: 35, estimatedTime: "< 1 ans" }
    ];

    return (
        <>
            <section className="portfolio-hero">
                <div className="portfolio-hero-content" data-aos="fade-up">
                    <h1>My Portfolio</h1>
                    <p>Showcasing creative motion design work and professional achievements</p>
                </div>
            </section>
            <section className="portfolio-intro">
                <div className="portfolio-container">
                    <div className="intro-content" data-aos="fade-right">
                        <h2>Passionate Motion Designer</h2>
                        <p>
                            I'm a motion design specialist with 5+ years of experience creating stunning visual content for brands, films, and interactive applications. My expertise lies in crafting compelling narratives through motion, combining technical precision with creative storytelling.
                        </p>
                        <p>
                            When I'm not creating motion magic, I'm exploring new animation techniques, contributing to the motion design community, and continuously pushing the boundaries of what's possible in After Effects.
                        </p>
                    </div>
                    <div className="skills-showcase" data-aos="fade-left">
                        <h3>Core Skills</h3>

                        <h4 className="skills-category">Code</h4>
                        <div className="skills-grid">
                            {skillsCode.map((skill, idx) => (
                                <div key={idx} className="skill-tag" data-aos="zoom-in" data-aos-delay={idx * 30}>
                                    <div className="skill-header">
                                        <div>
                                            <span className="skill-name">{skill.name}</span>
                                            <span className="skill-level-label" style={{ color: getLevelColor(skill.level) }}>{getLevelLabel(skill.level)}</span>
                                        </div>
                                        <span className="skill-percentage" style={{ color: getLevelColor(skill.level) }}>{skill.level}%</span>
                                    </div>
                                    <div className="skill-bar">
                                        <div className="skill-progress" style={{ background: `linear-gradient(90deg, ${getLevelColor(skill.level)}, ${getLevelColor(skill.level)})`, width: `${Math.min(skill.level, 100)}%` }}></div>
                                    </div>
                                    <div className="skill-time">{skill.estimatedTime}</div>
                                </div>
                            ))}
                        </div>

                        <h4 className="skills-category">Montage</h4>
                        <div className="skills-grid">
                            {skillsPost.map((skill, idx) => (
                                <div key={idx} className="skill-tag" data-aos="zoom-in" data-aos-delay={idx * 30}>
                                    <div className="skill-header">
                                        <div>
                                            <span className="skill-name">{skill.name}</span>
                                            <span className="skill-level-label" style={{ color: getLevelColor(skill.level) }}>{getLevelLabel(skill.level)}</span>
                                        </div>
                                        <span className="skill-percentage" style={{ color: getLevelColor(skill.level) }}>{skill.level}%</span>
                                    </div>
                                    <div className="skill-bar">
                                        <div className="skill-progress" style={{ background: `linear-gradient(90deg, ${getLevelColor(skill.level)}, ${getLevelColor(skill.level)})`, width: `${Math.min(skill.level, 100)}%` }}></div>
                                    </div>
                                    <div className="skill-time">{skill.estimatedTime}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="portfolio-section">
                <div className="portfolio-container">
                    <h2 className="section-title" data-aos="fade-up">Informatique Projects</h2>
                    <div className="portfolio-items">
                        {projects.filter(p => p.type === "Informatique").map((project, idx) => (
                            <div key={project.id} className={`portfolio-item ${idx % 2 === 0 ? 'text-left' : 'text-right'}`} data-aos="fade-up">
                                <div className="portfolio-image">
                                    <img src={project.image} alt={project.title} className="project-image" />
                                </div>
                                <div className="portfolio-text">
                                    <div className="project-meta">
                                        <span className="project-category">{project.category}</span>
                                        <span className="project-year">{project.year}</span>
                                    </div>
                                    <h3>{project.title}</h3>
                                    <p>{project.description}</p>
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="view-project">View Project →</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="portfolio-section">
                <div className="portfolio-container">
                    <h2 className="section-title" data-aos="fade-up">Montage Projects</h2>
                    <div className="portfolio-items">
                        {projects.filter(p => p.type === "Montage").map((project, idx) => (
                            <div key={project.id} className={`portfolio-item ${idx % 2 === 0 ? 'text-left' : 'text-right'}`} data-aos="fade-up">
                                <div className="portfolio-image">
                                    <img src={project.image} alt={project.title} className="project-image" />
                                </div>
                                <div className="portfolio-text">
                                    <div className="project-meta">
                                        <span className="project-category">{project.category}</span>
                                        <span className="project-year">{project.year}</span>
                                    </div>
                                    <h3>{project.title}</h3>
                                    <p>{project.description}</p>
                                    {Array.isArray(project.link) ? (
                                        <div className="view-projects">
                                            {project.link.map((link, linkIdx) => (
                                                <a key={linkIdx} href={link} target="_blank" rel="noopener noreferrer" className="view-project">
                                                    {`Video ${linkIdx + 1}`} →
                                                </a>
                                            ))}
                                        </div>
                                    ) : (
                                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="view-project">View Project →</a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="portfolio-stats">
                <div className="stats-container">
                    <div className="stat-item" data-aos="fade-up" data-aos-delay="0">
                        <div className="stat-number">15+</div>
                        <div className="stat-label">Video made for Clients</div>
                    </div>
                    <div className="stat-item" data-aos="fade-up" data-aos-delay="50">
                        <div className="stat-number">5M+</div>
                        <div className="stat-label">Views</div>
                    </div>
                    <div className="stat-item" data-aos="fade-up" data-aos-delay="100">
                        <div className="stat-number">10+</div>
                        <div className="stat-label">Years Experience</div>
                    </div>
                    <div className="stat-item" data-aos="fade-up" data-aos-delay="150">
                        <div className="stat-number">5000+</div>
                        <div className="stat-label">Hours of Work</div>
                    </div>
                </div>
            </section>
            <section className="portfolio-cta">
                <div className="cta-container" data-aos="fade-up">
                    <h2>Interested in Collaborating?</h2>
                    <p>Let's create something amazing together</p>
                    <Link to="/contact" className="btn-primary">Contact Me</Link>
                </div>
            </section>
        </>
    );
};

export default Portfolio;
