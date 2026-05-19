// SellYou Backend Server
// This is the main server file that handles all backend logic

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const serviceRoutes = require('./routes/services');

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

// Authentication routes
app.use('/api/auth', authRoutes);

// Service routes
app.use('/api/services', serviceRoutes);

// TODO: Add freelancer profile routes
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
  console.log(`\n🚀 SellYou server is running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api/health`);
  
  console.log(`\n🔐 Auth endpoints:`);
  console.log(`   POST   /api/auth/signup`);
  console.log(`   POST   /api/auth/login`);
  console.log(`   GET    /api/auth/me (protected)`);
  
  console.log(`\n🔍 Service endpoints:`);
  console.log(`   POST   /api/services/add (protected)`);
  console.log(`   GET    /api/services/search`);
  console.log(`   GET    /api/services`);
  console.log(`   GET    /api/services/my-services (protected)`);
  console.log(`   GET    /api/services/:id\n`);
});

module.exports = app;
