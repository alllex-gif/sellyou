// In-memory database for services
let services = [];
let serviceIdCounter = 1;

// Add a new service
const addService = (req, res) => {
  try {
    const { title, description, category, hourlyRate, skills } = req.body;
    const userId = req.userId;

    // Validation
    if (!title || !description || !category || !hourlyRate) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['title', 'description', 'category', 'hourlyRate']
      });
    }

    // Validate hourly rate
    if (hourlyRate <= 0) {
      return res.status(400).json({
        error: 'Hourly rate must be greater than 0'
      });
    }

    // Validate category
    const validCategories = [
      'graphic-design',
      'web-development',
      'writing',
      'video-editing',
      'photography',
      'social-media',
      'virtual-assistant',
      'marketing',
      'other'
    ];

    if (!validCategories.includes(category)) {
      return res.status(400).json({
        error: 'Invalid category',
        validCategories
      });
    }

    // Create service
    const newService = {
      id: serviceIdCounter++,
      freelancerId: userId,
      title,
      description,
      category,
      hourlyRate,
      skills: skills || [],
      rating: 0,
      reviews: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
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

// Search services with filters
const searchServices = (req, res) => {
  try {
    const { category, keyword, minPrice, maxPrice, skills } = req.query;

    let results = services;

    // Filter by category
    if (category) {
      results = results.filter(s => s.category === category);
    }

    // Filter by keyword (search in title and description)
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

    // Filter by skills (if service has any of the requested skills)
    if (skills) {
      const skillsArray = skills.split(',').map(s => s.trim().toLowerCase());
      results = results.filter(s =>
        s.skills.some(skill =>
          skillsArray.includes(skill.toLowerCase())
        )
      );
    }

    res.json({
      total: results.length,
      services: results
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to search services',
      message: error.message
    });
  }
};

// Get all services
const getAllServices = (req, res) => {
  try {
    res.json({
      total: services.length,
      services
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to get services',
      message: error.message
    });
  }
};

// Get current user's services (protected)
const getMyServices = (req, res) => {
  try {
    const userId = req.userId;
    const userServices = services.filter(s => s.freelancerId === userId);

    res.json({
      total: userServices.length,
      services: userServices
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to get your services',
      message: error.message
    });
  }
};

// Get service by ID
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
      service
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
  getMyServices,
  getServiceById
};
