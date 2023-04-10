const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now
  },
  messages: [
    {
      sender: String,
      content: String,
      timestamp: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
