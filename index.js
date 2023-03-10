const express = require("express");
const nujucks = require("nunjucks");

const app = express();


// Router imports
const postsRouter = require("./routes/postRoutes");
const authRouter = require("./routes/userRoutes");

nujucks.configure("views", {
  autoescape: true,
  express: app
});

app.use(express.static("public"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/", postsRouter);
app.use("/user", authRouter)

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
