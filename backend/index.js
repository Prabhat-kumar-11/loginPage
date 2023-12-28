const express = require("express");
const { userRouter } = require("./routes/UserRoutes");
const { connection } = require("./configs/db");

const app = express();
const cors = require("cors");

const { auth } = require("./middleware/authMiddleware");

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use(auth);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to the DB");
  } catch (err) {
    console.log(err);
    console.log("cannot connect to the DB");
  }
  console.log(`Server is running at port ${process.env.port}`);
});
