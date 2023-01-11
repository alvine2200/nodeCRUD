const mysql = require("mysql2");
// const Connection = require('mysql2/typings/mysql/lib/Connection');

const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

exports.index = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    console.log("connected as id" + conn.threadId);

    conn.query("SELECT * FROM users", (err, rows) => {
      conn.release();

      if (!err) {
        res.render("home", { rows });
      } else {
        console.log(err);
      }

      console.log(rows);
    });
  });
};
