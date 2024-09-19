import React from 'react';
import HeaderSection from '../components/home/HeaderSection';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import FooterSection from '../components/home/FooterSection';

/**
 * HomePage component is the main page of the application
 * 
 * @component
 * @returns {JSX.Element} The rendered HomePage component
 */
const HomePage = () => {
    return (
        <div>
        <HeaderSection />
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <FooterSection />
        </div>
    );
};

export default HomePage;