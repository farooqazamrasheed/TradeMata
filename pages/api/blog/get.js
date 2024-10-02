
import nextConnect from 'next-connect';

import connectDb from "../../../middlewhare/mongoos";// Adjust the path as needed
import BlogPost from '../../../models/BlogPost';

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});


// Get a single blog post by ID
apiRoute.get(async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: 'Blog post ID is required' });
    }
    const blogPost = await BlogPost.findById(id);
    if (!blogPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    res.status(200).json(blogPost);
  } catch (error) {
    res.status(500).json({ error: `Sorry something happened! ${error.message}` });
  }
});


export default connectDb(apiRoute);

