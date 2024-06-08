import express from 'express';
import { signUp, login} from '../controllers/authcontroller.js';
import { updateMessages } from '../controllers/updateMessagesInDatabase.js';
import { sendLatestUserData } from '../controllers/sendLatestUserData.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.post('/sendMessage', updateMessages);
router.get('/getLatestUserData', sendLatestUserData);

export default router;
