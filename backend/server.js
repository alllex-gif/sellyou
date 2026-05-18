// SellYou Backend Server
// This is the main server file that handles all backend logic

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Basic route to test the server is working
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to SellYou API!',
    version: '1.0.0',
    status: 'Server is running'
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// TODO: Add authentication routes
// TODO: Add freelancer profile routes
// TODO: Add service search routes
// TODO: Add messaging routes
// TODO: Add project posting routes

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 SellYou server is running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api/health`);
});

module.exports = app;
