import Course from "../../../models/Course";
import nextConnect from "next-connect";
import connectDb from "../../../middlewhare/mongoos";

const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.get(async (req, res) => {
    try {
      const { courseId, chapterId } = req.query;
  
      // Find the course by ID
      const course = await Course.findById(courseId);
  
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }
  
      // Find the chapter by chapterId
      const chapter = course.chapters.id(chapterId);
  
  
      if (!chapter) {
        return res.status  (404).json({ error: "Chapter not found" });
      }
  
      res.status(200).json(chapter);
    } catch (error) {
      res
        .status(500)
        .json({ error: `Sorry something happened! ${error.message}` });
    }
  });

export default connectDb(apiRoute);
