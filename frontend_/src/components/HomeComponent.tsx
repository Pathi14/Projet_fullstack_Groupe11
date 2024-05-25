import React, { useState } from 'react';
import styled from 'styled-components';
import PopUpGetstart from '../components/PopUpGetstart';

const MainContainer = styled.div`
  text-align: center;
  padding: 2em;
  background-color: #f0f4f8;
  min-height: 100vh;
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2em;
  background-color: #e0f7fa;

  h2 {
    font-size: 2.5em;
    margin: 0.5em 0;
  }

  p {
    font-size: 1.2em;
    max-width: 600px;
  }

  button {
    margin-top: 1em;
    padding: 0.5em 2em;
    font-size: 1em;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const StatsSection = styled.section`
  display: flex;
  justify-content: space-around;
  padding: 2em;
  background-color: #ffffff;

  div {
    text-align: center;
  }

  h3 {
    font-size: 2em;
    color: #007bff;
  }

  p {
    font-size: 1.2em;
  }
`;

const ServicesSection = styled.section`
  padding: 2em;
  background-color: #f0f4f8;
  text-align: center;

  h2 {
    font-size: 2em;
    margin-bottom: 1em;
  }

  p {
    font-size: 1.2em;
    max-width: 600px;
    margin: auto;
  }
`;

const HomeComponent: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <>
      <MainContainer>
        <HeroSection>
          <h2>Se Connecter, Créer, Partager : Grandir au sein de notre communauté</h2>
          <p>Favoriser des expériences sociales captivantes qui inspirent, émeuvent, transforment les utilisateurs et met en avant la communication.</p>
          <button onClick={togglePopup}>Get Started</button>
          {showPopup && <PopUpGetstart onClose={togglePopup} />}
        </HeroSection>
        <StatsSection>
          <div>
            <h3>500+</h3>
            <p>Utilisateurs</p>
          </div>
          <div>
            <h3>350+</h3>
            <p>Jeune entre 16 et 26 ans</p>
          </div>
        </StatsSection>
        <ServicesSection>
          <h2>Pourquoi pas vous ?</h2>
          <p>N'hésitez pas à nous rejoindre, vous trouverez certainement votre satisfaction.</p>
        </ServicesSection>
      </MainContainer>
    </>
  );
};

export default HomeComponent;
