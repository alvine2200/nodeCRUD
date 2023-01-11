const express = require("express");

const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mysql = require("mysql");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// parsing midleware
app.use(bodyParser.urlencoded({ extended: false }));

// parse only json
app.use(bodyParser.json());

// use static files in a folder
app.use(express.static("public"));

// template engines for handlesbars hbs
app.engine("hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

app.get("", (req, res) => {
  res.render("home");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
