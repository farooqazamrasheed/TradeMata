// models/User.js
import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  photoUrl: { type: String, required: false},
  phone: { type: String },
  address: { type: String },
  role: { type: String, default: 'user' }, // 'user', 'admin', etc.
  permissions: [{ type: String }], // Array of permissions
  otp: {
    value: { type: String },
    expiresAt: { type: Date },
  },
  chats: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }],
    default: [],
  }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
