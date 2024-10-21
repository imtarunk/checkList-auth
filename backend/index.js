const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
const port = 3000;

const jwt_key = "hwlloworld";
const saltRounds = 5; // salting hash password

const users = []; // To store users temporarily

// Signup Route
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  // Check if the user already exists
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  // Hash the password
  const hash = bcrypt.hashSync(password, saltRounds);
  console.log(hash);

  // Store the user (temporary in-memory storage)
  users.push({
    name: name,
    email: email,
    password: hash,
  });

  console.log(users);

  // Send response after user is successfully created
  return res.status(201).json({
    success: true,
    message: `User signed up successfully with email: ${email}`,
    users, // Optional, but you can remove this in production
  });
});

// Login Route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  // Find the user by email
  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // Compare the hashed password with the entered password
  bcrypt.compare(password, user.password, (err, result) => {
    if (err || !result) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate JWT token
    const token = jwt.sign({ email: user.email, name: user.name }, jwt_key, {
      expiresIn: "1h", // Set token expiry
    });

    // Send the token as response
    return res.status(200).json({
      success: true,
      message: `Login successful as ${user.name}`,
      token,
    });
  });
});

// To Verify JWT (middleware example)
const verifyToken = (req, res, next) => {
  const token = req.headers.token; // Access directly from headers

  if (!token) {
    return res.status(403).json({
      success: false,
      message: "Access denied. No token provided.",
    });
  }

  try {
    const verified = jwt.verify(token, jwt_key);
    req.user = verified;
    next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Invalid token.",
    });
  }
};

// Example route that requires authentication
app.get("/todos", verifyToken, (req, res) => {
  res.status(200).json({
    success: true,
    message: "This is a protected route.",
    user: req.user,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
