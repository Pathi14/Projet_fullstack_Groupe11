import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_ARTICLES } from '../queries/getAllArticles';
import { GetAllArticlesQuery } from '../generated/graphql';
import styled from 'styled-components';
import { LikeIcon, CommentIcon, AddIcon, SubmitButton } from '../styles';
import { LIKE_ARTICLE } from '../queries/likeArticle';
import { UNLIKE_ARTICLE } from '../queries/unlikeArticle';
import { CREATE_COMMENT } from '../queries/createComment';
import CreateArticle from './CreateArticle';

const ArticleContainer = styled.div`
  margin: 20px;
`;

const Textarea = styled.textarea`
  width: 98%;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ArticleCard = styled.div`
  border: 1px solid #cccccc;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
`;

const ArticleTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const ArticleAuthor = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ArticleDescription = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
`;

const ArticleContent = styled.div`
  margin: 10px 0;
`;

const CommentSection = styled.div`
  background-color: #f0f0f0;
  padding: 10px;
  margin-top: 10px;
`;

const LikeCount = styled.span`
  color: #007bff;
  margin-right: 10px;
  cursor: pointer;
`;

const SeeMoreLink = styled.span`
  color: #007bff;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const SeeLessLink = styled.span`
  color: #007bff;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const CreatePostButton = styled.button`
  margin-bottom: 20px;
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const AddCommentButton = styled.span`
  color: #007bff;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  margin-right: 10px;

  & svg {
    margin-right: 5px;
  }
`;

const ArticleList: React.FC = () => {
  const { loading, error, data } = useQuery<GetAllArticlesQuery>(GET_ALL_ARTICLES);
  const [expandedComments, setExpandedComments] = useState<string[]>([]);
  const [likedArticles, setLikedArticles] = useState<string[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [commentingArticle, setCommentingArticle] = useState<string | null>(null);
  const [isCreateArticlePopupVisible, setIsCreateArticlePopupVisible] = useState(false);

  const [likeArticle] = useMutation(LIKE_ARTICLE, {
    refetchQueries: [{ query: GET_ALL_ARTICLES }],
    awaitRefetchQueries: true,
  });

  const [unlikeArticle] = useMutation(UNLIKE_ARTICLE, {
    refetchQueries: [{ query: GET_ALL_ARTICLES }],
    awaitRefetchQueries: true,
  });

  const [addComment] = useMutation(CREATE_COMMENT, {
    refetchQueries: [{ query: GET_ALL_ARTICLES }],
    awaitRefetchQueries: true,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const articles = data?.getAllArticles ?? [];

  const handleExpandComments = (articleId: string) => {
    if (expandedComments.includes(articleId)) {
      setExpandedComments(expandedComments.filter((id) => id !== articleId));
    } else {
      setExpandedComments([...expandedComments, articleId]);
    }
  };

  const handleLikeArticle = (articleId: string) => {
    likeArticle({ variables: { articleId } }).then(() => {
      setLikedArticles([...likedArticles, articleId]);
    });
  };

  const handleUnlikeArticle = (articleId: string) => {
    unlikeArticle({ variables: { articleId } }).then(() => {
      setLikedArticles(likedArticles.filter((id) => id !== articleId));
    });
  };

  const handleAddComment = async (articleId: string) => {
    if (newComment.trim() === '') return;
    try {
      await addComment({ variables: { articleId, content: newComment } });
      setCommentingArticle(null);
      setNewComment('');
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  const isArticleLiked = (articleId: string) => likedArticles.includes(articleId);

  return (
    <ArticleContainer>
      <CreatePostButton onClick={() => setIsCreateArticlePopupVisible(true)}>
        Créer un nouvel article
      </CreatePostButton>

      {isCreateArticlePopupVisible && (
        <CreateArticle onClose={() => setIsCreateArticlePopupVisible(false)} />
      )}

      {articles.map((article) =>
        article ? (
          <ArticleCard key={article.id}>
            <ArticleAuthor>Auteur: {article.user?.username ?? 'Unknown'}</ArticleAuthor>
            <ArticleTitle>{article.title}</ArticleTitle>
            <ArticleDescription>{article.description}</ArticleDescription>
            <ArticleContent>
              <LikeCount onClick={() => isArticleLiked(article.id) ? handleUnlikeArticle(article.id) : handleLikeArticle(article.id)}>
                <LikeIcon /> {article.numberOfLikes} likes
              </LikeCount>
              <CommentSection>
                <AddCommentButton onClick={() => setCommentingArticle(article.id)}>
                  <AddIcon /> Ajouter un commentaire
                </AddCommentButton>
                {commentingArticle === article.id && (
                  <div>
                    <Textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Rédiger votre comentaire..."
                    /> <br/>
                    <SubmitButton type="submit" onClick={() => handleAddComment(article.id)}>Valider</SubmitButton>
                  </div>
                )}
                {article.comment && article.comment.length > 0 && (
                  <>
                    <h3>Commentaires :</h3>
                    <p><CommentIcon /> {article.comment[0]?.user?.username ?? 'Unknown'}: {article.comment[0]?.content}</p>
                    {expandedComments.includes(article.id) ? (
                      <>
                        {article.comment.slice(1).map((comment) => (
                          <p key={comment?.id}><CommentIcon /> {comment?.user?.username ?? 'Unknown'}: {comment?.content}</p>
                        ))}
                        <SeeLessLink onClick={() => handleExpandComments(article.id)}>voir moins de commentaires</SeeLessLink>
                      </>
                    ) : (
                      article.comment.length > 1 && (
                        <SeeMoreLink onClick={() => handleExpandComments(article.id)}>
                          voir tous les commentaires
                        </SeeMoreLink>
                      )
                    )}
                  </>
                )}
              </CommentSection>
            </ArticleContent>
          </ArticleCard>
        ) : null
      )}
    </ArticleContainer>
  );
};

export default ArticleList;
