import styled from 'styled-components';
import { FaThumbsUp, FaComment, FaPlus } from 'react-icons/fa';

export const PageContainer = styled.div`
  background-color: #cce5ff; /* Bleu clair */
  color: #007bff; /* Bleu foncé pour le texte */
  font-family: 'Roboto', sans-serif;
`;

export const Header = styled.header`
  background-color: #007bff; /* Bleu foncé */
  color: #ffffff; /* Blanc pour le texte */
  padding: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FormContainer = styled.div`
  background-color: #ffffff; /* Blanc */
  border: 1px solid #cccccc; /* Gris clair */
  padding: 1em;
  width: 300px;
  margin: 2em auto;
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;

  label {
    margin-bottom: 0.5em;
  }

  input {
    padding: 0.5em;
    font-size: 1em;
    border: 1px solid #cccccc; /* Gris clair */
  }

  button {
    background-color: #007bff; /* Bleu foncé */
    color: #ffffff;
    border: none;
    padding: 0.5em 1em;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #0056b3; /* Bleu un peu plus foncé */
    }
  }
`;

export const ArticleContainer = styled.div`
  border: 1px solid #cccccc; /* Gris clair */
  padding: 1em;
  margin: 1em 0;
  background-color: #f9f9f9; /* Fond de l'article */
`;

export const ArticleTitle = styled.h2`
  color: #007bff; /* Bleu foncé */
`;

export const LikeIcon = styled(FaThumbsUp)`
  color: #007bff; /* Bleu foncé */
`;

export const CommentIcon = styled(FaComment)`
  color: #007bff; /* Bleu foncé */
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background-color: #cccccc;
  }
`;

export const AddIcon = styled(FaPlus)`
  // Ajoutez les styles que vous voulez pour l'icône
  margin-right: 5px;
`;

export const SuccessMessage = styled.p`
  color: green;
  margin-top: 10px;
`;

export const StyledHeader = styled.header`
  background-color: #007bff;
  color: #ffffff;
  padding: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    margin: 0;
  }
`;

export const Navigation = styled.nav`
  ul {
    list-style-type: none;
    display: flex;
    gap: 1em;
    margin: 0;
    padding: 0;
  }

  li {
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: #ffffff;
    transition: color 0.2s;
    display: flex;
    align-items: center;

    &:hover {
      color: #cce5ff;
    }
  }

  .icon {
    margin-right: 0.5em;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  background-color: transparent;
  color: #6c757d;
  border: none;
  padding: 0.5em;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #000000;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px`;
