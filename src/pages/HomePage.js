import React from 'react';
import './HomePage.css'; // Import CSS file for HomePage

const HomePage = () => {
    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Welcome to YourHR</h1>
                <p>Your gateway to finding the perfect job!</p>
            </header>
            <section className="home-content">
                <p>We help job seekers find their ideal roles based on qualifications and preferences.</p>
                <a href="/signup" className="cta-button">Get Started</a>
            </section>
        </div>
    );
};

export default HomePage;
