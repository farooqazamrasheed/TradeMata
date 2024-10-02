import Course from '../../../models/Course';
import nextConnect from 'next-connect';
import AWS from 'aws-sdk';
import connectDb from '../../../middlewhare/mongoos';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.delete(async (req, res) => {
  try {
    const { courseId } = req.query;

    // Find the course by ID
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Log the course details for debugging
    console.log('Deleting Course:', course);

    // Remove the course from the database
    const deleteResult = await Course.deleteOne({ _id: courseId });

    // Log the result of the delete operation
    console.log('Delete Result:', deleteResult);

    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Delete Error:', error);
    res.status(500).json({ error: `Sorry something happened! ${error.message}` });
  }
});

export default connectDb(apiRoute);
