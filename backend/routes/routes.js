import express from 'express';
import { signUp, login,updateMessages} from '../controllers/authcontroller.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.post('/sendMessage', updateMessages);

export default router;
