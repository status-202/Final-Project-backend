const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const app = express();
const port = process.env.PORT || 3001;
const cors = require("cors");
const dotenv = require("dotenv");

// const jwt = require('jsonwebtoken');

dotenv.config({ path: "./.env" });

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello from SLAP");
});

app.post("/testing", (req, res) => {
  const userName = req.body.profileObj.name;
  const user = { name: userName };
  const accessToken = req.body.token;
  jwt.sign(user, accessToken);
  res.send(req.body);
});

app.listen(port, () => console.log(`App is listening on port ${port}`));
