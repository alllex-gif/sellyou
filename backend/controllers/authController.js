const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// In-memory database (we'll switch to real database later)
let users = [];
let userIdCounter = 1;

// Sign up a new user
const signup = async (req, res) => {
  try {
    const { email, password, userType, fullName } = req.body;

    // Validation
    if (!email || !password || !userType || !fullName) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['email', 'password', 'userType', 'fullName']
      });
    }

    // Check if email already exists
    if (users.find(u => u.email === email)) {
      return res.status(400).json({
        error: 'Email already registered'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Invalid email format'
      });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        error: 'Password must be at least 6 characters'
      });
    }

    // Validate userType
    if (!['freelancer', 'business'].includes(userType)) {
      return res.status(400).json({
        error: 'userType must be either "freelancer" or "business"'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = {
      id: userIdCounter++,
      email,
      password: hashedPassword,
      userType,
      fullName,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);

    // Create JWT token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, userType: newUser.userType },
      process.env.JWT_SECRET || 'your-secret-key-change-this',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Account created successfully',
      user: {
        id: newUser.id,
        email: newUser.email,
        userType: newUser.userType,
        fullName: newUser.fullName,
        createdAt: newUser.createdAt
      },
      token
    });
  } catch (error) {
    res.status(500).json({
      error: 'Signup failed',
      message: error.message
    });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password required'
      });
    }

    // Find user by email
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({
        error: 'Invalid email or password'
      });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        error: 'Invalid email or password'
      });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, userType: user.userType },
      process.env.JWT_SECRET || 'your-secret-key-change-this',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        userType: user.userType,
        fullName: user.fullName,
        createdAt: user.createdAt
      },
      token
    });
  } catch (error) {
    res.status(500).json({
      error: 'Login failed',
      message: error.message
    });
  }
};

// Get current user (protected route)
const getCurrentUser = (req, res) => {
  try {
    const userId = req.userId;
    const user = users.find(u => u.id === userId);

    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    res.json({
      user: {
        id: user.id,
        email: user.email,
        userType: user.userType,
        fullName: user.fullName,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to get user',
      message: error.message
    });
  }
};

module.exports = {
  signup,
  login,
  getCurrentUser
};
