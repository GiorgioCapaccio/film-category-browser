import React, { useEffect } from 'react';
import { useFilmStore } from '../../store/filmStore';
import './HomePage.scss';
import Loading from '../../components/Loading/Loading';
import Carousel from '../../components/Carousel/Carousel';

const HomePage: React.FC = () => {
  const {
    actionFilms,
    comedyFilms,
    dramaFilms,
    loading,
    error,
    fetchAllFilms,
    clearError
  } = useFilmStore();

  useEffect(() => {
    const hasAnyFilms = actionFilms.length > 0 || comedyFilms.length > 0 || dramaFilms.length > 0;
    if (!hasAnyFilms && !loading) {
      fetchAllFilms();
    }
  }, [actionFilms.length, comedyFilms.length, dramaFilms.length, loading, fetchAllFilms]);

  const handleRetry = () => {
    clearError();
    fetchAllFilms();
  };

  if (loading && actionFilms.length === 0 && comedyFilms.length === 0 && dramaFilms.length === 0) {
    return (
      <div className="home-page">
        <Loading text="Loading films..." size="large" />
      </div>
    );
  }

  if (error && actionFilms.length === 0 && comedyFilms.length === 0 && dramaFilms.length === 0) {
    return (
      <div className="home-page">
        <div className="error-container">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={handleRetry}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="home-page">
      <Carousel
        title="Action Movies"
        films={actionFilms}
        category="action"
      />
      
      <Carousel
        title="Comedy Movies"
        films={comedyFilms}
        category="comedy"
      />
      
      <Carousel
        title="Drama Movies"
        films={dramaFilms}
        category="drama"
      />
    </div>
  );
};

export default HomePage;