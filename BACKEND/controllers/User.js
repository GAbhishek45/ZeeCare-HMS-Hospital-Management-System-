// import {User} from "../models/User.js";
import User from "../models/User.js";
import {generateToken} from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

export const patientRegister = async (req, res) => {
  try {
      // Fetch data
      const { firstName, lastName, email, phone, password, gender, dob, nic, role } = req.body;

      // Validation
      if (!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic || !role) {
          return res.status(400).json({ success: false, message: "Please fill all the fields correctly." });
      }

      // Check if user already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
          return res.status(400).json({ success: false, message: "User already exists." });
      }

      // Create entry
      const newUser = await User.create({
          firstName,
          lastName,
          email,
          phone,
          password,
          gender,
          dob,
          nic,
          role,
      });

      // Return response
      generateToken(newUser, "User registered successfully", 200, res);
  } catch (error) {
      console.log("Error in registration", error);
      return res.status(404).json({ success: false, message: "Error in registration" });
  }
};

export const login = async (req, res) => {
  try {
      // Fetch data
      const { email, password, confirmPassword, role } = req.body;

      // Validation
      if (!email || !password || !role) {
          return res.status(400).json({ success: false, message: "Please fill all the fields correctly." });
      }

      // Check if user already exists
      const user = await User.findOne({ email }).select("+password");

      if (!user) {
          return res.status(400).json({ success: false, message: "User does not exist." });
      }

      // Confirm password
      if (password !== confirmPassword) {
          return res.status(400).json({ success: false, message: "Passwords do not match." });
      }

      // Compare password
      const isPassword = await user.comparePassword(password);

      if (!isPassword) {
          return res.status(400).json({ success: false, message: "Please enter a valid password." });
      }

      if (role !== user.role) {
          return res.status(400).json({
              success: false,
              message: "You are not authorized to perform this action.",
          });
      }

      generateToken(user, "User logged in successfully", 200, res);

      // Return response
  } catch (error) {
      console.log("Error in login", error);
      return res.status(404).json({ success: false, message: "Error in login" });
  }
};



export const addNewAdmin = async(req,res)=>{
  try {
     // fetch data
     const {firstName,lastName,email,phone,password,gender,dob,nic} = req.body;
    // validation
    if(!firstName ||!lastName ||!email ||!phone ||!password ||!gender ||!dob ||!nic ){
      return res.status(400).json({success:false,message:"Please fill all the fields correctly."});
    }
    // check if admin already exists
    const userExists = await User.findOne({email});
    if(userExists){
        return res.status(400).json({success:false,message:`User With this email already exists`});
    }
    // create entry

    const admin = await User.create({
      firstName,lastName,email,phone,password,gender,dob,nic,role: 'Admin'
    })

    res.status(200).json({
      success:true,
      message:"Admin added successfully",
      data:admin
    })
  } catch (error) {
    console.log("errror in create a new Admin", error);
    res.status(500).json({success:false, message:"Error creating Admin"});
  }
}



export const getAllDoctors = async(req,res)=>{
  try {
    const doctors = await User.find({role:"Doctor"});
    res.status(200).json({
      success:true,
      message:"Doctors fetched successfully",
      data:doctors
    })
  } catch (error) {
    console.log("Error fetching docs: " + error);
    return res.status(500).json({succss:false,message:"Error fetching docs"})
  }
}

export const getUserDetails = async(req,res)=>{
  try {
    const user = req.user;
    res.status(200).json({
      success:true,
      message:"User fetched successfully",
      data:user
    })
  } catch (error) {
    console.log('getUserDetails error:',error);
    res.status(500).json({success:false, message:"Error fetching user details"});
  }
}

export const logoutAdmin = (req, res) => {
  try {
    res.status(200).cookie("adminToken","",{httpOnly:true,expires:new Date(Date.now())}).json({success:true,message:"Successfully logged out Admin"});
  } catch (error) {
    console.log('logoutAdmin error:',error);
    res.status(500).json({success:false, message:"Error logging out user"});
  }
}

export const logoutPatient = (req, res) => {
  try {
    res.status(200).cookie("patientToken","",{httpOnly:true,expires:new Date(Date.now())}).json({success:true,message:"Successfully logged out patient"});
  } catch (error) {
    console.log('logoutAdmin error:',error);
    res.status(500).json({success:false, message:"Error logging out user"});
  }
}

export const addNewDoctor = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Please select a Avatar Doc to upload" });
    }

    const { docAvtar } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(docAvtar.mimetype)) {
      return res
        .status(400)
        .json({ success: false, message: "Please select a valid Avatar Doc to upload" });
    }

    const { firstName, lastName, email, phone, password, gender, dob, nic, doctorDepartment } =
      req.body;

    // validation
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password ||
      !gender ||
      !dob ||
      !nic ||
      !doctorDepartment
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields correctly." });
    }

    // existing user
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: `Doctor/user with this email already exists` });
    }

    // Upload file to cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(docAvtar.tempFilePath);

    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.log("Cloudinary upload error");
      return res.status(400).json({ success: false, message: "Cloudinary error" });
    }

    // Create new user
    const doctor = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password,
      gender,
      dob,
      nic,
      doctorDepartment,
      role: "Doctor",
      docAvtar: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });

    res.status(200).json({
      success: true,
      message: "Doctor added successfully",
      data: doctor,
    });

    console.log(doctor);
  } catch (error) {
    console.log("An error occurred in the doctor/user service registration", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
