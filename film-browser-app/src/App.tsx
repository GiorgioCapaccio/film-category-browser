import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/main.scss';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import FilmPage from './pages/FilmPage/FilmPage';
import WishlistPage from './pages/WishlistPage/WishlistPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/film/:id" element={<FilmPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            {/* <Route path="*" element={<HomePage />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;