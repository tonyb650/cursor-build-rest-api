import db from './config.js';

// Initialize database by creating tables if they don't exist
export function initDatabase() {
  // Create users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log('Database initialized successfully');
}

// Execute initialization if this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  initDatabase();
  console.log('Database setup complete');
}

export default db; 