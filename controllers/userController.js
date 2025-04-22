import { findUserByEmail, createUser, verifyUserCredentials } from '../models/userModel.js';
import { generateToken } from '../utils/auth.js';

// Controller for user authentication

// Register a new user
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Enhanced validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email, and password' });
    }
    
    // Name validation - at least 2 characters
    if (name.length < 2) {
      return res.status(400).json({ message: 'Name must be at least 2 characters long' });
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }
    
    // Password validation - at least 6 characters and no spaces
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }
    
    if (password.includes(' ')) {
      return res.status(400).json({ message: 'Password should not contain spaces' });
    }
    
    // Check if user already exists
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    
    // Create new user
    const newUser = await createUser({ name, email, password });
    
    // Generate JWT token
    const token = generateToken(newUser);
    
    res.status(201).json({
      message: 'User created successfully',
      user: newUser,
      token
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login existing user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Enhanced validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }
    
    // Check if email or password are just whitespace
    if (email.trim() === '' || password.trim() === '') {
      return res.status(400).json({ message: 'Email and password cannot be blank' });
    }
    
    // Verify user credentials
    const user = await verifyUserCredentials(email, password);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = generateToken(user);
    
    res.status(200).json({
      message: 'Login successful',
      user: user,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}; 