import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

export default function Navbar() {
  const cartItems = useSelector(state => state.cart.items);
  const wishlistItems = useSelector(state => state.wishlist.items);
  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalQty = cartItems.reduce((s, i) => s + i.qty, 0);

  return (
    <nav className="navbar navbar-expand-lg flipkart-nav px-4">
      {/* LOGO + BRAND */}
      <Link
        className="navbar-brand text-white fw-bold d-flex align-items-center gap-2"
        to="/"
      >
        <span className="logo-box">BS</span>
        <span className="brand-text">BuntyShop</span>
        <span className="brand-badge">NEW</span>
      </Link>

      <div className="ms-auto d-flex align-items-center gap-3">
        {isAuth && (
          <>
            {/* WISHLIST */}
            <Link to="/wishlist" className="nav-link text-white nav-anim">
              ❤️ Wishlist
              {wishlistItems.length > 0 && (
                <span className="badge-count">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* CART */}
            <Link to="/cart" className="nav-link text-white nav-anim">
              🛒 Cart
              {totalQty > 0 && (
                <span className="badge-count">
                  {totalQty}
                </span>
              )}
            </Link>

            <Link to="/orders" className="nav-link text-white nav-anim">
              Orders
            </Link>

            <Link to="/profile" className="nav-link text-white nav-anim">
              Profile
            </Link>

            <Link to="/address" className="nav-link text-white nav-anim">
              Address
            </Link>

            {user?.isAdmin && (
              <Link
                to="/admin"
                className="nav-link text-warning fw-bold nav-anim"
              >
                Admin
              </Link>
            )}
          </>
        )}

        {!isAuth ? (
          <>
            <Link className="btn btn-light btn-sm fw-bold" to="/login">
              Login
            </Link>
            <Link className="btn btn-warning btn-sm fw-bold" to="/signup">
              Signup
            </Link>
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
    </nav>
  );
}