import React from "react";
import { useNavigate } from "react-router-dom";
import FilmCard from "../FilmCard/FilmCard";
import "./Carousel.scss";
import type { Film } from "../../types";

interface CarouselProps {
  title: string;
  films: Film[];
  category: "action" | "comedy" | "drama";
}

const Carousel: React.FC<CarouselProps> = ({ title, films, category }) => {
  const navigate = useNavigate();

  const handleFilmClick = (filmId: number) => {
    navigate(`/film/${filmId}`);
  };

  if (films.length === 0) {
    return (
      <section className="carousel">
        <h2 className={`carousel-title ${category}`}>{title}</h2>
        <div className="carousel-loading">Loading {category} films...</div>
      </section>
    );
  }

  return (
    <section className="carousel">
      <h2 className={`carousel-title ${category}`}>{title}</h2>
      <div className="carousel-container">
        {films.map((film) => (
          <FilmCard
            key={film.id}
            film={film}
            onClick={() => handleFilmClick(film.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default Carousel;
