import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err: any) {
      switch (err.code) {
        case "auth/user-not-found":
          setError("No user found with this email.");
          break;
        case "auth/wrong-password":
          setError("Incorrect password.");
          break;
        case "auth/invalid-email":
          setError("The email address is invalid.");
          break;
        default:
          setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleLogin} className="p-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Log In</h2>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="input mb-2"
        required
      />

      <div className="relative mb-2">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="input pr-10 w-full"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(prev => !prev)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xl"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <button type="submit" className="btn">Log In</button>

      <p className="mt-4">
        Forgot password?{" "}
        <Link to="/reset" className="text-blue-500">Reset</Link>
      </p>
      <p className="mt-2">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-500">Sign up</Link>
      </p>
    </form>
  );
}
