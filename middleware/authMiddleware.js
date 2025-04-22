import { verifyToken } from '../utils/auth.js';

/**
 * Middleware to verify JWT token and set user data in request object
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void}
 */
export const authenticateToken = (req, res, next) => {
  // Get the authorization header
  const authHeader = req.headers['authorization'];
  // Extract the token (format: "Bearer TOKEN")
  const token = authHeader && authHeader.split(' ')[1];

  // If no token is provided
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token using the utility function
    const decoded = verifyToken(token);
    
    // If token verification failed
    if (!decoded) {
      return res.status(401).json({ message: 'Invalid token. Please login again.' });
    }
    
    // Set user data in request for use in route handlers
    req.user = {
      userId: decoded.userId,
      email: decoded.email
    };
    
    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(403).json({ message: 'Failed to authenticate token', error: error.message });
  }
}; 