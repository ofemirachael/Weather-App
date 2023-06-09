// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");

const bodyParser = require("body-parser");

// Start up an instance of app

const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8080;
const server = app.listen(
  port,
  (listen = () => {
    console.log(`server is running on localhost, port: ${port}!`);
  })
);

// POST Route
const data = [];
app.post("/add", addData);

function addData(req, res) {
  projectData.content = req.body.content;
  projectData.date = req.body.date;
  projectData.temp = req.body.temp;

  res.send(projectData);
}

// GET all Route
app.get("/all", getData);

function getData(req, res) {
  res.send(projectData);
}
