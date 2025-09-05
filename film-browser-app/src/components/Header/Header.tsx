import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.scss";
import { useWishlistStore } from "../../store/wishlistStore";

const Header: React.FC = () => {
  const location = useLocation();
  const { items } = useWishlistStore();

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>FilmList</h1>
        </Link>

        <nav className="nav">
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            Home
          </Link>
          <Link
            to="/wishlist"
            className={location.pathname === "/wishlist" ? "active" : ""}
          >
            Wishlist ({items.length})
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
