import express from 'express';
import { signUp, login} from '../controllers/authcontroller.js';
import { updateMessages } from '../controllers/updateMessagesInDatabase.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.post('/sendMessage', updateMessages);

export default router;
