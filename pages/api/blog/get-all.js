
import nextConnect from 'next-connect';

import connectDb from "../../../middlewhare/mongoos"; // Adjust the path as needed
import BlogPost from '../../../models/BlogPost';

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

// Get all blog posts
apiRoute.get(async (req, res) => {
  try {
    const blogPosts = await BlogPost.find().select('_id imageURL title createdAt');
    res.status(200).json(blogPosts);
  } catch (error) {
    res.status(500).json({ error: `Sorry something happened! ${error.message}` });
  }
});


export default connectDb(apiRoute);
