import Message from "../../../models/Message";
import Chat from "../../../models/Chat";
import User from "../../../models/User";
import nextConnect from "next-connect";
import { pusherServer } from "../../../lib/pusher";
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
    const body = req.body;

    const { chatId, currentUserId, text, photo } = body;
    console.log( chatId, currentUserId, text, photo)
    const currentUser = await User.findById(currentUserId);

    const newMessage = await Message.create({
      chat: chatId,
      sender: currentUser,
      text,
      photo,
      seenBy: currentUserId,
    });

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { messages: newMessage._id },
        $set: { lastMessageAt: newMessage.createdAt },
      },
      { new: true }
    )
      .populate({
        path: "messages",
        model: Message,
        populate: { path: "sender seenBy", model: "User" },
      })
      .populate({
        path: "members",
        model: "User",
      });

    /* Trigger a Pusher event for a specific chat about the new message */
    await pusherServer.trigger(chatId, "new-message", newMessage);

    /* Triggers a Pusher event for each member of the chat about the chat update with the latest message */
    const lastMessage = updatedChat.messages[updatedChat.messages.length - 1];
    updatedChat.members.forEach(async (member) => {
      try {
        await pusherServer.trigger(member._id.toString(), "update-chat", {
          id: chatId,
          messages: [lastMessage]
        });
      } catch (err) {
        console.error(`Failed to trigger update-chat event`);
      }
    });

    return res.status(200).json(newMessage);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create new message" });
  }
});

export default connectDb(apiRoute);
