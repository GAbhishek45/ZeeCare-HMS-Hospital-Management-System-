import express from 'express';
import { postAppointment } from '../controllers/appointment.js';
import { getAllAoppointments } from '../controllers/appointment.js';
import { updateAppointments } from '../controllers/appointment.js';
import { deleteAppointment } from '../controllers/appointment.js';
import { isAdminAuthenticated } from "../middlewares/auth.js";
import { isPatientAuthenticated } from "../middlewares/auth.js";


const router = express.Router();


router.put("/update/:id",isAdminAuthenticated,updateAppointments);
router.delete("/delete/:id",isAdminAuthenticated,deleteAppointment);
router.get("/getAll",isAdminAuthenticated,getAllAoppointments);
router.post("/post",isPatientAuthenticated,postAppointment);

export default router;

