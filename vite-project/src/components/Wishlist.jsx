// src/components/Wishlist.jsx
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../store/wishlistSlice";
import { addToCart } from "../store/cartSlice";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const items = useSelector(state => state.wishlist.items);
  const dispatch = useDispatch();

  return (
    <div className="container mt-4 fade-in">
      <h3>Wishlist</h3>

      {items.length === 0 && (
        <p className="text-muted">No items in wishlist</p>
      )}

      {items.map(p => (
        <div
          key={p.id}
          className="d-flex align-items-center justify-content-between mb-2 border rounded p-2"
        >
          <div className="d-flex align-items-center">
            <img
              src={p.thumbnail}
              alt={p.title}
              style={{ width: 60, height: 60, objectFit: "contain" }}
              className="me-2"
            />

            <Link
              to={`/product/${p.id}`}
              className="text-decoration-none text-dark fw-semibold"
            >
              {p.title}
            </Link>
          </div>

          <div>
            <button
              className="btn btn-sm btn-primary me-2"
              onClick={() => dispatch(addToCart(p))}
            >
              Add to Cart
            </button>

            <button
              className="btn btn-sm btn-danger"
              onClick={() => dispatch(removeFromWishlist(p.id))}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}