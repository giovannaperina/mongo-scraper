// Dependecies
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

// Require models


const PORT = process.env.PORT || 3000;

// Express
const app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Mongo DB
mongoose.connect("mongodb://localhost/mediumScraper");

// Routes
const routes = require("./routing/routes.js");
const htmlRoutes = require("./routing/htmlRoutes.js");
app.use(routes);
app.use(htmlRoutes);


// Start the server
app.listen(PORT, function() {
    console.log("Listening at http://localhost:" + PORT);
  });
