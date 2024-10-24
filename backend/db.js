const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// User Schema
const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
});

// Todo Schema
const todoSchema = new Schema({
  todo: { type: String, required: true },
  status: { type: Boolean, default: false }, // Default value for status
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User ",
    required: true,
  }, // Reference to User model
});

// Define Mongoose Models (correct method is mongoose.model)
const UserModule = mongoose.model("User", userSchema);
const TodoModule = mongoose.model("Todo", todoSchema);

// Correct module export
module.exports = {
  UserModule,
  TodoModule,
};
