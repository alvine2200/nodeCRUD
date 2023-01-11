const express = require("express");

const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// database credentials
const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

pool.getConnection((err, conn) => {
  if (err) throw err;
  console.log("connected as id" + conn.threadId);
});

// parsing midleware
app.use(bodyParser.urlencoded({ extended: false }));

// parse only json
app.use(bodyParser.json());

// use static files in a folder
app.use(express.static("public"));

// template engines for handlesbars hbs
app.engine("hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

// user routes
const routes = require("./server/routes/user");
app.use("", routes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
