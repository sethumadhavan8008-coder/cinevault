import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Signup() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSignup = async (e) => {

    e.preventDefault();

    setError("");


    // -------------------------
    // Empty field validation
    // -------------------------

    if (!email || !password || !confirmPassword) {

      setError("Please fill in all fields.");

      return;
    }


    // -------------------------
    // Email validation
    // -------------------------

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

      setError("Please enter a valid email address.");

      return;
    }


    // -------------------------
    // Password validation
    // -------------------------

    if (password.length < 8) {

      setError(
        "Password must contain at least 8 characters."
      );

      return;
    }


    // -------------------------
    // Confirm password
    // -------------------------

    if (password !== confirmPassword) {

      setError("Passwords do not match.");

      return;
    }


    // -------------------------
    // Send signup request
    // -------------------------

    try {

      setLoading(true);


      const response = await axios.post(
        "http://localhost:5000/api/signup",
        {
          email: email,
          password: password,
        }
      );


      // -------------------------
      // Signup successful
      // -------------------------

      if (response.data.success) {

        alert("Account created successfully!");

        // Clear fields
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        // Go back to Sign In
        navigate("/");
      }

    } catch (error) {

      setError(
        error.response?.data?.message ||
          "Signup failed. Please try again."
      );

    } finally {

      setLoading(false);

    }
  };


  return (

    <div className="login-page">

      {/* Background overlay */}
      <div className="background-overlay"></div>


      {/* Header */}
      <header className="header">

        <div className="logo">
          CINEVAULT
        </div>

      </header>


      {/* Signup section */}
      <main className="login-container">

        <div className="login-card">

          <h1>
            Create Account
          </h1>


          <p className="signup-heading">
            Join CineVault today.
          </p>


          <form onSubmit={handleSignup}>

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />


            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />


            {/* Confirm password */}
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError("");
              }}
            />


            {/* Error message */}
            {error && (

              <p className="error">
                {error}
              </p>

            )}


            {/* Signup button */}
            <button
              type="submit"
              disabled={loading}
            >

              {loading
                ? "Creating account..."
                : "Sign Up"}

            </button>

          </form>


          {/* Back to login */}
          <p className="signup">

            Already have an account?{" "}

            <span
              onClick={() => navigate("/")}
            >
              Sign in now.
            </span>

          </p>


          {/* Security message */}
          <p className="captcha">
            This page is protected to ensure your
            security.
          </p>

        </div>

      </main>

    </div>

  );
}

export default Signup;