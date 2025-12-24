import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/user.js';

dotenv.config();

const checkAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(' MongoDB Connected');

    const admin = await User.findOne({ email: 'admin@flavortown.com' });
    
    if (admin) {
      console.log(' Admin user found:');
      console.log('Email:', admin.email);
      console.log('Role:', admin.role);
      console.log('Name:', admin.name);
      
      if (admin.role !== 'admin') {
        console.log('\n⚠️  Role is NOT admin! Fixing...');
        
        // Add phone number if missing
        if (!admin.phoneNumber) {
          admin.phoneNumber = '0771234567';
        }
        
        admin.role = 'admin';
        await admin.save();
        console.log(' Admin role updated successfully!');
      }
    } else {
      console.log(' Admin user not found!');
    }

    mongoose.connection.close();
  } catch (error) {
    console.error(' Error:', error);
    process.exit(1);
  }
};

checkAdmin();
