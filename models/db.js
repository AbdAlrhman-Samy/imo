const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(
  path.resolve(__dirname, "./db.sqlite"), // has to be used with path.resolve for some reason
  (err) => {
    if (err) {
      console.error(err.message);
      throw err;
    }
    console.log("Connected to the database.");
  }
);

module.exports = db;
