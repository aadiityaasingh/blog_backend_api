const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes.js");
const testRoutes = require("./routes/test.Routes.js");
const postRoutes = require("./routes/post.Routes.js");
const commentRoutes = require("./routes/comment.routes.js");
const userRoutes = require("./routes/user.routes.js");

const app = express();

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res)=>{
    res.send("this is working");
})

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments",commentRoutes);
app.use("/api/users", userRoutes);



module.exports = app;