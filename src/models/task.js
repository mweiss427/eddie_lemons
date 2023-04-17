const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  startDate: Date,
  dueDate: Date,
  status: String,
});

module.exports = mongoose.model('Task', TaskSchema);
