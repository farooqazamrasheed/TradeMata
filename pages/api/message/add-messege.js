import Contact from "../../../models/Contact";

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
    const { name, email, phone, country, subject, message } = req.body;
    const newContact = new Contact({ name, email, phone, country, subject, message });
    const savedContact = await newContact.save();
    res.status(200).json(savedContact);
  } catch (error) {
    res.status(500).json({ error: `Sorry something happened! ${error.message}` });
  }
});

export default connectDb(apiRoute);


