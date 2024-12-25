const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./userModel");
const cors = require("cors");
const cookieParser = require("cookie-parser")

require('dotenv').config()

const app = express();

app.use(cors());
app.use(cookieParser())
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

app.post("/signin", async (req, res) => {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
                return res
                        .status(400)
                        .json({ message: "Sorry! Username Already Taken" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.cookie("username", newUser.username, {
                httpOnly: true,
                secure: false, 
                sameSite: "lax",
            });

        res.status(201).json({
                message: "Congratulations! Your Account Was Created!",
        });
});

app.post("/signup", async(req, res) => {
        const {email, password} = req.body;
        const existingUser = await User.findOne({email});0
        if(!existingUser){
            return res.status(400).json({message: "User account doesn't exists..."})    
        } else {
                const isMatch = await bcrypt.compare(password, existingUser.password);
                if(!isMatch){
                    return res.status(400).json({message: "Invalid credentials..."})
                }
                res.cookie("username", existingUser.username, {
                        httpOnly: true,
                        secure: false,
                        sameSite: "lax",
                    });
                res.json({message: "Logged in successfully!"})
        }
})

app.post("/logout", (req, res) => {
        res.clearCookie("username");
        res.json({ message: "Logged out successfully!" });
});

app.get("/auth/check", (req, res) => {
        const { username } = req.cookies;
    
        if (!username) {
            return res.status(401).json({ message: "Not authenticated" });
        }
    
        res.json({ username });
    });

app.listen(5000, () => {
        console.log("Server Running On 5000");
});
