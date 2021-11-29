const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const app = express();
const port = process.env.PORT || 3001;
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello from SLAP");
});

app.post("/testing", (req, res) => {
  console.log(req.body);
  res.status(200).json(req.body.token);
  //res.send(req.body.token);
});

app.listen(port, () => console.log(`App is listening on port ${port}`));
