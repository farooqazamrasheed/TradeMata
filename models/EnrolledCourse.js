import mongoose from 'mongoose';

// Define the EnrolledCourse schema
const EnrolledCourseSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }], // Array of Assignment IDs
  progress: { type: Number, min: 0, max: 100, default: 0 } // Progress of the user in percentage
},
{ timestamps: true });

export default mongoose.models.EnrolledCourse || mongoose.model('EnrolledCourse', EnrolledCourseSchema);
