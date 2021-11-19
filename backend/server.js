const express = require("express");
const cors = require("cors");

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

const router = require("./routes/userRouter.js");
app.use("/user/", router);

app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

const PORT = process.env.PORT || 5700;

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});
