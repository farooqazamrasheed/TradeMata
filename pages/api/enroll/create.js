
import EnrolledCourse from "../../../models/EnrolledCourse";

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

apiRoute.put(async (req, res) => {
  try {
    const { user_id, course_id } =  req.query;

    // Check if the user is already enrolled in the course
    const existingEnrollment = await EnrolledCourse.findOne({ user_id, course_id });
    if (existingEnrollment) {
      return res.status(400).json({ error: "User is already enrolled in this course." });
    }

    const newEnrollment = new EnrolledCourse({ user_id, course_id });
    const savedEnrollment = await newEnrollment.save();
    res.status(200).json(savedEnrollment);
  } catch (error) {
    console.error("Enrollment Error:", error);
    res.status(500).json({ error: `Sorry, something went wrong: ${error.message}` });
  }
});

export default connectDb(apiRoute);

