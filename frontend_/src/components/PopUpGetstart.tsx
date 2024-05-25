import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { CloseButton } from '../styles';

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupContent = styled.div`
  background-color: #ffffff;
  padding: 2em;
  border-radius: 10px;
  text-align: center;
  position: relative; /* Ajout pour positionner correctement le bouton de fermeture */
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1em;
  margin-top: 1em;
`;

const PopUpGetstart: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
    onClose();
  };

  const handleRegister = () => {
    navigate('/register');
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <PopupOverlay>
      <PopupContent>
        <CloseButton onClick={handleClose}>
          <FaTimes />
        </CloseButton>
        <h3>Avez-vous déjà un compte ?</h3>
        <ButtonGroup>
          <button onClick={handleLogin}>Oui, je veux me connecter</button>
          <button onClick={handleRegister}>Non, je veux m'inscrire</button>
        </ButtonGroup>
      </PopupContent>
    </PopupOverlay>
  );
};

export default PopUpGetstart;
