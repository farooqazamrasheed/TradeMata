import EnrolledCourse from "../../../models/EnrolledCourse";
import Assignment from "../../../models/Assignment"; // Import Assignment model

import nextConnect from "next-connect";
import connectDb from "../../../middlewhare/mongoos";

const apiRoute = nextConnect({
  onError(error, req, res) {
    console.error("API Error:", error);
    res.status(501).json({ error: `Sorry, something went wrong: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.get(async (req, res) => {
  try {
    const { user_id } = req.query;

    // Validate user ID (optional)
    if (!user_id) {
      return res.status(400).json({ error: 'Missing user ID' });
    }

    // Populate assignments
    const enrolledCourses = await EnrolledCourse.find({ user_id })
      .populate({
        path: 'assignments', // Path to the field containing assignments (assuming it's called 'assignments')
        model: Assignment, // Model to populate with
      });

    if (!enrolledCourses || enrolledCourses.length === 0) {
      return res.status(200).json({ message: 'No enrolled courses found for this user.' });
    }

    res.status(200).json(enrolledCourses);
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    res.status(500).json({ error: `Sorry, something went wrong: ${error.message}` });
  }
});

export default connectDb(apiRoute);
