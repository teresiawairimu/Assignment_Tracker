import React from 'react';
import HeaderSection from '../components/home/HeaderSection';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import FooterSection from '../components/home/FooterSection';

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