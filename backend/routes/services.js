const express = require('express');
const serviceController = require('../controllers/serviceController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Add a service (protected - only freelancers)
router.post('/add', authMiddleware, serviceController.addService);

// Search services (public)
router.get('/search', serviceController.searchServices);

// Get all services (public)
router.get('/', serviceController.getAllServices);

// Get current user's services (protected)
router.get('/my-services', authMiddleware, serviceController.getFreelancerServices);

// Get specific service by ID (public)
router.get('/:id', serviceController.getServiceById);

module.exports = router;
