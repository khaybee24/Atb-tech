const express = require("express");
const signup = require("../Controller/userController");
const app = express();

const router = express.Router();

router.post("/signup", signup)

module.exports = router