const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
const port = 3000;

// Enable CORS and parse JSON body
app.use(cors());
app.use(bodyParser.json());

// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yourpassword',
  database: 'mentorship_platform'
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

// Register Endpoint
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: err.message });
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(query, [username, hashedPassword], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'User registered successfully!' });
    });
  });
});

// Login Endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'User not found' });

    bcrypt.compare(password, results[0].password, (err, isMatch) => {
      if (err || !isMatch) return res.status(401).json({ message: 'Invalid credentials' });
      const token = jwt.sign({ userId: results[0].id }, 'secretkey', { expiresIn: '1h' });
      res.status(200).json({ token });
    });
  });
});

// Profile Update Endpoint
app.put('/profile', (req, res) => {
  const { userId, role, skills, interests, bio } = req.body;
  const query = 'UPDATE profiles SET role = ?, skills = ?, interests = ?, bio = ? WHERE user_id = ?';
  db.query(query, [role, skills, interests, bio, userId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'Profile updated successfully!' });
  });
});

// Send Mentorship Request Endpoint
app.post('/request-mentor', (req, res) => {
  const { mentorId, menteeId } = req.body;
  const query = 'INSERT INTO mentorship_requests (mentor_id, mentee_id) VALUES (?, ?)';
  db.query(query, [mentorId, menteeId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Mentorship request sent successfully!' });
  });
});

// Accept or Decline Mentorship Request
app.put('/update-request', (req, res) => {
  const { requestId, status } = req.body;
  const query = 'UPDATE mentorship_requests SET status = ? WHERE id = ?';
  db.query(query, [status, requestId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'Request updated successfully!' });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
