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

// MONGOOSE CONNECTION

const dbURI = process.env.DBURI;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(res => app.listen(port, () => console.log(`Listening on ${port} and connected to atlas`)))
  .catch(err => console.log(err))

// ROUTES

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello from SLAP");
});

app.post("/login", (req, res) => {
  const { profileObj } = req.body;
  const user = profileObj;
  // const clientToken = req.body.token;
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN);
  res.json({ user, accessToken });
});

app.get("/dashboard/:id", async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const devComputer = await DeveloperComputer.find({ computerID: id });
  //console.log(devComputer);
  res.json(devComputer);
});

app.get("/dashboard", authenticateToken, async (req, res) => {
  const computers = await DeveloperComputer.find();
  // console.log(computers);
  res.json(computers);
});

app.post("/dashboard", authenticateToken, async (req, res) => {
  const newDevComputer = new DeveloperComputer(req.body);
  await newDevComputer.save();
  res.send(newDevComputer);
});

app.patch("/dashboard/:id", authenticateToken, async (req, res) => {
  const user = req.body.users;
  const updatedComputer = req.body.computer
  const computer = await DeveloperComputer.find({ computerID: updatedComputer.computerID });
  let query = {$set: {}};
  for (let key in updatedComputer) {
     if(updatedComputer[key] !== computer[0][key]) {
       query.$set[key] = updatedComputer[key];
     }
  }
   await DeveloperComputer.updateOne({ computerID: updatedComputer.computerID }, query);
   if(user){
     await DeveloperComputer.findOneAndUpdate(
        {
          computerID: updatedComputer.computerID
        }, 
        {
          $push: {
            users: {
              $each: [user], 
              $position: 0
            }
          }
        }
       );
   }
  const updatedComputerInDatabase = await DeveloperComputer.find({ computerID: updatedComputer.computerID});
  res.json(updatedComputerInDatabase);
 })

app.delete("/dashboard/:id", authenticateToken, async (req, res) => {
  const computerID = req.params.id;
  const deleted = await DeveloperComputer.findOneAndDelete({ computerID: computerID })
  console.log(deleted);
  res.status(200).json("deleted");
})


function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  // console.log(authHeader)
  const token = authHeader.split(" ")[1] || null;
  if (token === null) res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

process.on('SIGINT', () => {
  mongoose.disconnect();
  console.log('Closed Connection gracefully')
  process.exit();
});

// app.listen(port, () => console.log(`App is listening on port ${port}`));
