import { useNavigate } from "react-router-dom";
import { useWishlistStore } from "../../store/wishlistStore";
import FilmCard from "../../components/FilmCard/FilmCard";
import type { Film } from "../../types";
import './WishlistPage.scss'

const WishlistPage: React.FC = () => {
  const navigate = useNavigate();

  const { items, clearWishlist } = useWishlistStore();

  const goHome = () => {
    navigate("/");
  };

  const handleFilmClick = (filmId: number) => {
    navigate(`/film/${filmId}`);
  };

  const handleClearWishlist = () => {
    // I could add some logic, for that reason i decided to use the reference to the function
    clearWishlist();
  };

  if (items.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="wishlist-header">
          <div>
            <h1>My Wishlist</h1>
          </div>
        </div>
        <div className="empty-wishlist">
          <div>
            <h2>Your wishlist is empty</h2>
            <p>Add films to your collection</p>
            <button onClick={goHome}>Browse Film</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <div>
          <h1>My Wishlist</h1>
          <p>{items.length} film added to your collection</p>
          <button className="clear-btn" onClick={handleClearWishlist}>Clear all</button>
        </div>
      </div>
      <div className="wishlist-grid">
          {items.map((film: Film) => (
            <FilmCard
              key={film.id}
              film={film}
              onClick={() => handleFilmClick(film.id)}
            />
          ))}
      </div>
    </div>
  );
};

export default WishlistPage;
