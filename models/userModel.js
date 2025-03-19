// User model using SQLite database
import db from '../db/config.js';

// Find a user by email
export function findUserByEmail(email) {
  const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
  return stmt.get(email);
};

// Create a new user
export function createUser(userData) {
  const stmt = db.prepare(`
    INSERT INTO users (name, email, password)
    VALUES (?, ?, ?)
  `);
  
  const info = stmt.run(userData.name, userData.email, userData.password);
  
  // Get the newly created user (without password)
  const user = db.prepare('SELECT id, name, email, created_at FROM users WHERE id = ?').get(info.lastInsertRowid);
  
  return user;
};

