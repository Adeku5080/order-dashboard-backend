const express = require("express");
const Order = require("../model/Order");
const { getAllOrders ,createNewOrder} = require("../controller/Order");

const orderRouter = express.Router();

orderRouter.get("/", getAllOrders);
orderRouter.post("/", createNewOrder);


module.exports = orderRouter;

// aliadekuaam;
// adeku1997;`
// mongodb+srv://aliadekuaam:adeku1997@cluster0.q4rfda8.mongodb.net/order_dashboard