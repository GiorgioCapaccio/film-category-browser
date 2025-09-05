import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { useFilmStore } from "../../store/filmStore";
import { useWishlistStore } from "../../store/wishlistStore";
import "./FilmPage.scss";

const FilmPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentFilm, loading, error, fetchFilmDetails } = useFilmStore();
  const { addToWishlist, removeFromWishlist, isInWishlist } =
    useWishlistStore();

  const filmId = id ? parseInt(id) : 0;
  const inWishlist = currentFilm ? isInWishlist(currentFilm.id) : false;

  useEffect(() => {
    if (filmId && !isNaN(filmId)) {
      fetchFilmDetails(filmId);
    } else {
      navigate("/");
    }
  }, [filmId, fetchFilmDetails, navigate]);

  const handleWishlistToggle = () => {
    if (currentFilm) {
      if (inWishlist) {
        removeFromWishlist(currentFilm.id);
      } else {
        addToWishlist(currentFilm);
      }
    }
  };

  const formatRuntime = (minutes?: number) => {
    if (!minutes) return "";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const goBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="film-page">
        <Loading text="Loading film details..." size="large" />
      </div>
    );
  }

  if (error || !currentFilm) {
    return (
      <div className="film-page">
        <div className="error-container">
          <h2>Film not found</h2>
          <p>
            The film you're looking for doesn't exist or couldn't be loaded.
          </p>
          <button onClick={() => navigate("/")}>Go Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="film-page">
      <div className="film-page__header">
        <button className="back-btn" onClick={goBack}>
          ← Back
        </button>
        <h1 className={`film-title ${currentFilm.category}`}>
          {currentFilm.title}
        </h1>
      </div>

      <div className="film-page__content">
        <div className="film-left">
          <div className="film-poster">
            <img src={currentFilm.image} alt={currentFilm.title} />
          </div>
        </div>

        <div className="film-right">
          <div className="film-meta">
            <div className="meta-item">
              <strong>Year:</strong> {currentFilm.year}
            </div>
            <div className="meta-item">
              <strong>Category:</strong>
              <span className={`category-badge ${currentFilm.category}`}>
                {currentFilm.category.toUpperCase()}
              </span>
            </div>
            <div className="meta-item">
              <strong>Rating:</strong>
              <span className={`category-badge ${currentFilm.rating}`}>
                { currentFilm.rating && <div className="film-rating">
                ⭐ {currentFilm.rating.toFixed(1)}
                </div>}
              </span>
            </div>
            {currentFilm.runtime && (
              <div className="meta-item">
                <strong>Runtime:</strong> {formatRuntime(currentFilm.runtime)}
              </div>
            )}
          </div>

          <button
            className={`wishlist-button ${currentFilm.category} ${
              inWishlist ? "active" : ""
            }`}
            onClick={handleWishlistToggle}
          >
            {inWishlist ? "❤️ Remove from Wishlist" : "🤍 Add to Wishlist"}
          </button>
        </div>
      </div>
      <div className="film-description">
        <h3>Description</h3>
        <p>{currentFilm.description}</p>

        {currentFilm.tagline && (
          <div className="film-tagline">"{currentFilm.tagline}"</div>
        )}
      </div>
    </div>
  );
};

export default FilmPage;
