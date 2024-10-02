import Introduction from "../../../models/Introduction";
import nextConnect from "next-connect";
import connectDb from "../../../middlewhare/mongoos";

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry, something happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.delete(async (req, res) => {
  try {
    const { _id } = req.query;

    const deletedIntroduction = await Introduction.findByIdAndDelete(_id);

    if (!deletedIntroduction) {
      return res.status(404).json({ error: "Introduction not found" });
    }

    res.status(200).json({ message: "Introduction deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: `Sorry, something happened! ${error.message}` });
  }
});

export default connectDb(apiRoute);
