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

apiRoute.put(async (req, res) => {
  try {
    const { courseId, chapterId } = req.query;
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
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Find the chapter by chapterId
    const chapter = course.chapters.id(chapterId);

    if (!chapter) {
      return res.status(404).json({ error: "Chapter not found" });
    }

    // Pop existing values
    chapter.videos.pop();
    chapter.summary.pop();
    chapter.assignments.pop();

    // Push updated values
    if (videoTitle && videoUrl) {
      chapter.videos.push({ title: videoTitle, video_url: videoUrl });
    }

    if (sTitle && summaryContent) {
      chapter.summary.push({ title: sTitle, content: summaryContent });
    }

    if (assignmentTitle && assignmentContent) {
      chapter.assignments.push({ title: assignmentTitle, content: assignmentContent });
    }

    // Update chapter details
    chapter.chapter_number = chapterNumber;
    chapter.title = chapterTitle;

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
