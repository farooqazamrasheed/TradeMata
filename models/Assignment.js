import mongoose from 'mongoose';

// Define the Assignment schema
const AssignmentSchema = new mongoose.Schema({
  chapter_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true }, // Chapter ID
  chapter_name: { type: String, required: true }, // Name of the chapter
  assignment_name: { type: String, required: true }, // Name of the assignment
  file: { type: String, required: true }, // File uploaded by the user
  marks: { type: Number, default: null } // Marks given for the assignment
},
{ timestamps: true });

// Create and export the Assignment model
export default mongoose.models.Assignment || mongoose.model('Assignment', AssignmentSchema);
