import EnrolledCourse from "../../../models/EnrolledCourse";
import Assignment from "../../../models/Assignment"; // Import Assignment model

import nextConnect from "next-connect";
import connectDb from "../../../middlewhare/mongoos";

const apiRoute = nextConnect({
  onError(error, req, res) {
    console.error("API Error:", error);
    res.status(501).json({ error: `Sorry, something went wrong: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.delete(async (req, res) => {
    try {
      const { id } = req.query;
      console.log(id)
      const deleted = await EnrolledCourse.findByIdAndDelete(id);
  
      if (!deleted) {
        return res.status(404).json({ error: "EnrolledCourse not found" });
      }
  
      res.status(200).json({ message: "EnrolledCourse deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: `Sorry, something happened! ${error.message}` });
    }
  });
  
  export default connectDb(apiRoute);
  
