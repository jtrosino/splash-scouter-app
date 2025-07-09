
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import ResetPassword from "./components/auth/ResetPassword";
import { AuthProvider, useAuth } from "./hooks/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "./utils/firebase";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
}

function MainApp() {
  const { user } = useAuth();

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Welcome!</h1>
      <p className="mb-4">Logged in as: <strong>{user?.email}</strong></p>
      <button onClick={handleLogout} className="btn">Logout</button>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <nav className="p-4 border-b mb-4 flex gap-4">
          <Link to="/login" className="text-blue-500">Login</Link>
          <Link to="/signup" className="text-blue-500">Signup</Link>
          <Link to="/reset" className="text-blue-500">Reset Password</Link>
        </nav>
        <Routes>
          <Route path="/" element={<ProtectedRoute><MainApp /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset" element={<ResetPassword />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
