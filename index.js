const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const app = express();
const port = process.env.PORT || 3001;
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const DeveloperComputer = require('./DeveloperComputer');

const jwt = require("jsonwebtoken");

const dbURI = process.env.DBURI;

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(res => app.listen(port, () => console.log(`Listening on ${port} and connected to atlas`)))
  .catch(err => console.log(err))

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello from SLAP");
});

app.get("/dashboard", authenticateToken, async (req, res) => {
    const computers = await DeveloperComputer.find();
    // console.log(computers);
    res.json(computers);
});

app.post("/login", (req, res) => {
  const userName = req.body.profileObj.name;
  const user = { name: userName };
  // const clientToken = req.body.token;
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN);
  res.json({ user, accessToken });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log(authHeader)
  const token = authHeader.split(" ")[1] || null ;
  if (token === null) res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// app.listen(port, () => console.log(`App is listening on port ${port}`));
