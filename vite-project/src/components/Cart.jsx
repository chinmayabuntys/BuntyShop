// src/components/Cart.jsx
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  clearCart,
  applyCoupon,
  increaseQty,
  decreaseQty,
} from "../store/cartSlice";
import { placeOrder } from "../store/orderSlice";
import { addToWishlist } from "../store/wishlistSlice";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Cart() {
  const items = useSelector(state => state.cart.items);
  const discount = useSelector(state => state.cart.discount);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const [coupon, setCoupon] = useState("");
  const [paymentMode, setPaymentMode] = useState("COD");

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const total = subtotal - subtotal * discount;

  const defaultAddress =
    user.addresses[user.defaultAddress] || null;

  const handleCheckout = () => {
    // 🚫 BLOCK IF NO ITEMS
    if (items.length === 0) {
      alert("Your cart is empty. Add products before placing an order.");
      return;
    }

    // 🚫 BLOCK IF NO ADDRESS
    if (!defaultAddress) {
      alert("Add & set a default address first");
      return;
    }

    alert("Payment Successful (Mock)");

    dispatch(
      placeOrder({
        id: Date.now(),
        user: user.email,
        items,
        total,
        address: defaultAddress,
        paymentMode,
        status: paymentMode === "COD" ? "Pending" : "Paid",
        timeline: ["Order Placed"],
      })
    );

    dispatch(clearCart());
  };

  return (
    <div className="container mt-4 fade-in">
      <h3>Your Cart</h3>

      {/* ADDRESS */}
      <div className="card p-3 mb-3 shadow-sm">
        <h5>Delivery Address</h5>
        {defaultAddress ? (
          <p>{defaultAddress}</p>
        ) : (
          <p className="text-danger">No default address set</p>
        )}
      </div>

      {/* CART EMPTY */}
      {items.length === 0 && (
        <p className="text-muted">Your cart is empty</p>
      )}

      {/* CART ITEMS */}
      {items.map(i => (
        <div
          key={i.id}
          className="d-flex align-items-center justify-content-between mb-2 border rounded p-2"
        >
          <div className="d-flex align-items-center">
            <img
              src={i.thumbnail}
              alt={i.title}
              style={{ width: 60, height: 60, objectFit: "contain" }}
              className="me-2"
            />

            {/* CLICK → GO TO DETAILS */}
            <Link
              to={`/product/${i.id}`}
              className="text-decoration-none text-dark fw-semibold"
            >
              {i.title}
            </Link>
          </div>

          {/* QTY CONTROLS */}
          <div className="d-flex align-items-center">
            <button
              className="btn btn-outline-secondary btn-sm me-1"
              onClick={() => dispatch(decreaseQty(i.id))}
            >
              −
            </button>

            <span className="fw-bold">{i.qty}</span>

            <button
              className="btn btn-outline-secondary btn-sm ms-1"
              onClick={() => dispatch(increaseQty(i.id))}
            >
              +
            </button>
          </div>

          {/* PRICE + ACTIONS */}
          <div className="text-end">
            <div className="fw-bold">
              ${(i.price * i.qty).toFixed(2)}
            </div>

            <button
              className="btn btn-sm btn-outline-danger me-1 mt-1"
              onClick={() => dispatch(removeFromCart(i.id))}
            >
              Remove
            </button>

            <button
              className="btn btn-sm btn-outline-warning mt-1"
              onClick={() => {
                dispatch(addToWishlist(i));
                dispatch(removeFromCart(i.id));
              }}
            >
              Move to Wishlist
            </button>
          </div>
        </div>
      ))}

      {/* COUPON */}
      <input
        className="form-control mb-2"
        placeholder="Coupon"
        value={coupon}
        onChange={e => setCoupon(e.target.value)}
      />

      <button
        className="btn btn-outline-primary mb-3"
        onClick={() => dispatch(applyCoupon(coupon))}
      >
        Apply Coupon
      </button>

      {/* PAYMENT METHOD */}
      <div className="card p-3 mb-3 shadow-sm">
        <h5>Payment Method</h5>

        {["COD", "UPI", "CARD"].map(mode => (
          <div className="form-check" key={mode}>
            <input
              className="form-check-input"
              type="radio"
              name="payment"
              checked={paymentMode === mode}
              onChange={() => setPaymentMode(mode)}
            />
            <label className="form-check-label">{mode}</label>
          </div>
        ))}
      </div>

      {/* SUMMARY */}
      <h5>Subtotal: ${subtotal.toFixed(2)}</h5>
      <h5>Discount: {(discount * 100).toFixed(0)}%</h5>
      <h4>Total: ${total.toFixed(2)}</h4>

      {/* PAY BUTTON */}
      <button
        className="btn btn-success w-100"
        onClick={handleCheckout}
        disabled={items.length === 0}
      >
        {items.length === 0
          ? "Cart is Empty"
          : `Pay ₹${(total * 80).toFixed(0)} (${paymentMode})`}
      </button>
    </div>
  );
}