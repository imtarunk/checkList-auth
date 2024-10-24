const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require("cors"); // Import CORS
const { env } = "dotenv";
const { UserModule, TodoModule } = require("./db");
const Auth = require("./auth");
const bcrypt = require("bcrypt");
const z = require("zod");

require("dotenv").config();
const app = express();

const saltRounds = 10;
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
  const userSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email({ message: "Invalid email address" }), // Use email validation
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(100, { message: "Password cannot exceed 100 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[!@#$%^&*]/, {
        message: "Password must contain at least one special character",
      }),
  });

  const result = userSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json(result.error);
  }

  const { name, email, password } = result.data; // Ensure you destructure the parsed data

  try {
    // Hash the password
    const hash = await bcrypt.hash(password, saltRounds);

    // Create the user in the database
    await UserModule.create({
      name,
      email,
      password: hash,
    });

    res.status(200).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Enter your registered email and password" });
    }

    const user = await UserModule.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const token = jwt.sign({ id: user._id }, jwt_secrete, {
        expiresIn: "1h",
      });
      return res.status(200).json({
        success: true,
        message: "Logged in successfully",
        token,
      });
    } else {
      return res.status(403).json({
        message: "Invalid credentials",
        success: false,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
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
