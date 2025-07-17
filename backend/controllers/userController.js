
const User = require('../models/User');

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

// Create new user
exports.createUser = async (req, res) => {
  const { name } = req.body;
  try {
    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Name is required' });
    }

    // Check for duplicate
    const existing = await User.findOne({ name });
    if (existing) {
      return res.status(409).json({ error: 'User already exists with this name' });
    }
    
    const newUser = new User({ name });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: 'User creation failed' });
  }
};