import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error("MONGODB_URI is not defined in .env file.");
  process.exit(1);
}

const names = [
  'Liam Smith', 'Olivia Johnson', 'Noah Williams', 'Emma Brown', 'Oliver Jones',
  'Ava Garcia', 'Elijah Miller', 'Charlotte Davis', 'William Rodriguez', 'Sophia Martinez',
  'James Hernandez', 'Amelia Lopez', 'Benjamin Gonzalez', 'Isabella Wilson', 'Lucas Anderson',
  'Mia Thomas', 'Henry Taylor', 'Evelyn Moore', 'Alexander Jackson', 'Harper Martin',
  'Mason Lee', 'Camila Perez', 'Michael Thompson', 'Gianna White', 'Ethan Harris',
  'Abigail Sanchez', 'Daniel Clark', 'Luna Ramirez', 'Jacob Lewis', 'Ella Robinson',
  'Logan Walker', 'Elizabeth Young', 'Jackson Allen', 'Sofia King', 'Levi Wright',
  'Avery Scott', 'Sebastian Torres', 'Scarlett Nguyen', 'Jack Hill', 'Victoria Flores',
  'Owen Green', 'Aria Adams', 'Theodore Nelson', 'Grace Baker', 'Aiden Hall',
  'Chloe Rivera', 'Samuel Campbell', 'Penelope Mitchell', 'Joseph Carter', 'Layla Roberts'
];

async function seed() {
  try {
    console.log("Connecting to MongoDB at:", mongoUri);
    await mongoose.connect(mongoUri);
    console.log("Connected. Clearing old employees (excluding managers)...");
    
    // Clear all users with role 'employee' so we can do a clean seed
    await User.deleteMany({ role: 'employee' });
    console.log("Deleted old employee records.");

    const salt = await bcrypt.genSalt(10);
    const defaultPassword = await bcrypt.hash('employee123', salt);

    const employeesToInsert = [];

    for (let i = 0; i < names.length; i++) {
      const fullName = names[i];
      const username = fullName.toLowerCase().replace(' ', '.');
      const email = `${username}@neuralnomads.com`;

      // Determine variant based on index:
      // i % 5 === 0: Overtime-heavy (Overachiever)
      // i % 5 === 1: Under-hours (Part-time / Low engagement)
      // i % 5 === 2: Absentee (Few presence days)
      // i % 5 === 3: Maximum 24h limit test (Extreme)
      // i % 5 === 4: Standard full-time (Normal)
      
      let dailyHours = {};

      if (i % 5 === 0) {
        // Variant 1: Overtime-heavy
        dailyHours = {
          monday: { workHours: 8, overtimeHours: 4 },
          tuesday: { workHours: 8, overtimeHours: 5 },
          wednesday: { workHours: 8, overtimeHours: 3 },
          thursday: { workHours: 8, overtimeHours: 4 },
          friday: { workHours: 8, overtimeHours: 2 }
        };
      } else if (i % 5 === 1) {
        // Variant 2: Under-hours
        dailyHours = {
          monday: { workHours: 5, overtimeHours: 0 },
          tuesday: { workHours: 4, overtimeHours: 0 },
          wednesday: { workHours: 6, overtimeHours: 0 },
          thursday: { workHours: 5, overtimeHours: 0 },
          friday: { workHours: 4, overtimeHours: 0 }
        };
      } else if (i % 5 === 2) {
        // Variant 3: Absentee (works only 3 days a week)
        dailyHours = {
          monday: { workHours: 0, overtimeHours: 0 },
          tuesday: { workHours: 8, overtimeHours: 0 },
          wednesday: { workHours: 0, overtimeHours: 0 },
          thursday: { workHours: 8, overtimeHours: 0 },
          friday: { workHours: 8, overtimeHours: 0 }
        };
      } else if (i % 5 === 3) {
        // Variant 4: Extreme hours (near 24h limit)
        dailyHours = {
          monday: { workHours: 12, overtimeHours: 8 },
          tuesday: { workHours: 14, overtimeHours: 6 },
          wednesday: { workHours: 13, overtimeHours: 7 },
          thursday: { workHours: 12, overtimeHours: 9 },
          friday: { workHours: 11, overtimeHours: 5 }
        };
      } else {
        // Variant 5: Standard full-time
        dailyHours = {
          monday: { workHours: 8, overtimeHours: 0 },
          tuesday: { workHours: 8, overtimeHours: 1 },
          wednesday: { workHours: 8, overtimeHours: 0 },
          thursday: { workHours: 8, overtimeHours: 0 },
          friday: { workHours: 8, overtimeHours: 0 }
        };
      }

      employeesToInsert.push({
        username,
        email,
        password: defaultPassword,
        role: 'employee',
        dailyHours,
        createdAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000) // spread join dates over past 50 days
      });
    }

    const inserted = await User.insertMany(employeesToInsert);
    console.log(`Successfully seeded ${inserted.length} diverse employees into the database.`);
    
    // Also print out a quick count
    const totalUsers = await User.countDocuments();
    console.log(`Total users in collection: ${totalUsers}`);
    
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
}

seed();
