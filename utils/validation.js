/**
 * Validates event data and returns an object with validation results
 * @param {Object} eventData - The event data to validate
 * @returns {Object} Validation result with isValid boolean and error message if invalid
 */
export const validateEventData = (eventData) => {
  const { title, description, date, location } = eventData;

  // Trim all string inputs to remove leading/trailing whitespace
  const trimmedTitle = title?.trim();
  const trimmedDescription = description?.trim();
  const trimmedLocation = location?.trim();

  // Check if any required field is missing
  if (!trimmedTitle || !trimmedDescription || !date || !trimmedLocation) {
    return {
      isValid: false,
      message: 'Please provide all required fields: title, description, date, and location'
    };
  }

  // Validate title length
  if (trimmedTitle.length < 3) {
    return {
      isValid: false,
      message: 'Title must be at least 3 characters long'
    };
  }

  // Validate description length
  if (trimmedDescription.length < 10) {
    return {
      isValid: false,
      message: 'Description must be at least 10 characters long'
    };
  }

  // Validate location length
  if (trimmedLocation.length < 3) {
    return {
      isValid: false,
      message: 'Location must be at least 3 characters long'
    };
  }

  // Validate date format and ensure it's in the future
  const eventDate = new Date(date);
  const currentDate = new Date();
  
  if (isNaN(eventDate.getTime())) {
    return {
      isValid: false,
      message: 'Invalid date format. Please use ISO 8601 format (e.g., 2024-03-20T14:00:00Z)'
    };
  }

  if (eventDate <= currentDate) {
    return {
      isValid: false,
      message: 'Event date must be in the future'
    };
  }

  // Return validated and cleaned data
  return {
    isValid: true,
    validatedData: {
      title: trimmedTitle,
      description: trimmedDescription,
      date: eventDate.toISOString(),
      location: trimmedLocation
    }
  };
}; 