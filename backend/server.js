const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Mock users
const users = [
  {
    email: "user@example.com",
    password: "12345678",
  },
];

// =========================
// SIGNUP API
// =========================

app.post("/api/signup", (req, res) => {
  const { email, password } = req.body;

  // Check if user already exists
  const existingUser = users.find(
    (user) => user.email === email
  );

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "An account with this email already exists.",
    });
  }

  // Add new user
  users.push({
    email,
    password,
  });

  console.log("New user registered:", email);

  res.json({
    success: true,
    message: "Account created successfully.",
  });
});

// =========================
// LOGIN API
// =========================

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  console.log("Login attempt:", email);

  const user = users.find(
    (user) =>
      user.email === email &&
      user.password === password
  );

  if (user) {
    return res.json({
      success: true,
      message: "Login successful",
    });
  }

  res.status(401).json({
    success: false,
    message: "Invalid email or password.",
  });
});

// =========================
// START SERVER
// =========================

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});