import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export async function createuser(req, res) {
    const data = req.body;
    
    
    const fullName = data.fullName || ''; 
    const names = fullName.split(' ');
    
    const firstName = names[0] || ''; 
    const lastName = names.slice(1).join(' ') || ''; 
    
   
    if (!data.email || !data.password || !firstName || !lastName || !data.phoneNumber) {
        return res.status(400).json({
            message: "User creation failed. Email, Password, First Name and Last Name and Phone Number are required."
        });
    }

    try {
        
        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) {
            return res.status(400).json({
                message: "User creation failed. Email already exists."
            });
        }

        const hashedPassword = bcrypt.hashSync(data.password, 10);

        const user = new User({
            email: data.email,
            password: hashedPassword,
            firstName: firstName, 
            lastName: lastName,
            phoneNumber: data.phoneNumber,
            role: data.role || 'customer', 
        });
        
        await user.save(); 
        
        res.status(200).json({
        message: "User created successfully"
        });

    } catch (error) {
        
        res.status(400).json({
            message: "User creation failed. Data is invalid.",
            error: error.message
        });
    }
}


export function loginUser(req,res){
    const email = req.body.email;
    const password = req.body.password;
    
    User.find({email: email}).then(
        (users) => {
            if(users[0] == null){
                return res.status(401).json({ // 401 Unauthorized
                 message: "Invalid email or password"
                });
            }else{
               const user = users[0];
               
               const isPasswordCorrect = bcrypt.compareSync(password, user.password);

               if(isPasswordCorrect){
               const payload ={
                   email: user.email,
                   firstName: user.firstName,
                   lastName: user.lastName,
                   phoneNumber: user.phoneNumber,
                   role: user.role,
                   isEmailVerified: user.isEmailverrified,
                   image: user.image
               };

               const token = jwt.sign(payload, process.env.JWT_SECRET, {
                   
               });
              return res.status(200).json({ 
              message: "Login successful",
              token: token
             });
              }else{
                return res.status(401).json({
                message: "Invalid email or password" // Security practice
                });

               
               }
            }
        }
    )
    .catch(error => {
        console.error("Login DB error:", error);
        return res.status(500).json({ 
            message: "An internal server error occurred during login." 
        });
    });
}


export function getProfile(req, res) {
    
    if (req.user == null) {
        return res.status(401).json({
            message: "Authentication required. Please provide a valid token."
        });
    }

    
    res.json({
        message: "Profile data fetched successfully",
        user: req.user 
    });
}



export function isAdmin(req){
    if(req.user == null ){
        
        return false;
    }
    if(req.user.role !== "admin"){
        
        return false;
    }
    return true;
}