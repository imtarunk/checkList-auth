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
  task: String,
  status: Boolean,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
});

// Define Mongoose Models (correct method is mongoose.model)
const UserModule = mongoose.model("User", userSchema);
const TodoModule = mongoose.model("Todo", todoSchema);

// Correct module export
module.exports = {
  UserModule,
  TodoModule,
};
