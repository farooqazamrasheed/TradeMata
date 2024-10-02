// models/BlogPost.js
import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
    title: { type: String, required: true,unique: true },
    description: { type: String, required: true },
    Tags: [{ type: String }],
    content: { type: String, required: true },
    imageURL: { type: String, required: true },
}, {
    timestamps: true, // This will automatically add createdAt and updatedAt fields
});

export default mongoose.models.BlogPost || mongoose.model('BlogPost', blogPostSchema);
