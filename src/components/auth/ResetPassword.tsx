
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { Link } from "react-router-dom";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent.");
    } catch (error) {
      console.error(error);
      setMessage("Failed to send reset email.");
    }
  };

  return (
    <form onSubmit={handleReset} className="p-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Reset Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="input mb-2"
      />
      <button type="submit" className="btn mb-2">Send Reset Email</button>
      {message && <p>{message}</p>}
      <div className="mt-4">
        <Link to="/login" className="text-blue-500">Back to Login</Link>
      </div>
    </form>
  );
}
