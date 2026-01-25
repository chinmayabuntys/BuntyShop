// src/components/ProductDetails.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { addToWishlist } from "../store/wishlistSlice";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(state => state.cart.items);
  const isInCart = cartItems.some(i => i.id === Number(id));

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(setProduct);
  }, [id]);

  if (!product) return <h4 className="text-center mt-5">Loading...</h4>;

  return (
    <div className="container mt-4 fade-in">
      <div className="row">
        <div className="col-md-5">
          <img
            src={product.thumbnail}
            className="img-fluid p-3 shadow"
          />
        </div>

        <div className="col-md-7">
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <h4>${product.price}</h4>
          <p>⭐ {product.rating}</p>

          {isInCart ? (
            <button
              className="btn btn-success me-2"
              onClick={() => navigate("/cart")}
            >
              Go to Cart
            </button>
          ) : (
            <button
              className="btn btn-primary me-2"
              onClick={() => dispatch(addToCart(product))}
            >
              Add to Cart
            </button>
          )}

          <button
            className="btn btn-danger"
            onClick={() => dispatch(addToWishlist(product))}
          >
            Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}