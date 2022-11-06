const express = require("express"); //The main app module
const { json } = require("express"); //To enable parsing of json data in the body of requests
const flights = require("./controllers/flightController");
const models = require("./models/Flight");
const routes = require("./routes/flightRoute"); //To control our routing

const app = express();

app.use(json()); //enable the parsing of json data

app.use("/flight-Bookings", routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Code adapted/edited/constructed by Precious Chukwuezi, 5th-6th November, 2022.
