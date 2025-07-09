
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      alert("Login failed");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleLogin} className="p-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Log In</h2>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="input mb-2" />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="input mb-2" />
      <button type="submit" className="btn">Log In</button>
      <p className="mt-4">Forgot password? <Link to="/reset" className="text-blue-500">Reset</Link></p>
      <p className="mt-2">Don't have an account? <Link to="/signup" className="text-blue-500">Sign up</Link></p>
    </form>
  );
}
