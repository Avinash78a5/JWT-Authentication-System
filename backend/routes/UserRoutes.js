import express from 'express';
import { registerUser } from '../controllers/UserController.js';
import { loginUser,getUserDetails,logOut,refreshAccessToken } from '../controllers/UserController.js';

const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/getUserDetails',getUserDetails);
router.post('/logout',logOut);
router.get("/refresh",refreshAccessToken);
export default router;

