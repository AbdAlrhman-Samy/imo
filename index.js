const express = require("express");
const nujucks = require("nunjucks");

const app = express();


// Router imports
const postsRouter = require("./routes/postRoutes");

nujucks.configure("views", {
  autoescape: true,
  express: app
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("home.njk", { title: "Home" });
});

app.use("/", postsRouter);

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
