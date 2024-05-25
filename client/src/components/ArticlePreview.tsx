import React from 'react';
import '../styles/articlePreview.scss';
import imagePreview from '../images/Preview.jpeg';

interface ArticlePreviewProps {
  title: string;
  content: string;
  imageUrl: string;
}


const ArticlePreview: React.FC<ArticlePreviewProps> = ({ title, content, imageUrl }) => {
  return (
    <div className="article-preview">
      <div className="image-section">
        <img src={imagePreview} alt={title} />
      </div>
      <div className="content-section">
        <h3>{title}</h3>
        <p>{content}</p>
        <ul>
          <li>Connect with friends and the world around you</li>
          <li>Share photos, videos, and moments</li>
          <li>Interactive real-time communication</li>
          <li>Personalized content and newsfeed</li>
          <li>Advanced privacy and security features</li>
        </ul>
      </div>
    </div>
  );
};

export default ArticlePreview;


