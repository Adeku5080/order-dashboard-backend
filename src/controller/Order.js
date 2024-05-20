const Order = require("../model/Order");

const createNewOrder = async (req, res) => {
  try {
    const { customer_name, product_name, product_category, price, order_date } =
      req.body;

    //validation

    const orders = Order.create({
      customer_name,
      product_name: product_name,
      product_category: product_category,
      price,
      order_date,
    });

    res.status(200).json({ msg: "order created successfully", orders });
  } catch (err) {
    console.log(err);
  }
};

const getStats = async (req, res) => {
  //get total no of documents = total no of orders;
  //do a sum of total price
  //no of unique customers
};

const getAllOrders = async (req, res) => {
  try {
    const { time } = req.query;

    let filteredOrders = [];

    const orders = await Order.find({});

    if (time === "all_time") {
      filteredOrders = orders;
    }

    const now = new Date();
    const startOfMonth = getStartOfCurrentMonth();
    const endOfMonth = getEndOfCurrentMonth();
    const startOfYear = getStartOfCurrentYear();
    const endOfYear = getEndOfCurrentYear();
    const startOfLastYear = getStartOfLastYear();
    const endOfLastYear = getEndOfLastYear();
    const startOfLastMonth = getStartOfLastMonth();
    const endOfLastMonth = getEndOfLastMonth();

    if (time === "this_month") {
      filteredOrders = orders.filter(
        (order) =>
          order.order_date >= startOfMonth && order.order_date <= endOfMonth
      );
    }

    if (time === "this_year") {
      filteredOrders = orders.filter(
        (order) =>
          order.order_date >= startOfYear && order.order_date <= endOfYear
      );
    }

    if (time === "last_year") {
      filteredOrders = orders.filter(
        (order) =>
          order.order_date >= startOfLastYear &&
          order.order_date <= endOfLastYear
      );
    }

    if (time === "last_month") {
      filteredOrders = orders.filter(
        (order) =>
          order.order_date >= startOfLastMonth &&
          order.order_date <= endOfLastMonth
      );
    }

    console.log(filteredOrders, "orders");
    res.status(200).json({
      data: {
        msg: "Orders fetched successfully",
        status: true,
        orders: filteredOrders,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      data: {
        msg: "Error fetching orders",
        status: false,
      },
    });
  }
};

const getStartOfCurrentMonth = () =>
  new Date(new Date().getFullYear(), new Date().getMonth(), 1);
const getEndOfCurrentMonth = () =>
  new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

const getStartOfCurrentYear = () => new Date(new Date().getFullYear(), 0, 1);
const getEndOfCurrentYear = () => new Date(new Date().getFullYear(), 11, 31);

const getStartOfLastYear = () => new Date(new Date().getFullYear() - 1, 0, 1);
const getEndOfLastYear = () => new Date(new Date().getFullYear() - 1, 11, 31);

const getStartOfLastMonth = () =>
  new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);
const getEndOfLastMonth = () =>
  new Date(new Date().getFullYear(), new Date().getMonth(), 0);

module.exports = { getAllOrders, getStats, createNewOrder };
