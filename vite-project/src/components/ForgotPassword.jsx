import { useState } from "react";
import { useDispatch } from "react-redux";
import { forgotPassword, resetPassword } from "../store/authSlice";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();

  const handleSendCode = () => {
    dispatch(forgotPassword({ email }));
    setStep(2);
  };

  const handleReset = () => {
    dispatch(resetPassword({ email, code, newPassword }));
  };

  return (
    <div className="container mt-5 fade-in" style={{ maxWidth: "400px" }}>
      <div className="card p-4 shadow-lg">
        <h3 className="text-center">Forgot Password</h3>

        {step === 1 && (
          <>
            <input className="form-control mb-2" placeholder="Email"
              value={email} onChange={e => setEmail(e.target.value)} />
            <button className="btn btn-primary w-100" onClick={handleSendCode}>
              Send Reset Code
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input className="form-control mb-2" placeholder="Reset Code"
              value={code} onChange={e => setCode(e.target.value)} />
            <input type="password" className="form-control mb-2" placeholder="New Password"
              value={newPassword} onChange={e => setNewPassword(e.target.value)} />
            <button className="btn btn-success w-100" onClick={handleReset}>
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
}