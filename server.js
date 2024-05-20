const express = require("express");
const connect = require("./database/connect");
const csvRouter = require("./src/route/csv");
const orderRouter = require("./src/route/order");
const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = 8000;

//connect database
connect(process.env.MONGO_URI);

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use("/api/csv", csvRouter);
app.use("/api/orders", orderRouter);

app.listen(PORT, () => {
  `server is listening on port ${PORT}`;
});
