import express from 'express';
import userRoutes from './routes/userRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import { initDatabase } from './db/init.js';

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3200;

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.use('/users', userRoutes);
app.use('/events', eventRoutes);

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'REST API is running',
    endpoints: {
      users: {
        signup: 'POST /users/signup',
        login: 'POST /users/login',
      }
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  initDatabase(); // <-- Initialize the database
});

export default app;
