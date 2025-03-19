import express from 'express';
import { signup, login } from '../controllers/userController.js';

const router = express.Router();

// Route for user registration (signup)
router.post('/signup', signup);

// Route for user login
router.post('/login', login);

export default router; 