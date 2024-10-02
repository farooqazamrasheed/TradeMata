import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
  members: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    default: []
  },
  messages: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message'}],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastMessageAt: {
    type: Date,
    default: Date.now
  },
  isCommunityChat: {
    type: Boolean,
    default: false
  },
  
  name: { type: String, required: false},
});

const Chat = mongoose.models.Chat || mongoose.model('Chat', ChatSchema);

export default Chat;
