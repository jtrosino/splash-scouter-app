
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      alert("Signup failed");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSignup} className="p-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="input mb-2" />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="input mb-2" />
      <button type="submit" className="btn">Sign Up</button>
      <p className="mt-4">Already have an account? <Link to="/login" className="text-blue-500">Log in</Link></p>
    </form>
  );
}
