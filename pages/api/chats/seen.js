import Message from "../../../models/Message";
import Chat from "../../../models/Chat";
import User from "../../../models/User";
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
    const { chatId } = req.query;
    const { currentUserId } = req.body;

    await Message.updateMany(
      { chat: chatId },
      { $addToSet: { seenBy: currentUserId } }
    );

    return res.status(200).json({ message: "Seen all messages by current user" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to update seen messages" });
  }
});

export default connectDb(apiRoute);
