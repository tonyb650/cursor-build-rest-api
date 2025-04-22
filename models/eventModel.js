import db from '../db/init.js';

/**
 * Create a new event in the database
 * @param {Object} eventData - The event data
 * @param {number} userId - The ID of the user creating the event
 * @returns {Object} The created event
 */
export const createEventInDb = ({ title, description, date, location }, userId) => {
  const result = db.prepare(`
    INSERT INTO events (title, description, date, location, created_by)
    VALUES (?, ?, ?, ?, ?)
  `).run(title, description, date, location, userId);

  return {
    id: result.lastInsertRowid,
    title,
    description,
    date,
    location,
    createdBy: userId,
    createdAt: new Date().toISOString()
  };
};

/**
 * Get an event by ID and user ID
 * @param {number} eventId - The event ID
 * @param {number} userId - The user ID
 * @returns {Object|null} The event or null if not found
 */
export const getEventByIdAndUser = (eventId, userId) => {
  return db.prepare(`
    SELECT * FROM events 
    WHERE id = ? AND created_by = ?
  `).get(eventId, userId);
};

/**
 * Update an event in the database
 * @param {number} eventId - The event ID
 * @param {Object} eventData - The updated event data
 * @param {number} userId - The ID of the user updating the event
 * @returns {Object} The updated event
 */
export const updateEventInDb = (eventId, { title, description, date, location }, userId) => {
  db.prepare(`
    UPDATE events 
    SET title = ?, description = ?, date = ?, location = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ? AND created_by = ?
  `).run(title, description, date, location, eventId, userId);

  return {
    id: parseInt(eventId),
    title,
    description,
    date,
    location,
    updatedBy: userId,
    updatedAt: new Date().toISOString()
  };
};

/**
 * Delete an event from the database
 * @param {number} eventId - The event ID
 * @param {number} userId - The ID of the user deleting the event
 * @returns {boolean} True if deleted successfully
 */
export const deleteEventFromDb = (eventId, userId) => {
  const result = db.prepare(`
    DELETE FROM events 
    WHERE id = ? AND created_by = ?
  `).run(eventId, userId);
  
  return result.changes > 0;
};

/**
 * Get all events for a specific user
 * @param {number} userId - The ID of the user
 * @returns {Array} Array of events
 */
export const getAllEventsForUser = (userId) => {
  return db.prepare(`
    SELECT * FROM events 
    WHERE created_by = ?
    ORDER BY date ASC
  `).all(userId);
}; 