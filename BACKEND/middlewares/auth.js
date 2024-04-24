import jwt from "jsonwebtoken";
import { User } from './../models/User.js';

export const isAdminAuthenticated = async(req,res,next)=>{
    try {
        const token = req.cookies.adminToken;
        if(!token){
            return res.status(401).json({success:false,message:"You are not authenticated"})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);

        req.user = await User.findById(decoded.id);
        if(req.user.role !== 'Admin'){
            return res.status(401).json({success:false,message:"You are not authenticated"})
        }

        next();

    } catch (error) {
        console.log("Error authenticating admin",error);
        res.status(401).json({success:false,message:"Error authenticating admin"});
    }
}

export const isPatientAuthenticated = async(req,res,next)=>{
    try {
        const token = req.cookies.patientToken;
        if(!token){
            return res.status(401).json({success:false,message:"You are not authenticated"})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);

        req.user = await User.findById(decoded.id);
        if(req.user.role !== 'Patient'){
            return res.status(401).json({success:false,message:"You are not authenticated"})
        }

        next();

    } catch (error) {
        console.log("Error authenticating admin",error);
        res.status(401).json({success:false,message:"Error authenticating patient"});
    }
}