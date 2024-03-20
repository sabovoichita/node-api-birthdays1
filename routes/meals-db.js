var express = require("express");
var router = express.Router();
var fs = require("fs");
var mysql = require("mysql");

const DATA_PATH = "data/structure.sql";

/**
 * IMPORTANT: add content type headers to be able to use req.body.*
  headers: {"Content-Type": "application/json"},
 */

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "meals"
});

function getConnection(res) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        console.error("connection failed", err);
        res.render("error", {
          status: err.status || 500,
          message: "Connection failed",
          error: {
            status: "Check API logs"
          }
          //error: err
        });
        reject("mysql connection failed", err);
        return;
      }
      resolve(connection);
    });
  });
}

/**
 * run this before first USAGE to create meals TABLE
 */
router.get("/install", async function (req, res, next) {
  try {
    const connection = await getConnection(res);
    const sql = fs.readFileSync(DATA_PATH, "utf8");
    connection.query(sql, function (err, results) {
      if (err) {
        console.error("Install failed", err);
      }
      connection.release();
      res.redirect("/");
    });
  } catch (err) {}
});

/**
 *
 */
router.get("/", async function (req, res, next) {
  try {
    const connection = await getConnection(res);
    const sql = `SELECT id, order, date, meal, symptom, avoid FROM meals`;
    connection.query(sql, function (err, results) {
      if (err) {
        console.error(err);
        connection.release();
        res.send(err);
        return;
      }
      connection.release();
      res.json(results);
    });
  } catch (err) {}
});

/**
 *
 */
router.post("/create", async function (req, res, next) {
  const order = req.body.order;
  const date = req.body.date;
  const meal = req.body.meal;
  const symptom = req.body.symptom;
  const avoid = req.body.avoid;

  try {
    const connection = await getConnection(res);
    const sql = `INSERT INTO meals (id, order, date, meal, symptom, avoid) VALUES (NULL, ?, ?, ?, ?);`;
    connection.query(sql, [order, date, meal, symptom, avoid], function (err, results) {
      if (err) throw err;
      const id = results.insertId;
      connection.release();
      res.json({
        success: true,
        id
      });
    });
  } catch (err) {}
});

/**
 *
 */
router.delete("/delete", async function (req, res, next) {
  const id = req.body.id;

  try {
    const connection = await getConnection(res);
    const sql = `DELETE FROM meals WHERE id=?`;
    connection.query(sql, [id], function (err, results) {
      if (err) throw err;
      connection.release();
      res.json({ success: true });
    });
  } catch (err) {}
});

/**
 *
 */
router.put("/update", async function (req, res, next) {
  const id = req.body.id;
  const order = req.body.order;
  const date = req.body.date;
  const meal = req.body.meal;
  const symptom = req.body.symptom;
  const avoid = req.body.avoid;

  try {
    const connection = await getConnection(res);
    const sql = `UPDATE meals SET order=?, date=?, meal=?, symptom=?,avoid=? WHERE id=?`;
    connection.query(sql, [order, date, meal, symptom, avoid, id], function (err, results) {
      if (err) throw err;
      connection.release();
      res.json({ success: true });
    });
  } catch (err) {}
});

module.exports = router;
