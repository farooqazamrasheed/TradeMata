import { pusherServer } from "../../../lib/pusher";
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
    const { currentUserId } = req.query;

    // Find or create a community chat
    let chat = await Chat.findOne({ isCommunityChat: true });

    if (!chat) {
      chat = await Chat.create({ isCommunityChat: true });
    }

    // Add the current user to the list of members if not already present
    if (!chat.members.includes(currentUserId)) {
      chat.members.push(currentUserId);
      await chat.save();
    }

   // Update the current user's list of chats with the community chat ID if it's not already present
const user = await User.findById(currentUserId);
if (!user.chats.includes(chat._id)) {
  await User.findByIdAndUpdate(
    currentUserId,
    { $addToSet: { chats: chat._id } },
    { new: true }
  );
}


    // Trigger an event for the current user to notify them of the new chat
    await pusherServer.trigger(currentUserId.toString(), "new-chat", chat);

    return res.status(200).json(chat);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create a new chat" });
  }
});

export default connectDb(apiRoute);
