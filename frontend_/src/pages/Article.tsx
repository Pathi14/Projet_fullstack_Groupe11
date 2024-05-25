import React from 'react';
import { Link } from 'react-router-dom';
import ArticleList from '../components/ArticleList';
import Footer from '../components/Footer';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Navigation, StyledHeader } from '../styles';

const Article: React.FC = () => (
  <div>
    <>
      <StyledHeader>
        <h1>PostSphere</h1>
        <Navigation>
          <ul>
            <li>
              <Link to="/">
                <FontAwesomeIcon icon={faSignInAlt} className="icon" />
                Exit
              </Link>
            </li>
          </ul>
        </Navigation>
      </StyledHeader>
      <ArticleList />
      <Footer />
    </>
  </div>
);

export default Article;
