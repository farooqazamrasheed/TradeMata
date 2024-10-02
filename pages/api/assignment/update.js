import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import AWS from 'aws-sdk';
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
apiRoute.put(async (req, res) => {
    try {
      const { assignmentId } = req.query; // Assuming assignmentId is passed in the URL query params
      const { chapter_id, chapter_name, assignment_name, file, marks } = req.body;
  
      // Check if assignmentId is provided
      if (!assignmentId) {
        return res.status(400).json({ error: 'Assignment ID is required' });
      }
  
      // Find the assignment by ID
      let assignment = await Assignment.findById(assignmentId);
  
      // If assignment is not found, return error
      if (!assignment) {
        return res.status(404).json({ error: 'Assignment not found' });
      }
  
      // Update assignment details
      assignment.chapter_id = chapter_id;
      assignment.chapter_name = chapter_name;
      assignment.assignment_name = assignment_name;
      assignment.file = file;
      assignment.marks = marks;
  
      // Save the updated assignment
      assignment = await assignment.save();
  
      res.status(200).json(assignment);
    } catch (error) {
      res.status(500).json({ error: `Sorry something happened! ${error.message}` });
    }
  });
  
export default connectDb(apiRoute);