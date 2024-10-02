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

apiRoute.post(async (req, res) => {
  try {
    const { id } = req.query;
    const {
      chapterNumber,
      chapterTitle,
      videoTitle,
      videoUrl,
      sTitle,
      summaryContent,
      assignmentTitle,
      assignmentContent,
    } = req.body;

    // Find the course by ID
    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Create a new chapter
    const newChapter = {
      chapter_number: chapterNumber,
      title: chapterTitle,
      videos: [],
      summary: [],
      assignments: [],
    };

    // Add video to the chapter if both title and URL are provided
    if (videoTitle && videoUrl) {
      newChapter.videos.push({ title: videoTitle, video_url: videoUrl });
    } else if (videoTitle || videoUrl) {
      // If one is missing, return an error
      return res.status(400).json({ error: "Both video title and URL are required." });
    }

    // Add summary to the chapter if both title and content are provided
    if (sTitle && summaryContent) {
      newChapter.summary.push({ title: sTitle, content: summaryContent });
    } else if (sTitle || summaryContent) {
      // If one is missing, return an error
      return res.status(400).json({ error: "Both summary title and content are required." });
    }

    // Add assignment to the chapter if both title and content are provided
    if (assignmentTitle && assignmentContent) {
      newChapter.assignments.push({ title: assignmentTitle, content: assignmentContent });
    } else if (assignmentTitle || assignmentContent) {
      // If one is missing, return an error
      return res.status(400).json({ error: "Both assignment title and content are required." });
    }

    // Add the new chapter to the course
    course.chapters.push(newChapter);

    // Save the updated course to the database
    const savedCourse = await course.save();

    res.status(200).json(savedCourse);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Sorry something happened! ${error.message}` });
  }
});

export default connectDb(apiRoute);
