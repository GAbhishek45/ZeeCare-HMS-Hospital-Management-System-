import  express  from 'express';
import { sendMessage } from '../controllers/message.js';
import { getAllMessages } from '../controllers/message.js';
import { isAdminAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post("/send",sendMessage);
router.get("/getall",getAllMessages)

export default router;