import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function checkUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    const users = await User.find({}, 'name email isAdmin');
    
    console.log('📧 USERS IN DATABASE:\n');
    console.log('═══════════════════════════════════════════════════');
    
    if (users.length === 0) {
      console.log('❌ NO USERS FOUND!\n');
    } else {
      users.forEach((user, index) => {
        console.log(`${index + 1}. ${user.isAdmin ? '👑 ADMIN' : '👤 CUSTOMER'}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Name: ${user.name}`);
        console.log('   Password: 123456');
        console.log('───────────────────────────────────────────────────');
      });
    }
    
    console.log('\n💡 USE THESE CREDENTIALS TO LOGIN:\n');
    
    const customer = users.find(u => !u.isAdmin);
    const admin = users.find(u => u.isAdmin);
    
    if (customer) {
      console.log('👤 CUSTOMER LOGIN:');
      console.log(`   Email: ${customer.email}`);
      console.log('   Password: 123456\n');
    }
    
    if (admin) {
      console.log('👑 ADMIN LOGIN:');
      console.log(`   Email: ${admin.email}`);
      console.log('   Password: 123456\n');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkUsers();
