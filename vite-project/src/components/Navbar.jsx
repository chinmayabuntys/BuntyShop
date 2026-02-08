import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { useState } from "react";

export default function Navbar() {
  const cartItems = useSelector(state => state.cart.items);
  const wishlistItems = useSelector(state => state.wishlist.items);
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const totalQty = cartItems.reduce((s, i) => s + i.qty, 0);

  return (
    <nav className="navbar flipkart-nav px-4 position-relative">
      {/* LOGO */}
      <Link
        className="navbar-brand text-white fw-bold d-flex align-items-center gap-2"
        to="/"
        onClick={() => setMenuOpen(false)}
      >
        <span className="logo-box">BS</span>
        <span className="brand-text">BuntyShop</span>
        <span className="brand-badge">NEW</span>
      </Link>

      {/* HAMBURGER */}
      <button
        className="hamburger d-lg-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className={menuOpen ? "open" : ""}></span>
        <span className={menuOpen ? "open" : ""}></span>
        <span className={menuOpen ? "open" : ""}></span>
      </button>

      {/* DESKTOP MENU */}
      <div className="ms-auto d-none d-lg-flex align-items-center gap-3">
        {isAuth && (
          <>
            <Link to="/wishlist" className="nav-link text-white nav-anim">
              ❤️ Wishlist
              {wishlistItems.length > 0 && (
                <span className="badge-count">{wishlistItems.length}</span>
              )}
            </Link>

            <Link to="/cart" className="nav-link text-white nav-anim">
              🛒 Cart
              {totalQty > 0 && (
                <span className="badge-count">{totalQty}</span>
              )}
            </Link>

            <Link to="/orders" className="nav-link text-white nav-anim">Orders</Link>
            <Link to="/profile" className="nav-link text-white nav-anim">Profile</Link>
            <Link to="/address" className="nav-link text-white nav-anim">Address</Link>

            {user?.isAdmin && (
              <Link to="/admin" className="nav-link text-warning fw-bold">
                Admin
              </Link>
            )}
          </>
        )}

        {!isAuth ? (
          <>
            <Link className="btn btn-light btn-sm fw-bold" to="/login">Login</Link>
            <Link className="btn btn-warning btn-sm fw-bold" to="/signup">Signup</Link>
          </>
        ) : (
          <button
            className="btn btn-outline-light btn-sm fw-bold"
            onClick={() => {
              dispatch(logout());
              navigate("/login");
            }}
          >
            Logout
          </button>
        )}
      </div>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? "show" : ""}`}>
        {isAuth && (
          <>
            <Link to="/wishlist" onClick={() => setMenuOpen(false)}>❤️ Wishlist</Link>
            <Link to="/cart" onClick={() => setMenuOpen(false)}>🛒 Cart</Link>
            <Link to="/orders" onClick={() => setMenuOpen(false)}>Orders</Link>
            <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
            <Link to="/address" onClick={() => setMenuOpen(false)}>Address</Link>

            {user?.isAdmin && (
              <Link to="/admin" className="text-warning fw-bold" onClick={() => setMenuOpen(false)}>
                Admin
              </Link>
            )}
          </>
        )}

        {!isAuth ? (
          <>
            <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link to="/signup" onClick={() => setMenuOpen(false)}>Signup</Link>
          </>
        ) : (
          <button
            className="btn btn-outline-light btn-sm mt-2"
            onClick={() => {
              dispatch(logout());
              setMenuOpen(false);
              navigate("/login");
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
