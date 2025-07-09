import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";


export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err: any) {
      switch (err.code) {
        case "auth/email-already-in-use":
          setError("An account with this email already exists. You can log in instead.");
          break;
        case "auth/invalid-email":
          setError("The email address is not valid.");
          break;
        case "auth/weak-password":
          setError("Password should be at least 6 characters.");
          break;
        default:
          setError("Signup failed. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSignup} className="p-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>

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

      <button type="submit" className="btn">Sign Up</button>

      <p className="mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500">Log in</Link>
      </p>
    </form>
  );
}

