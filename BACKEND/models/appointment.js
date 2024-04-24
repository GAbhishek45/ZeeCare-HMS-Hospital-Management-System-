import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
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
    nic: {
        type: String,
        required: true,
        minlength: [13, "nic must contain at least 13 characters"],
        maxlength: [13, "nic must contain at only 13 characters"],
    },
    dob:{
        type:Date,
        required:[true,"DOB must be a requires"],
    },
    gender:{
        type:String,
        required:true,
        enum:["Male", "Female"],
    },
    appointment_date:{
        type:String,
        required:true,
    },
    department:{
        type:String,
        required:true,
    },
    // doctor:{
    //     firstName:{
    //         type:String,
    //         required:true,
    //     },
    //     lastName:{
    //         type:String,
    //         required:true,
    //     }
    // },
    hasVisited:{
        type:Boolean,
        required:true,
        default:false,
    },
    // doctorId:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"Doctor",
    //     required:true,
    // },
    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Patient",
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
        enum:["Pending", "Accepted", "Rejected"],
        default:"Pending",
    }



});


export const Appointment = mongoose.model('Appointment', appointmentSchema);