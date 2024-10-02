
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import AWS from 'aws-sdk';
import nextConnect from 'next-connect';

import connectDb from "../../../middlewhare/mongoos"; // Adjust the path as needed
import BlogPost from '../../../models/BlogPost';

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

apiRoute.use(upload.single('image')); // Use upload.single for a single file upload

apiRoute.put(async (req, res) => {
  try {
    const { id } = req.query;
    const { title, description,content, imageURL } = req.body;
    console.log("Received request:", id, title, description,content, req.file, req.files);

    if (!id) {
      return res.status(400).json({ error: 'Blog post ID is required' });
    }

    let updatedData = {
      title,
      description,
      content,
      imageURL,
    };

    if (req.file) {
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${uuidv4()}-${req.file.originalname}`,
        Body: req.file.buffer,
        ACL: 'public-read',
      };

      const uploadedFile = await s3.upload(params).promise();
      updatedData.imageURL = uploadedFile.Location;

      // Delete old image if a new one is uploaded
      if (imageURL) {
        const oldKey = imageURL.split('/').pop();
        await s3.deleteObject({ Bucket: process.env.AWS_BUCKET_NAME, Key: oldKey }).promise();
      }
    }

    const updatedBlogPost = await BlogPost.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedBlogPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.status(200).json(updatedBlogPost);
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
