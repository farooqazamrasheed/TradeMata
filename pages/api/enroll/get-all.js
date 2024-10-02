import EnrolledCourse from "../../../models/EnrolledCourse";
import Assignment from "../../../models/Assignment";
import User from "../../../models/User";
import nextConnect from "next-connect";
import connectDb from "../../../middlewhare/mongoos";
import Course from "../../../models/Course";

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
    // Populate user_id and course_id
    const enrolledCourses = await EnrolledCourse.find()
      .populate({
        path: 'user_id',
        model: User,
        select: 'name email photoUrl',
      })
      .populate({
        path: 'course_id',
        model: Course,
        select: '_id title feature_img chapters.title',
      })
      .populate({
        path: 'assignments',
        model: Assignment,
      });

    if (!enrolledCourses || enrolledCourses.length === 0) {
      return res.status(200).json({ message: 'No enrolled courses found.' });
    }

    res.status(200).json(enrolledCourses);
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    res.status(500).json({ error: `Sorry, something went wrong: ${error.message}` });
  }
});

export default connectDb(apiRoute);
