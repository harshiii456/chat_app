import User from "../models/user.model.js";
import Message from "../models/message.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggesInUserId = req.user.id;
    const filteredUsers = await User.find({ _id: { $ne: loggesInUserId } }).select("-password")

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error fetching users for sidebar:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export const getMessages = async (req, res) => {
  try {
    const { id:userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { sender: myId, receiver: userToChatId },
        { sender: userToChatId, receiver: myId }
      ]
    })

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export const sendMessage = async (req, res) => {
  try {
    const { text, image} = req.body;
    const { id:receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if(image){
      // Upload image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      sender,
      receiver,
      text,
      image: imageUrl
    });

    await newMessage.save();

    //todo: real time functionality using socket.io

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage:", error);
    res.status(500).json({ message: "Server error" });
  }
}