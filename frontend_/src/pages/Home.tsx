import React from 'react';
import HomeComponent from '../components/HomeComponent';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Home: React.FC = () => (
  <div>
    <Header />
    <HomeComponent />
    <Footer />
  </div>
);

export default Home;
