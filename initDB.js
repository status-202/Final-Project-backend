const mongoose = require("mongoose");
const dotenv = require("dotenv");

const dbURI = process.env.DBURI;

const dbConnect = () => {
  mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(res => app.listen(port, () => console.log(`Listening on ${port} and connected to atlas`)))
    .catch(err => console.log(err))

    // process.on('SIGINT', () => {
    //   mongoose.disconnect();
    //   process.exit();
    // });
}

module.exports.dbConnect = dbConnect;