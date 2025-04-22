// User model using SQLite database
import db from '../db/config.js';
import argon2 from 'argon2';


// Create a new user
export async function createUser(userData) {
  try {
    // Hash the password using argon2
    const hashedPassword = await argon2.hash(userData.password);
    
    const stmt = db.prepare(`
      INSERT INTO users (name, email, password)
      VALUES (?, ?, ?)
      `);
      
    const info = stmt.run(userData.name, userData.email, hashedPassword);
    
    // Get the newly created user (without password)
    const user = db.prepare('SELECT id, name, email, created_at FROM users WHERE id = ?').get(info.lastInsertRowid);
    
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};


// Find a user by email
export function findUserByEmail(email) {
  const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
  return stmt.get(email);
};

// Verify user credentials
export async function verifyUserCredentials(email, password) {
  const user = findUserByEmail(email);
  
  if (!user) {
    return null;
  }

  try {
    const isValid = await argon2.verify(user.password, password);
    if (isValid) {
      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  } catch (error) {
    console.error('Error verifying password:', error);
    return null;
  }
};