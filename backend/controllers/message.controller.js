import Conversation from "../models/convesation.model.js";
import Message from "../models/message.model.js";
import  mongoose  from "mongoose";

const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const { content } = req.body;
    const senderId = req.user?._id;
    if (!content) {
      return res.status(400).json({ error: "content required!" });
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      content,
      sender: senderId,
      reciver: receiverId,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    return res.status(201).json({ data: newMessage, conver: conversation });
  } catch (error) {
    console.log("send message error :", error);
    res.status(500).json({ error: "niternal server Error :" });
  }
};

const getMessages = async (req, res) => {
  const { id: reciverId } = req.params;
  const senderId = req.user?._id;

  const pipeline = [
    {
      $match: {
        participants: {
          $all: [new mongoose.Types.ObjectId(senderId), new mongoose.Types.ObjectId(reciverId)],
        },
      },
    },
    {
      $lookup: {
        from: "messages",
        localField: "messages",
        foreignField: "_id",
        as: "messages",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "sender",
              foreignField: "_id",
              as: "sender",
              pipeline: [
                {
                  $project: {
                    username: 1,
                    email: 1,
                    avatar: 1,
                  },
                },
              ],
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "reciver",
              foreignField: "_id",
              as: "reciver",
              pipeline: [
                {
                  $project: {
                    username: 1,
                    email: 1,
                    avatar: 1,
                  },
                },
              ],
            },
          },
          {
            $addFields: {
              sender: {
                $first: "$sender",
              },
              reciver: {
                $first: "$reciver",
              },
            },
          },
        ],
      },
    },
    {
      $project: {
        messages: 1,
      },
    },
  ];

  const conversation = await Conversation.aggregate(pipeline);

  if (conversation.length == 0) {
    return res.status(200).json({ message: "convesation is empty !" });
  }

  return res.status(200).json({ conversation });
};

export { sendMessage, getMessages };
