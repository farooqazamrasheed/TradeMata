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

apiRoute.get(async (req, res) => {
  try {
    const { chatId } = req.query;

    const chat = await Chat.findById(chatId)
      .populate({
        path: "members",
        model: User,
      })
      .populate({
        path: "messages",
        model: Message,
        populate: {
          path: "sender seenBy",
          model: User,
        },
      })
      .exec();

    return res.status(200).json(chat);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to get chat details" });
  }
});


export default connectDb(apiRoute);
