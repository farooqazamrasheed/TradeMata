// Import necessary dependencies
import Course from '../../../models/Course';
import connectDb from "../../../middlewhare/mongoos";
import nextConnect from 'next-connect';

// Create a new Next.js API route
const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

// Define the API route for getting course data
apiRoute.get(async (req, res) => {
  try {
    // Fetch all courses from the database
    const courses = await Course.find().select('_id feature_img title');

    // Return the fetched courses as a JSON response
    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ error: `Sorry something happened! ${error.message}` });
  }
});

// Connect the route to the database
export default connectDb(apiRoute);

