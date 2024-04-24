import { Message } from "../models/messageSchema.js";
// import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
// import ErrorHandler from "../middlewares/error.js";

export const sendMessage = async (req, res, next) => {
    const { firstName, lastName, email, phone, message } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !phone || !message) {
        return res.status(400).json({sucess:false, message:"Please fill all required fields"})
    }

    try {
        await Message.create({
            firstName,
            lastName,
            email,
            phone,
            message,
        });

        console.log("Message sent successfully");

        // Return response
        return res.status(200).json({ success: true, message: "Message sent successfully." });
    } catch (error) {
        console.log("Error sending message", error);
        return res.status(404).json({ success: false, message: "Error sending message" });
    }
}
export const getAllMessages = async (req, res) => {
    try {
        const messages = await Message.find({});
        res.status(200).json({ success: true, message: "All messages successfully retrieved", data: messages });
    } catch (error) {
        console.error("Error retrieving messages:", error);
        res.status(500).json({ success: false, message: "Error retrieving messages" });
    }
};

