import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Article } from '../types/types';
import Footer from './Footer';

// Import GraphQL operations
import { LIKE_ARTICLE, UNLIKE_ARTICLE, CREATE_ARTICLE } from '../graphql/mutations';
import { GET_ALL_ARTICLES } from '../graphql/queries';

// Import styles
import '../styles/feedpage.scss';

const FeedPage = () => {
  const [view, setView] = useState<'myPosts' | 'community'>('myPosts');
  const navigate = useNavigate();
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostDescription, setNewPostDescription] = useState('');

  // Use Apollo Client hooks with types
  const { data: allPostsData, loading: loadingAllPosts, refetch: refetchAllPosts } = useQuery<{ getAllArticles: Article[] }>(GET_ALL_ARTICLES);

  // Setup mutations with Apollo Client
  const [createPost, { loading: creating, error: createPostError }] = useMutation(CREATE_ARTICLE, {
    onCompleted: () => {
      refetchAllPosts();
      setNewPostTitle('');
      setNewPostDescription('');
      alert("Post created successfully!");
    },
    onError: (error) => {
      alert(`Error on creating post: ${error.message}`);
    }
  });

  const [likePost] = useMutation(LIKE_ARTICLE, {
    onCompleted: (data) => {
      refetchAllPosts();
      alert("Article liked!");
    },
    onError: (error) => alert(`Error liking article: ${error.message}`)
  });

  const [unlikePost] = useMutation(UNLIKE_ARTICLE, {
    onCompleted: (data) => {
      refetchAllPosts();
      alert("Article unliked!");
    },
    onError: (error) => alert(`Error unliking article: ${error.message}`)
  });

  // Event handlers
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleCreatePost = () => {
    if (!newPostTitle || !newPostDescription) {
      alert("Please fill in both title and description");
      return;
    }
    createPost({ variables: { title: newPostTitle, description: newPostDescription } });
  };

  const handleLike = (articleId: string) => {
    likePost({ variables: { articleId } });
  };

  const handleUnlike = (articleId: string) => {
    unlikePost({ variables: { articleId } });
  };

  const handleSetView = (viewType: 'myPosts' | 'community') => {
    setView(viewType);
  };

  return (
    <div className="feed-page">
      <div className="user-panel">
        <span>Email: {localStorage.getItem('email')}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="navigation">
        <button onClick={() => handleSetView('myPosts')}>My Posts</button>
        <button onClick={() => handleSetView('community')}>Community Posts</button>
      </div>
      <div className="content">
        {view === 'myPosts' && (
          <div className="create-post-container">
            <h2>Create a New Post</h2>
            <input 
              className="post-input" 
              placeholder="Title" 
              value={newPostTitle} 
              onChange={e => setNewPostTitle(e.target.value)} 
            />
            <textarea 
              className="post-textarea" 
              placeholder="Description" 
              value={newPostDescription} 
              onChange={e => setNewPostDescription(e.target.value)} 
            />
            <button 
              className="post-button" 
              onClick={handleCreatePost} 
              disabled={creating}
            >
              {creating ? 'Creating...' : 'Create New Post'}
            </button>
          </div>
        )}
        {view === 'community' && (
          <div className="posts">
            {loadingAllPosts ? <p>Loading...</p> : allPostsData?.getAllArticles.map((article: Article) => (
              <div key={article.id} className="post">
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <p>Likes: {article.numberOfLikes}</p>
                <button className="like-button" onClick={() => handleLike(article.id)}>Like</button>
                <button className="unlike-button" onClick={() => handleUnlike(article.id)}>Unlike</button>
                <div className="comments">
                  <h4>Comments:</h4>
                  {article.comments?.map(comment => (
                    <div key={comment.id} className="comment">
                      <p><strong>{comment.user.username}:</strong> {comment.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default FeedPage;
