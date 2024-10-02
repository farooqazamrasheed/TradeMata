import mongoose from 'mongoose';

// Define the Video schema
const VideoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  video_url: { type: String, required: true },
});

// Define the Assignment schema without due_date
const AssignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content:{ type: String, required: true },
});

const SummarySchema = new mongoose.Schema({
  title: { type: String, required: true },
  content:{ type: String, required: true },
});
// Define the Chapter schema
const ChapterSchema = new mongoose.Schema({
  chapter_number: { type: Number, required: true },
  title: { type: String, required: true },
  videos: [VideoSchema],
  summary: [SummarySchema],
  assignments: [AssignmentSchema],
});

// Define the Course schema
const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  feature_img: { type: String, required: true },
  description: { type: String, required: true },
  chapters: [ChapterSchema],
},
{ timestamps: true });

// Create and export the Course model
export default mongoose.models.Course || mongoose.model('Course', CourseSchema);
