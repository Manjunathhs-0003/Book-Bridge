const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// Register a new user
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    // Set session data
    req.session.userId = user._id;

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Set session data
    req.session.userId = user._id;

    res.status(200).json({ message: 'User logged in successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Logout user
exports.logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Unable to logout' });
    }
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'User logged out successfully' });
  });
};

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    console.log('User ID:', req.session.userId);  // Log user ID
    const user = await User.findById(req.session.userId).populate('books');
    console.log('User:', user);  // Log user details
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error:', error);  // Log error details
    res.status(500).json({ message: 'Error fetching user profile', error });
  }
};