import React from 'react';
import ArticlePreview from './ArticlePreview';
import Header from './Header';
import Footer from './Footer';

const HomePage: React.FC = () => {
  return (
    <div className="HomePage">
      <Header/>
      <main>
        <ArticlePreview
          title="Discover the World of Connectivity"
          content="Explore new connections and enjoy seamless interaction in our global community. Share your thoughts, photos, and more!"
          imageUrl="../images/Preview.jpeg"
        />
      </main>
      <Footer/>
    </div>
  );
};

export default HomePage;

