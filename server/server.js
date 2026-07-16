import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './models/User.js';

// Issue Schema (inline)
const IssueSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, default: 'operational' },
  description: { type: String, required: true },
  priority: { type: String, enum: ['low', 'medium', 'high', 'critical'], default: 'medium' },
  submittedBy: { type: String, required: true }, // username
  submittedById: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['open', 'in-progress', 'resolved'], default: 'open' },
  resolvedAt: { type: Date },
}, { timestamps: true });

const Issue = mongoose.model('Issue', IssueSchema);

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI;
console.log('Connecting to MongoDB Atlas...');

// Seed default manager account on startup
const seedManagerAccount = async () => {
  try {
    const existing = await User.findOne({ username: 'Sujal@123' });
    if (!existing) {
      const hashedPassword = await bcrypt.hash('Sujal_123@@', 12);
      await User.create({
        username: 'Sujal@123',
        email: 'manager@aetherops.internal',
        password: hashedPassword,
        role: 'manager',
      });
      console.log('🔑 Default manager account created: username=Sujal@123');
    } else {
      console.log('✔ Manager account already exists.');
    }
  } catch (err) {
    console.error('⚠ Seed error:', err.message);
  }
};

mongoose.connect(mongoURI)
  .then(async () => {
    console.log('✅ Successfully connected to MongoDB Atlas.');
    await seedManagerAccount();
  })
  .catch(err => {
    console.error('❌ Error connecting to MongoDB:', err.message);
    console.log('→ Check MONGODB_URI in your .env file.');
  });

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

// API Routes

// Register Route
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Simple validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields (username, email, password) are required.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
    }

    // Check if user already exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: 'A user with this email already exists.' });
    }

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ message: 'A user with this username already exists.' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user containing any additional body data
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
      role: role || 'employee'
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role, username: newUser.username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const userResponse = newUser.toObject();
    delete userResponse.password;

    res.status(201).json({
      token,
      user: userResponse
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error during registration.' });
  }
});

// Login Route
app.post('/api/auth/login', async (req, res) => {
  try {
    const { loginIdentifier, password } = req.body; // Can be username or email

    if (!loginIdentifier || !password) {
      return res.status(400).json({ message: 'Please provide both username/email and password.' });
    }

    // Find user by username or email
    const user = await User.findOne({
      $or: [
        { email: loginIdentifier.toLowerCase() },
        { username: loginIdentifier }
      ]
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials. User not found.' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials. Incorrect password.' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({
      token,
      user: userResponse
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error during login.' });
  }
});

// Manager: Get employee count & list
app.get('/api/manager/employees', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'manager') {
      return res.status(403).json({ message: 'Access denied. Manager role required.' });
    }
    const employees = await User.find({ role: 'employee' }).select('-password').sort({ createdAt: -1 });
    res.json({ count: employees.length, employees });
  } catch (error) {
    console.error('Fetch employees error:', error);
    res.status(500).json({ message: 'Internal server error fetching employees.' });
  }
});

// ─── ISSUE ROUTES ─────────────────────────────────────────────────────────────

// Employee: Submit a new issue
app.post('/api/issues', authenticateToken, async (req, res) => {
  try {
    const { title, category, description, priority } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required.' });
    }
    const issue = new Issue({
      title,
      category,
      description,
      priority: priority || 'medium',
      submittedBy: req.user.username || 'Employee',
      submittedById: req.user.id,
    });
    await issue.save();
    res.status(201).json(issue);
  } catch (error) {
    console.error('Submit issue error:', error);
    res.status(500).json({ message: 'Internal server error submitting issue.' });
  }
});

// Manager: Get ALL issues | Employee: Get OWN issues
app.get('/api/issues', authenticateToken, async (req, res) => {
  try {
    let issues;
    if (req.user.role === 'manager') {
      issues = await Issue.find().sort({ createdAt: -1 });
    } else {
      issues = await Issue.find({ submittedById: req.user.id }).sort({ createdAt: -1 });
    }
    res.json(issues);
  } catch (error) {
    console.error('Fetch issues error:', error);
    res.status(500).json({ message: 'Internal server error fetching issues.' });
  }
});

// Manager: Resolve / update issue status
app.patch('/api/issues/:id', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'manager') {
      return res.status(403).json({ message: 'Access denied. Manager role required.' });
    }
    const { status } = req.body;
    const update = { status };
    if (status === 'resolved') update.resolvedAt = new Date();
    const issue = await Issue.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!issue) return res.status(404).json({ message: 'Issue not found.' });
    res.json(issue);
  } catch (error) {
    console.error('Update issue error:', error);
    res.status(500).json({ message: 'Internal server error updating issue.' });
  }
});


app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json(user);
  } catch (error) {
    console.error('Fetch session error:', error);
    res.status(500).json({ message: 'Internal server error fetching user profile.' });
  }
});

// Employee: Update their own work/overtime hours
app.patch('/api/employee/hours', authenticateToken, async (req, res) => {
  try {
    const { dailyHours } = req.body;
    
    if (!dailyHours) {
      return res.status(400).json({ message: 'dailyHours object is required.' });
    }
    
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    const updatedDailyHours = {};
    
    for (const day of days) {
      const dayData = dailyHours[day];
      if (!dayData || dayData.workHours === undefined || dayData.overtimeHours === undefined) {
        return res.status(400).json({ message: `Missing logs for ${day}.` });
      }
      
      const work = Number(dayData.workHours);
      const overtime = Number(dayData.overtimeHours);
      
      if (isNaN(work) || isNaN(overtime) || work < 0 || overtime < 0) {
        return res.status(400).json({ message: `Hours for ${day} must be non-negative numbers.` });
      }
      
      if (work + overtime > 24) {
        return res.status(400).json({ message: `Total active hours (work + overtime) for ${day} cannot exceed 24 hours.` });
      }
      
      updatedDailyHours[day] = { workHours: work, overtimeHours: overtime };
    }
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { dailyHours: updatedDailyHours },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Update employee hours error:', error);
    res.status(500).json({ message: 'Internal server error updating employee hours.' });
  }
});


// Start Server
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
