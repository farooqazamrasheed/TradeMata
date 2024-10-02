import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import AWS from 'aws-sdk';
import nextConnect from 'next-connect';
import connectDb from "../../../middlewhare/mongoos"; // Adjust the path as needed
import Assignment from '../../../models/Assignment';
import EnrolledCourse from "../../../models/EnrolledCourse";
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

apiRoute.post(async (req, res) => {
  try {

    const {enroll_id } = req.query;
    const { chapter_id, chapter_name, assignment_name } = req.body;
   console.log( enroll_id ,chapter_id, chapter_name, assignment_name ,req.file);
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    if (!enroll_id) {
        return res.status(400).json({ error: 'No enroll_Id' });
      }
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${uuidv4()}-${req.file.originalname}`,
      Body: req.file.buffer,
      ACL: 'public-read',
    };

    const uploadedFile = await s3.upload(params).promise();
    console.log(uploadedFile)
    const newAssignment = new Assignment({
      chapter_id,
      chapter_name,
      assignment_name,
      file: uploadedFile.Location,
    });

    const savedAssignment = await newAssignment.save();
     // Update enrolledCourse with assignment _id
     const updatedEnrolledCourse = await EnrolledCourse.findByIdAndUpdate(
        enroll_id,
        { $push: { assignments: savedAssignment._id } },
        { new: true }
      );

    res.status(200).json(savedAssignment);
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
