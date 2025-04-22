import express from 'express';
import { createEvent, updateEvent, deleteEvent, getEvents } from '../controllers/eventController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// All event routes require authentication
router.use(authenticateToken);

// Get all events
router.get('/', getEvents);

// Create a new event
router.post('/', createEvent);

// Update an existing event
router.put('/:id', updateEvent);

// Delete an event
router.delete('/:id', deleteEvent);

export default router;
