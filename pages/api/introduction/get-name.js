import Introduction from "../../../models/Introduction";
import nextConnect from "next-connect";
import connectDb from "../../../middlewhare/mongoos";
// pages/api/introduction/index.js
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
    const introductions = await Introduction.find({}, "name");
    res.status(200).json(introductions.map((intro) => ({ name: intro.name, href: `/introduction/${intro.name}` })));
  } catch (error) {
    res.status(500).json({ error: `Sorry, something happened! ${error.message}` });
  }
});

export default connectDb(apiRoute);
