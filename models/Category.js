// models/Category.js
import mongoose from 'mongoose';

const SubcategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String }
});

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  subcategories: [SubcategorySchema],
}, { timestamps: true });

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);
