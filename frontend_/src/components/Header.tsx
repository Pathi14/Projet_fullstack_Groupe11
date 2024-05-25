import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Navigation, StyledHeader } from '../styles';


const Header: React.FC = () => (
  <>
    <StyledHeader>
      <h1>PostSphere</h1>
      <Navigation>
        <ul>
          <li>
            <Link to="/login">
              <FontAwesomeIcon icon={faSignInAlt} className="icon" />
              Se connecter
            </Link>
          </li>
          <li>
            <Link to="/register">
              <FontAwesomeIcon icon={faUserPlus} className="icon" />
              S'inscrire
            </Link>
          </li>
        </ul>
      </Navigation>
    </StyledHeader>
  </>
);

export default Header;
