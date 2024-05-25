import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import HomePage from './components/HomePage';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import Header from './components/Header';
import Footer from './components/Footer';
import FeedPage from './components/FeedPage';

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/feed" element={<FeedPage />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;





