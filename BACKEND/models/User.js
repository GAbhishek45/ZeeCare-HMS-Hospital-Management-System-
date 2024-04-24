import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema({
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
    password:{
        type:String,
        required:true,
        minlength: [8, "Password must contain at least 8 characters"],
        select:false,
    },
    role:{
        type:String,
        required:true,
        enum:["Admin", "Doctor", "Patient"],
        
    },
    doctorDepartment:{
        type:String,
        
    },
    docAvtar:{
        public_id:String,
        url:String,
    },

});




userSchema.pre("save",async function(){

    this.password = await bcrypt.hash(this.password,10)
})

userSchema.methods.comparePassword = async function(enterPassword){
    return await bcrypt.compare(enterPassword,this.password)
}

userSchema.methods.generateJsonWebToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRES,
    })
}
export const User = mongoose.model('User', userSchema);
export default User;
 