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
app.use(morgan('dev'));

