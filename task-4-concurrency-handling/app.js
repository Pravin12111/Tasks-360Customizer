const express = require('express');
const redis = require('redis');
const { Client } = require('pg'); // Example for PostgreSQL
const app = express();
const redisClient = redis.createClient(); // Connect to Redis

// Middleware to parse JSON requests
app.use(express.json());

// Sample function to find user (placeholder)
function findUser(userId) {
  // Implement user retrieval logic here
  return { id: userId }; // Assuming user is found
}

// Route to book an event
app.post('/book-event', async (req, res) => {
  const { eventId, userId } = req.body;

  // Generate a lock key based on the event ID
  const lockKey = `lock:event:${eventId}`;
  
  // Try to acquire a lock for the event
  const lockAcquired = await redisClient.setnx(lockKey, 'locked');

  if (lockAcquired) {
    try {
      // Check if the event is already booked
      const bookingCheck = await checkEventBooking(eventId, userId);
      if (bookingCheck) {
        return res.status(409).json({ error: 'Event already booked' });
      }
      
      // Insert booking into the database
      await bookEvent(eventId, userId);
      
      res.status(201).json({ success: true, message: 'Event booked successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to book event' });
    } finally {
      // Release the lock
      await redisClient.del(lockKey);
    }
  } else {
    res.status(429).json({ error: 'Event is currently being booked by another user' });
  }
});

// Function to check if the event is already booked
async function checkEventBooking(eventId, userId) {
  // Implement logic to check if the booking exists in the database
  // Example using PostgreSQL
  const res = await client.query('SELECT * FROM bookings WHERE event_id = $1 AND user_id = $2', [eventId, userId]);
  return res.rowCount > 0; // Return true if a booking exists
}

// Function to insert a booking into the database
async function bookEvent(eventId, userId) {
  // Implement booking logic here
  await client.query('INSERT INTO bookings (event_id, user_id) VALUES ($1, $2)', [eventId, userId]);
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
