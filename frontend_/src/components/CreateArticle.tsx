import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_ARTICLE } from '../queries/createArticle';
import { CreateArticleMutation, CreateArticleMutationVariables } from '../generated/graphql';
import { FormContainer, FormField, SubmitButton, SuccessMessage, CloseButton } from '../styles';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { GET_ALL_ARTICLES } from '../queries/getAllArticles';

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
  position: relative;
`;

const CreateArticle: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [articleCreated, setArticleCreated] = useState(false);
  const [createArticle, { loading, error }] = useMutation<CreateArticleMutation, CreateArticleMutationVariables>(CREATE_ARTICLE, {
    refetchQueries: [{ query: GET_ALL_ARTICLES }],
    awaitRefetchQueries: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createArticle({ variables: { title, description } });
      setArticleCreated(true);
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error('Error creating article:', err);
    }
  };

  return (
    <PopupOverlay>
      <PopupContent>
        <CloseButton onClick={onClose}>
          <FaTimes />
        </CloseButton>
        <FormContainer>
          <form onSubmit={handleSubmit}>
            <FormField>
              <label>Titre</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
              />
            </FormField>
            <FormField>
              <label>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                required
              />
            </FormField>
            <SubmitButton type="submit" disabled={loading}>Créer un nouvel article</SubmitButton>
          </form>
          {articleCreated && (
            <SuccessMessage>Article crée avec succès !</SuccessMessage>
          )}
          {error && <p>Error: {error.message}</p>}
        </FormContainer>
      </PopupContent>
    </PopupOverlay>
  );
};

export default CreateArticle;
