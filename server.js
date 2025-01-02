const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg'); // PostgreSQL client

const app = express();
app.use(bodyParser.json());

// Set up PostgreSQL client
const pool = new Pool({
  user: 'your-username',
  host: 'localhost',
  database: 'mentorship',
  password: 'your-password',
  port: 5432,
});

// Registration Route
app.post('/register', async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *',
      [username, password, role]
    );
    res.json({ message: 'Registration successful', user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1 AND password = $2',
      [username, password]
    );
    if (result.rows.length > 0) {
      res.json({ message: 'Login successful', user: result.rows[0] });
    } else {
      res.status(400).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Profile Route (Create or Update)
app.post('/profile', async (req, res) => {
  const { user_id, skills, interests, bio } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO profiles (user_id, skills, interests, bio) VALUES ($1, $2, $3, $4) RETURNING *',
      [user_id, skills, interests, bio]
    );
    res.json({ message: 'Profile created successfully', profile: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Error creating profile' });
  }
});

// Mentorship Request Route (Send Request)
app.post('/mentorship', async (req, res) => {
  const { mentor_id, mentee_id } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO mentorship_requests (mentor_id, mentee_id, status) VALUES ($1, $2, $3) RETURNING *',
      [mentor_id, mentee_id, 'pending']
    );
    res.json({ message: 'Mentorship request sent', request: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Error sending mentorship request' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
