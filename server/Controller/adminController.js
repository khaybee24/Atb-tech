const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const admin = require("../Model/adminModel")
const User = require('../Model/userModel');



const adminSignup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, role } = req.body
        const existingAdmin = await admin.findOne({ email })

        if (existingAdmin) {
           return res.status(400).json({
                message: "Admin already exists!"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        if (!password || typeof password !== "string") {
            return res.status(400).json({
                message: "Password must be a string!"
            })
        }

        const newAdmin = new admin({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role
        })

        await newAdmin.save();
        res.status(201).json({
            message: "Admin created successfully!"
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
          message: "Internal server error!"
        });
    }
}

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        const isAnAdmin = await admin.findOne({ email: email })

        if (!isAnAdmin) {
            return res.status(400).json({
                message: "Admin does not exist!"
            })
        }

        console.log(isAnAdmin);

        if (isAnAdmin.role !== "admin") {
            return res.status(404).json({
                message: "This user is not authorized to login!"
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, isAnAdmin.password);


        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect Password!"
            })
        }

        const payload = {
            id: isAnAdmin.id
        }

        const token = jwt.sign(payload, process.env.ACCESS_KEY)

        res.status(201).json({
            message: "Welcome! Admin logged in successfully!",
            token
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error!"
        })
    }
}



    const fetch = async (req,res) => {
        const page = parseInt(req.query.page) ||1; // Current page
        const perPage = 5; 
        try {
            
            const totalUser = await User.countDocuments()
            
            const user = await User.find()
            .skip((page - 1) * perPage)
            .limit(perPage)
            .exec();
      
            console.log('Total Users:', totalUser);
            console.log('Items Returned:', user.length);
            return res.json(user);
            
      
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: 'Server error' });
        }
      }

module.exports = {
    adminSignup,
    adminLogin,
    fetch
}