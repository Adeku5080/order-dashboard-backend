const express = require("express");
const Order = require("../model/Order");

const csvRouter = express.Router();
const csv = require("csvtojson");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
});

csvRouter
  .route("/uploadAll")
  .post(upload.single("csvFile"), async (req, res) => {
    const jsonArray = await csv().fromFile(req.file.path);
    Order.insertMany([jsonArray])
      .then(function () {
        console.log("Data inserted"); // Success
      })
      .catch(function (error) {
        console.log(error); // Failure
      });;
    res.json(jsonArray);
  });

module.exports = csvRouter;
