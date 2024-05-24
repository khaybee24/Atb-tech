const express = require("express");
const app = express();
const mongoose = require("mongoose");
const env = require("dotenv").config();
const port = process.env.PORT || 2200;
const cors = require("cors")

const connectDb = require("./db/db");
const Router = require("./Router/userRouter");
const adminRouter = require("./Router/adminRouter");



app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))

connectDb();

app.use(express.json());

app.use("/api/v1", Router)

app.use("/api/v1/admin", adminRouter)



app.get("/", (req, res) => {
  res.send("homePage");
});

app.listen(port, () => {
  console.log(`app is listening on http://localhost${port}`);
});
