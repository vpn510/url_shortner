import express from 'express'
import { handleSignUp, handleLogin, handleLogout } from '../controllers/user.js';

const router = express.Router();

router.post('/signup', handleSignUp);
router.post('/login', handleLogin);
router.get('/logout', handleLogout);

export default router;
