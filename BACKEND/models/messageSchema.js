import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: [3, "First name must contain at least 3 characters"],
    },
    lastName: {
        type: String,
        required: true,
        minlength: [3, "Last name must contain at least 3 characters"],
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: validator.isEmail,
            message: "Please provide a valid email",
        },
    },
    phone: {
        type: String,
        required: true,
        minlength: [10, "Phone number must contain 10 digits"],
        maxlength: [10, "Phone number must contain 10 digits"],
    },
    message: {
        type: String,
        required: true,
        minlength: [10, "Message must contain at least 10 characters"],
    },
}, { timestamps: true });

export const Message = mongoose.model('Message', messageSchema);
 