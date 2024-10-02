import nextConnect from "next-connect";

import connectDb from "../../../middlewhare/mongoos"; // Adjust the path as needed
import BlogPost from "../../../models/BlogPost";


const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry, something happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.get(async (req, res) => {
  try {
    const { search } = req.query;

    // Construct a MongoDB query object for searching by title or other fields
    const query = {
      $or: [
        { title: { $regex: new RegExp(search, "i") } }, // Case-insensitive search by title
        // You can add more fields for search if needed
      ],
    };

    // Query the database to fetch blog posts based on the search query
    const blogs = await BlogPost.find(query);

    res.status(200).json({ blogs });
  } catch (error) {
    res.status(500).json({ error: `Sorry, something happened! ${error.message}` });
  }
});

export default connectDb(apiRoute);

