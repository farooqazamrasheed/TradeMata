import Course from '../../../models/Course';
import nextConnect from 'next-connect';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import AWS from 'aws-sdk';
import connectDb from "../../../middlewhare/mongoos";
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const upload = multer();

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single('file')); // Use upload.single for a single file upload

apiRoute.put(async (req, res) => {
  try {
    const { courseId } = req.query;
    const { title, description } = req.body;

    // Find the course by ID
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Check if a new file is uploaded
    if (req.file) {
      // Delete the existing image from S3
      if (course.feature_img) {
        const keyToDelete = course.feature_img.split('/').pop();
        await s3.deleteObject({ Bucket: process.env.AWS_BUCKET_NAME, Key: keyToDelete }).promise();
      }

      // Upload the new file to S3
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${uuidv4()}-${req.file.originalname}`,
        Body: req.file.buffer,
        ACL: 'public-read',
      };

      const uploadedFile = await s3.upload(params).promise();
      course.feature_img = uploadedFile.Location;
    }

    // Update title and description
    course.title = title;
    course.description = description;

    // Save the updated course to the database
    const savedCourse = await course.save();

    res.status(200).json(savedCourse);
  } catch (error) {
    res.status(500).json({ error: `Sorry something happened! ${error.message}` });
  }
});

export default connectDb(apiRoute);

export const config = {
  api: {
    bodyParser: false,
  },
};
