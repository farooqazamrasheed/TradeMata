import nextConnect from 'next-connect';
import connectDb from "../../../middlewhare/mongoos"; // Adjust the path as needed
import Assignment from '../../../models/Assignment';

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.get(async (req, res) => {
  try {
    const { assignmentId } = req.query; // Assuming assignment ID is passed in the query string

    // Validate assignment ID (optional)
    if (!assignmentId) {
      return res.status(400).json({ error: 'Missing assignment ID' });
    }

    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    res.status(200).json(assignment);
  } catch (error) {
    res.status(500).json({ error: `Sorry something happened! ${error.message}` });
  }
});

export default connectDb(apiRoute);
