import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookSquare,
  faInstagram,
  faTwitter,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';

const StyledFooter = styled.footer`
  background-color: #f8f9fa;
  color: #6c757d;
  padding: 2em 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1em;
  margin-bottom: 1em;
`;

const IconLink = styled.a`
  color: #6c757d;
  transition: color 0.2s;

  &:hover {
    color: #007bff;
  }
`;

const InfoSection = styled.div`
  text-align: center;
`;

const Footer: React.FC = () => (
  <StyledFooter>
    <SocialIcons>
      <IconLink href="#">
        <FontAwesomeIcon icon={faFacebookSquare} size="2x" />
      </IconLink>
      <IconLink href="#">
        <FontAwesomeIcon icon={faInstagram} size="2x" />
      </IconLink>
      <IconLink href="#">
        <FontAwesomeIcon icon={faTwitter} size="2x" />
      </IconLink>
      <IconLink href="#">
        <FontAwesomeIcon icon={faLinkedin} size="2x" />
      </IconLink>
    </SocialIcons>
    <InfoSection>
      <p>&copy; 2024 PostSphere. All rights reserved.</p>
      <p>Terms of Service | Privacy Policy</p>
    </InfoSection>
  </StyledFooter>
);

export default Footer;
