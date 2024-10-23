const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require("cors"); // Import CORS

const { UserModule, TodoModule } = require("./db");

const app = express();
app.use(express.json());
const jwt_secrete = "tarunkisha";
app.use(cors()); // Use CORS middleware

async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://sainitarunk:rb6IBbFZkddWStmO@checklist.1wc4b.mongodb.net/checklist-v1"
    );
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

    const user = UserModule.findOne({
      email: email,
      password: password,
    });

    if (user) {
      const token = jwt.sign(
        {
          token: user._id,
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

app.listen(3000, () => console.log("server connected"));
