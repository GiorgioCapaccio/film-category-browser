import React from "react";
import { useWishlistStore } from "../../store/wishlistStore";
import "./FilmCard.scss";
import type { Film } from "../../types";

interface FilmCardProps {
  film: Film;
  onClick: () => void;
}

const FilmCard: React.FC<FilmCardProps> = ({ film, onClick }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(film.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(film.id);
    } else {
      addToWishlist(film);
    }
  };


  return (
    <div className={`film-card ${film.category}`} onClick={onClick}>
      <div className="film-card__image">
        <img
          src={film.image}
          alt={film.title}
          loading="lazy"
        />
        <button
          className={`wishlist-btn ${inWishlist ? "active" : ""}`}
          onClick={handleWishlistClick}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          ♥
        </button>
        {film.rating && <div className="rating">{film.rating.toFixed(1)}</div>}
      </div>
      <div className="film-card__info">
        <h3 title={film.title}>{film.title}</h3>
        <div className="meta">
          <span>{film.year}</span>
          <span className="category">{film.category}</span>
        </div>
      </div>
    </div>
  );
};

export default FilmCard;
