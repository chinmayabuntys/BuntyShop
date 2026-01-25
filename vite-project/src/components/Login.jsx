import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="container mt-5 fade-in">
      <div className="card p-4">
        <h3>Login</h3>
        <input className="form-control mb-2" placeholder="Email"
          value={email} onChange={e => setEmail(e.target.value)} />
        <input className="form-control mb-2" type="password" placeholder="Password"
          value={password} onChange={e => setPassword(e.target.value)} />
        <button className="btn btn-primary"
          onClick={() => { dispatch(login({ email, password })); navigate("/"); }}>
          Login
        </button>
      </div>
    </div>
  );
}