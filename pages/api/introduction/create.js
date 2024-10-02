import Introduction from "../../../models/Introduction";
import nextConnect from "next-connect";
import connectDb from "../../../middlewhare/mongoos";
const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.post(async (req, res) => {
  try {
    const { name, description} = req.body;
    console.log(name, description);
    const newIntroduction = new Introduction({ name, description });
    const savedIntroduction = await newIntroduction.save();
    res.status(200).json(savedIntroduction);
  } catch (error) {
    res.status(500).json({ error: `Sorry something happened! ${error.message}` });
    
  }
});

export default connectDb(apiRoute);


