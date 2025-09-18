import Contact from "../model/contactMessage.js";

export const postContactMessage = async (req, res) => {
  try {
    const { name, email, mobile, message } = req.body;

    const newMessage = new Contact({ name, email, mobile, message });

    await newMessage.save(); // ✅ Save to MongoDB

    res.status(201).json({ success: true, message: "Message saved successfully" });
  } catch (error) {
    console.error("Error saving contact message:", error);
    res.status(500).json({ success: false, message: "Failed to save message" });
  }
};

