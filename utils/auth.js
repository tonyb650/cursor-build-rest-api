import jwt from 'jsonwebtoken';

// Secret key for JWT signing and verification
// In a production environment, this should be stored in environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

/**
 * Generate a JWT token for a user
 * @param {Object} user - User object containing id and email
 * @returns {String} JWT token
 */
export const generateToken = (user) => {
  if (!user || !user.id || !user.email) {
    throw new Error('User information incomplete');
  }
  
  const payload = {
    userId: user.id,
    email: user.email
  };
  
  // Token expires in 24 hours
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
};

/**
 * Verify a JWT token
 * @param {String} token - JWT token to verify
 * @returns {Object} Decoded token payload or null if invalid
 */
export const verifyToken = (token) => {
  try {
    if (!token) {
      return null;
    }
    
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return null;
  }
};
