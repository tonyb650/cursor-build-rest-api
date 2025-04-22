import { 
  createEventInDb, 
  getEventByIdAndUser, 
  updateEventInDb, 
  deleteEventFromDb,
  getAllEventsForUser
} from '../models/eventModel.js';
import { validateEventData } from '../utils/validation.js';

// Event controller for managing events
export const createEvent = async (req, res) => {
  try {
    const userId = req.user.userId;
    
    // Validate event data
    const validationResult = validateEventData(req.body);
    if (!validationResult.isValid) {
      return res.status(400).json({ message: validationResult.message });
    }

    // Create event using the model with validated data
    const newEvent = createEventInDb(validationResult.validatedData, userId);

    res.status(201).json({
      message: 'Event created successfully',
      event: newEvent
    });
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    // Validate event data
    const validationResult = validateEventData(req.body);
    if (!validationResult.isValid) {
      return res.status(400).json({ message: validationResult.message });
    }

    // Check if event exists and belongs to user
    const event = getEventByIdAndUser(id, userId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found or unauthorized' });
    }

    // Update event using the model with validated data
    const updatedEvent = updateEventInDb(id, validationResult.validatedData, userId);

    res.status(200).json({
      message: 'Event updated successfully',
      event: updatedEvent
    });
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    // Check if event exists and belongs to user
    const event = getEventByIdAndUser(id, userId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found or unauthorized' });
    }

    // Delete event using the model
    deleteEventFromDb(id, userId);
    
    res.status(200).json({
      message: 'Event deleted successfully',
      eventId: id
    });
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Get all events for the authenticated user
 */
export const getEvents = async (req, res) => {
  try {
    const userId = req.user.userId;
    
    // Get all events for the user
    const events = getAllEventsForUser(userId);
    
    res.status(200).json({
      message: 'Events retrieved successfully',
      events
    });
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}; 