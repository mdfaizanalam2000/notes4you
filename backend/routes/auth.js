const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const KEY = "TRYTRYUNTILYOUSUCCEED";
const authenticate = require("../middlewares/authenticate");

//create a user - login not required
router.post("/signup", async (req, res) => {
    try {
        const checkUser = await User.findOne({ email: req.body.email });
        if (checkUser) {
            return res.status(409).send({ "message": "User already registered. Please login!" });
        }
        else {
            const secretPassword = await bcryptjs.hash(req.body.password, 10);
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: secretPassword
            });
            const response = await user.save();
            res.status(201).send({ "message": "User registered successfully. Please login!" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ "message": "some error occured" });
    }
})

//login existing user
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const checkUser = await User.findOne({ email: email });
        if (!checkUser) {
            return res.status(404).send({ "message": "Account is not registered. Please register to login!" });
        }
        const checkPassword = await bcryptjs.compare(password, checkUser.password);
        if (!checkPassword) {
            return res.status(401).send({ "message": "invalid credentials" });
        }
        const data = {
            user: {
                id: checkUser.id
            }
        }
        const jwtToken = jwt.sign(data, KEY);
        res.send({ jwtToken });
    } catch (error) {
        console.log(error);
    }
})

//route to get logged in user details
router.post("/getUser", authenticate, async (req, res) => {
    try {
        const userID = req.user.id;
        const user = await User.findById(userID).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;