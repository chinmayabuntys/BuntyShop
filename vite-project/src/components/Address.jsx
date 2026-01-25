// src/components/Address.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  deleteAddress,
  setDefaultAddress,
} from "../store/authSlice";

export default function Address() {
  const [address, setAddress] = useState("");
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  return (
    <div className="container mt-4 fade-in">
      <h3>My Addresses</h3>

      <input
        className="form-control mb-2"
        placeholder="Enter new address"
        value={address}
        onChange={e => setAddress(e.target.value)}
      />

      <button
        className="btn btn-primary mb-3"
        onClick={() => {
          if (!address.trim()) return alert("Enter address");
          dispatch(addAddress(address));
          setAddress("");
        }}
      >
        Add Address
      </button>

      {user.addresses.length === 0 && (
        <p className="text-muted">No saved addresses</p>
      )}

      {user.addresses.map((a, i) => (
        <div key={i} className="card p-2 mb-2 shadow-sm d-flex flex-row justify-content-between align-items-center">
          <div>
            <span>{a}</span>
            {user.defaultAddress === i && (
              <span className="badge bg-success ms-2">Default</span>
            )}
          </div>

          <div>
            <button
              className="btn btn-sm btn-outline-success me-2"
              onClick={() => dispatch(setDefaultAddress(i))}
            >
              Set Default
            </button>

            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => dispatch(deleteAddress(i))}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}