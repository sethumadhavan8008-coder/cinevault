import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    // Empty field validation
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Password validation
    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "https://cinevault-6qcn.onrender.com/api/login",
        {
          email: email,
          password: password,
        }
      );

      if (response.data.success) {
        navigate("/dashboard");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="background-overlay"></div>

      <header className="header">
        <div className="logo">
          CINEVAULT
        </div>
      </header>

      <main className="login-container">
        <div className="login-card">

          <h1>Sign In</h1>

          <form onSubmit={handleLogin}>

            <input
              type="email"
              placeholder="Email or phone number"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />

            {error && (
              <p className="error">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

          </form>

          <div className="divider">
            <span>OR</span>
          </div>

          <button className="code-button">
            Use a sign-in code
          </button>

          <div className="options">

            <label>
              <input type="checkbox" />
              Remember me
            </label>

            <a href="#">
              Forgot password?
            </a>

          </div>

          <p className="signup">
            New to CineVault?{" "}
            <Link to="/signup">
              Sign up now.
            </Link>
          </p>

          <p className="captcha">
            This page is protected to ensure your
            security.
          </p>

        </div>
      </main>
    </div>
  );
}

export default App;