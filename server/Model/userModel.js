const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  course: {
    type: String,
    enum: [
      "Frontend Development",
      "Backend Development",
      "Cyber Security",
      "Product Design",
      "Machine learning",
      "Data Analysis",
    ],
  },
  reason: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
