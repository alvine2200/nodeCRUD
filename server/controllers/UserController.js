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

exports.find = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    console.log("connected as id" + conn.threadId);

    let searchKey = req.body.search;

    conn.query(
      "SELECT * FROM users where first_name like ? or last_name like ? or email like ?",
      ["%" + searchKey + "%", "%" + searchKey + "%", "%" + searchKey + "%"],
      (err, rows) => {
        conn.release();

        if (!err) {
          res.render("home", { rows });
        } else {
          console.log(err);
        }

        console.log(rows);
      }
    );
  });
};

exports.add_user = (req, res) => {
  console.log("User Page hit");
  res.render("add_user");
};

exports.create_user = (req, res) => {
  const { first_name, last_name, email, phone } = req.body;
  pool.getConnection((err, conn) => {
    if (err) throw err;
    conn.query(
      "INSERT INTO users SET first_name = ?, last_name = ? , email = ? , phone = ?",
      [first_name, last_name, email, phone],
      (err, rows) => {
        if (!err) {
          res.render("add_user", { alert: "User Added Successfully" });
          console.log("User created successfully with id " + conn.threadId);
        } else {
          console.log(err);
        }
      }
    );
  });
};

exports.edit_user = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      console.log(err);
    } else {
      conn.query(
        "Select * from users where id = ?",
        [req.params.id],
        (err, rows) => {
          if (err) throw err;
          res.render("edit_user", { rows });
          console.log("User fetched \n", rows);
        }
      );
    }
  });
};

exports.update_user = (req, res) => {
  const { first_name, last_name, email, phone } = req.body;
  pool.getConnection((err, conn) => {
    if (err) throw err;
    conn.query(
      "UPDATE users SET first_name = ?, last_name = ?, email = ?, phone = ?  where id = ?",
      [first_name, last_name, email, phone, req.params.id],
      (err, rows) => {
        if (err) {
          // throw err;
          console.log(err);
        } else {
          res.render("edit_user", { alert: "User successfully updated" });
          console.log(rows);
        }
      }
    );
  });
};
