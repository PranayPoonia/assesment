-- Create the database
CREATE DATABASE mentorship_platform;

-- Use the created database
USE mentorship_platform;

-- Create the users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- Create the profiles table
CREATE TABLE profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  role VARCHAR(100),
  skills TEXT,
  interests TEXT,
  bio TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create the mentorship_requests table
CREATE TABLE mentorship_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  mentor_id INT,
  mentee_id INT,
  status ENUM('pending', 'accepted', 'declined') DEFAULT 'pending',
  FOREIGN KEY (mentor_id) REFERENCES users(id),
  FOREIGN KEY (mentee_id) REFERENCES users(id)
);
