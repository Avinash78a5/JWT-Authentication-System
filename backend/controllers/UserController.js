import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from "dotenv"
import { generateAccessToken,generateRefreshToken } from '../token.js';

dotenv.config();
export const registerUser = async (req ,res) => {
    try{
        const {name,email,password,mobile}  = req.body;
        if(!name || !email || !password || !mobile){
            return res.status(400).json({message:"Please fill all the fields"});
        }

        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message:"User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = new User({name,email,password:hashedPassword,mobile});
        await user.save();
        res.status(201).json({message:"User registered successfully"});

    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
   
}

export const loginUser = async (req,res) => {

    try{
            const {email,password} = req.body;

            if(!email || !password){
                return res.status(400).json({message:"Please fill all the fields"});
            }

            const user = await User.findOne({email});

            if(!user){
                return res.status(400).json({message:"User does not exist"});
            }

            const isMatch = await bcrypt.compare(password,user.password);

            if(!isMatch){
                return res.status(400).json({message:"Invalid credentials"});
            }

            // const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"1h"});

            const accessToken = generateAccessToken(user._id);
            const refreshToken = generateRefreshToken(user._id);

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: "Lax",
                maxAge: 1 * 24 * 60 * 60 * 1000,
            });
            return res.status(200).json({message:"Login successful",accessToken});
    } catch (error) {
        return res.status(500).json(error);
    }
     

}

export const getUserDetails = async (req,res) => {

    try{
        const authHeader = req.headers.authorization;

        const token = authHeader && authHeader.split(" ")[1];

        if(!token) {
            return res.status(401).json({message:"Access Token missing"});
        }

        const decoded = jwt.verify(token,process.env.ACCESS_SECRET);

        const user = await User.findById(decoded.userId);

        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error("getUserDetails error:", error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Access token expired" });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid access token" });
        }
        return res.status(500).json({ message: "Server error", error: error.message });
    }
    
}

export const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res.status(401).json({ message: "Refresh token missing" });

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const user = await User.findById(decoded.userId);

    const newAccessToken = generateAccessToken(user._id);
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Invalid or expired refresh token", error });
  }
};


export const logOut = async (req, res) => {
  try {
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logout Successful" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};