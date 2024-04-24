import { Appointment } from "../models/appointment.js";
import { User } from "../models/User.js";

export const postAppointment = async (req, res) => {
    try {
        // Fetch data
        const { firstName, lastName, email, phone, gender, dob, nic, appointment_date, department,  hasVisited, address } = req.body;

        // Validation
        if (!firstName || !lastName || !email || !phone || !gender || !dob || !nic || !appointment_date || !department || !address) {
            return res.status(400).json({ success: false, message: "Please fill all the fields correctly." });
        }

        // const isConflict = await User.find({ firstName: doctor_firstName, lastName: doctor_lastName, role: "Doctor", doctorDepartment: department })

        // if (isConflict.length === 0) {
        //     return res.status(400).json({ success: false, message: "Doctor does not exist." });
        // }
        // if (isConflict.length > 1) {
        //     return res.status(400).json({ success: false, message: "Doctor conflict! Please take appointment through email." });
        // }

        // const doctorId = isConflict[0]._id;
        const patientId = req.user._id;

        const appointment = await Appointment.create({
            firstName,
            lastName,
            email,
            phone,
            gender,
            dob,
            nic,
            appointment_date,
            department,
            // doctor: {
            //     firstName: doctor_firstName,
            //     lastName: doctor_lastName,
                
            // },
            hasVisited,
            address,
            // doctorId,
            patientId,
        });

        res.status(200).json({
            success: true,
            appointment: appointment,
            message: "Appointment created successfully"
        });

    } catch (error) {
        console.log("Appointment creation error", error);
        return res.status(500).json({
            success: false,
            message: "Appointment creation failed",
            error: error.message // Return the actual error message for debugging
        });
    }
}

export const getAllAoppointments = async(req,res)=>{
    try {
        const allApointMents = await Appointment.find({});
        res.status(200).json({
            success:true,
            message:"Appointments fetched successfully",
            data:allApointMents
        })
    } catch (error) {
        console.log("Error in appointments fetching", error);
        return res.status(500).json({success:false, message:"Appointments not fethed"});
    }
}

export const updateAppointments = async(req, res) => {
    try {
        const {id} = req.params;

        let appointment = await Appointment.findById(id);

        if(!appointment){
            return res.status(400).json({success:false,message:"Could not find appointment"})
        }

        appointment = await Appointment.findByIdAndUpdate(id,req.body,{
            new:true,
            runValidators:true,
            useFindAndModify:false
        });

        // return response
        res.status(200).json({
            success:true,
            message:"Appointment updated successfully",
            data:appointment
        })
    } catch (error) {
        console.log("Error updating appointment", error);
        return res.status(500).json({success:false, message:"Error updating appointment"});
    }
}

export const deleteAppointment = async(req, res) => {
    try {
        const {id} = req.params;

        const appointment = await Appointment.findById(id);

        if(!appointment){
            return res.status(400).json({success:false,message:"Could not find appointment"})
        }

        await Appointment.deleteOne()

        res.status(200).json({
            success:true,
            message:"Appointment deleted successfully",
            data:appointment
        })
    } catch (error) {
        console.log("Error deleting appointment: " , error);
        return res.status(500).json({success:false, message:"Error deleting appointment"});
    }
}