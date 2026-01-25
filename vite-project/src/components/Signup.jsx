import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="container mt-5 fade-in">
      <div className="card p-4">
        <h3>Signup</h3>
        <input className="form-control mb-2" placeholder="Name"
          value={name} onChange={e => setName(e.target.value)} />
        <input className="form-control mb-2" placeholder="Email"
          value={email} onChange={e => setEmail(e.target.value)} />
        <input className="form-control mb-2" type="password" placeholder="Password"
          value={password} onChange={e => setPassword(e.target.value)} />
        <button className="btn btn-success"
          onClick={() => { dispatch(signup({ name, email, password })); navigate("/login"); }}>
          Create Account
        </button>
      </div>
    </div>
  );
}