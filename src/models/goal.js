const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  summary: { type: String, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, required: true },
  importance: { type: String },
  progress: { type: String },
});

const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;
