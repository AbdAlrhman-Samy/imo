const express = require("express");
const session = require("express-session");
const nujucks = require("nunjucks");

const app = express();


// Router imports
const postsRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

nujucks.configure("views", {
  autoescape: true,
  express: app
});

app.use(express.static("public"));
app.use(session({
  secret: "keyboard cat", // TODO: set as env variable
  resave: false,
  saveUninitialized: true,
}))


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/", postsRouter);
app.use("/user", userRouter)

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
