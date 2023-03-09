const express = require("express");
const db = require("./models/db");
const Post = require("./models/post");
const User = require("./models/user");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
