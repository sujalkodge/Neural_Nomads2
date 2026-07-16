import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['manager', 'employee'],
    default: 'employee',
  },
  dailyHours: {
    monday: {
      workHours: { type: Number, default: 8 },
      overtimeHours: { type: Number, default: 0 }
    },
    tuesday: {
      workHours: { type: Number, default: 8 },
      overtimeHours: { type: Number, default: 0 }
    },
    wednesday: {
      workHours: { type: Number, default: 8 },
      overtimeHours: { type: Number, default: 0 }
    },
    thursday: {
      workHours: { type: Number, default: 8 },
      overtimeHours: { type: Number, default: 0 }
    },
    friday: {
      workHours: { type: Number, default: 8 },
      overtimeHours: { type: Number, default: 0 }
    }
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
}, { strict: false });

const User = mongoose.model('User', userSchema);
export default User;
