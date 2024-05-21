const express = require("express");
const Order = require("../model/Order");
const { getAllOrders ,createNewOrder} = require("../controller/Order");

const orderRouter = express.Router();

orderRouter.get("/", getAllOrders);
orderRouter.post("/", createNewOrder);


module.exports = orderRouter;

