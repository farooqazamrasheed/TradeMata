import connectDb from "../../../middlewhare/mongoos";
import User from "../../../models/User";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const { email } = req.query;

    // Check if email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ exists: true });
    }

    return res.status(200).json({ exists: false });
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDb(handler);
