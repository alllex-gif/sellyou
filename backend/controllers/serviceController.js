// Service Controller - Handles all service-related logic

// In-memory database for services (we'll switch to real database later)
let services = [];
let serviceIdCounter = 1;

// Add a service for a freelancer
const addService = (req, res) => {
  try {
    const { title, description, category, hourlyRate, skills } = req.body;
    const userId = req.userId; // From auth middleware

    // Validation
    if (!title || !description || !category || !hourlyRate) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['title', 'description', 'category', 'hourlyRate']
      });
    }

    if (hourlyRate <= 0) {
      return res.status(400).json({
        error: 'Hourly rate must be greater than 0'
      });
    }

    // Valid categories
    const validCategories = ['graphic-design', 'web-development', 'writing', 'marketing', 'video-editing', 'music', 'photography', 'other'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        error: 'Invalid category',
        validCategories: validCategories
      });
    }

    // Create service
    const newService = {
      id: serviceIdCounter++,
      userId,
      title,
      description,
      category,
      hourlyRate,
      skills: skills || [],
      rating: 0,
      reviewCount: 0,
      createdAt: new Date().toISOString()
    };

    services.push(newService);

    res.status(201).json({
      message: 'Service added successfully',
      service: newService
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to add service',
      message: error.message
    });
  }
};

// Search services by category, keywords, or skills
const searchServices = (req, res) => {
  try {
    const { category, keyword, minPrice, maxPrice, skills } = req.query;

    let results = [...services];

    // Filter by category
    if (category) {
      results = results.filter(s => s.category === category);
    }

    // Filter by keyword (searches in title and description)
    if (keyword) {
      const lowerKeyword = keyword.toLowerCase();
      results = results.filter(s => 
        s.title.toLowerCase().includes(lowerKeyword) ||
        s.description.toLowerCase().includes(lowerKeyword)
      );
    }

    // Filter by price range
    if (minPrice) {
      results = results.filter(s => s.hourlyRate >= parseFloat(minPrice));
    }
    if (maxPrice) {
      results = results.filter(s => s.hourlyRate <= parseFloat(maxPrice));
    }

    // Filter by skills (comma-separated)
    if (skills) {
      const skillsArray = skills.split(',').map(s => s.trim().toLowerCase());
      results = results.filter(s => 
        skillsArray.some(skill => 
          s.skills.map(sk => sk.toLowerCase()).includes(skill)
        )
      );
    }

    // Sort by rating (highest first)
    results.sort((a, b) => b.rating - a.rating);

    res.json({
      message: 'Search completed',
      count: results.length,
      results: results
    });
  } catch (error) {
    res.status(500).json({
      error: 'Search failed',
      message: error.message
    });
  }
};

// Get all services
const getAllServices = (req, res) => {
  try {
    res.json({
      message: 'All services',
      count: services.length,
      services: services
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to get services',
      message: error.message
    });
  }
};

// Get services for a specific freelancer
const getFreelancerServices = (req, res) => {
  try {
    const userId = req.userId; // From auth middleware
    const freelancerServices = services.filter(s => s.userId === userId);

    res.json({
      message: 'Your services',
      count: freelancerServices.length,
      services: freelancerServices
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to get services',
      message: error.message
    });
  }
};

// Get a specific service by ID
const getServiceById = (req, res) => {
  try {
    const { id } = req.params;
    const service = services.find(s => s.id === parseInt(id));

    if (!service) {
      return res.status(404).json({
        error: 'Service not found'
      });
    }

    res.json({
      message: 'Service found',
      service: service
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to get service',
      message: error.message
    });
  }
};

module.exports = {
  addService,
  searchServices,
  getAllServices,
  getFreelancerServices,
  getServiceById
};
