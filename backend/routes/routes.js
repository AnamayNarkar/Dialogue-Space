import express from 'express';
import { signUp, login} from '../controllers/authcontroller.js';
import { updateMessages } from '../controllers/updateMessagesInDatabase.js';
import { sendLatestUserData } from '../controllers/sendLatestUserData.js';
import { acceptFriendRequest } from '../controllers/handleFriendRequests.js';
import { rejectFriendRequest } from '../controllers/handleFriendRequests.js';
import { sendFriendRequest } from '../controllers/handleFriendRequests.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.post('/sendMessage', updateMessages);
router.get('/getLatestUserData', sendLatestUserData);
router.post('/sendFriendRequest', sendFriendRequest);
router.post('/acceptFriendRequest', acceptFriendRequest);
router.post('/rejectFriendRequest', rejectFriendRequest);

export default router;
