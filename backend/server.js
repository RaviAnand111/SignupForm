const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const static_path = path.join(__dirname, "../frontend");

app.use(express.static(static_path));

const router = require("./routes/userRouter.js");
app.use("/user/", router);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/welcome", (req, res) => {
  res.sendFile("welcome.html", {
    root: static_path,
  });
});

const PORT = process.env.PORT || 5700;

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});
