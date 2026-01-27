const express = require("express");
const cookieParser = require("cookie-parser");
// const authRoutes = require("./routes/auth.route.js");
const authRoutes = require("./routes/auth.routes.js");
const testRoutes = require("./routes/test.Routes.js");
const postRoutes = require("./routes/post.Routes.js");

const app = express();

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res)=>{
    res.send("this is working");
})

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/posts", postRoutes);



module.exports = app;