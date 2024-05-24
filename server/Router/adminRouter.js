const express = require("express");
const adminRouter = express.Router();

const { adminSignup, adminLogin, fetch } = require("../Controller/adminController");
const authenticate = require("../middleware/auth");


adminRouter.post("/signup", adminSignup);
adminRouter.post("/login", adminLogin);
adminRouter.get("/getusers",authenticate, fetch);

module.exports = adminRouter