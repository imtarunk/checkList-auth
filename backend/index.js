const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require("cors"); // Import CORS
const { env } = "dotenv";
const { UserModule, TodoModule } = require("./db");
const Auth = require("./auth");

require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cors()); // Use CORS middleware

const jwt_secrete = process.env.jwt_secrete;
const PORT = process.env.port;

async function connectDB() {
  try {
    await mongoose.connect(process.env.uri);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit with failure
  }
}

module.exports = connectDB;
connectDB();

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(email, password, name);

  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Entre your email and password",
      });
    }

    await UserModule.create({
      name,
      email,
      password,
    });

    res.status(200).json({
      success: true,
      message: "user register successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.json({
        message: "Entre you register email and password",
      });
    }

    const user = await UserModule.findOne({
      email: email,
      password: password,
    });
    if (user) {
      const token = jwt.sign(
        {
          id: user._id.toString(),
        },
        jwt_secrete
      );
      res.status(200).json({
        success: true,
        message: "Logged in successfully",
        token,
      });
    } else {
      res.status(403).json({
        message: "invalid credentials",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/todo", Auth, async (req, res) => {
  const userId = req.usedId;
  const todo = req.body;

  if (!todo) {
    console.log("todo required");
  }

  const newTodo = await TodoModule.create({
    todo: todo.todo, // Accessing the todo description
    userId: userId,
    status: false, // Optionally set the default status
    date: new Date(), // Optionally add a date field
  });
  console.log(newTodo);
  return res.status(201).json({
    success: true,
    message: "Todo created successfully",
    todo: newTodo,
  });
});

app.get("/todos", Auth, async (req, res) => {
  const userid = req.usedId;

  const todoOfLoggedUser = await TodoModule.find({ userId: userid });

  if (todoOfLoggedUser.length === 0) {
    return res.status(404).json({
      message: "No todos found for this user",
    });
  }

  return res.status(200).json({
    message: "todo fetching successfully",
    success: true,
    todos: todoOfLoggedUser,
  });
});

app.listen(PORT, () => console.log("server connected"));
