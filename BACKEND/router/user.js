import express from 'express';
import {patientRegister} from "../controllers/User.js";
import {login} from "../controllers/User.js";
import { addNewAdmin } from '../controllers/User.js';
import { addNewDoctor } from '../controllers/User.js';
import { logoutAdmin } from '../controllers/User.js';
import { logoutPatient } from '../controllers/User.js';
import { isAdminAuthenticated } from "../middlewares/auth.js";
import { isPatientAuthenticated } from '../middlewares/auth.js';
import { getAllDoctors } from '../controllers/User.js';
import { getUserDetails } from '../controllers/User.js';

const router = express.Router();

router.post("/patient/register",patientRegister)

router.post("/login",login);

router.post("/admin/addnew",isAdminAuthenticated,addNewAdmin);

router.get("/doctors",getAllDoctors);

router.get("/admin/me",isAdminAuthenticated,getUserDetails);
router.get("/patient/me",isPatientAuthenticated,getUserDetails);
router.get("/admin/logout",isAdminAuthenticated,logoutAdmin);
router.get("/patient/logout",isPatientAuthenticated,logoutPatient);


router.post("/doctor/addnew",isAdminAuthenticated,addNewDoctor);


export default router;