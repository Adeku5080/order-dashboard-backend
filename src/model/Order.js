const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    order_number: {
      type: String,
    },
    customer_name: {
      type: String,
      required: true,
    },
    product_name: {
      type: String,
      required: true,
    },
    product_category: {
      type: String,
      required: [true, "Please provide a product category"],
      enum: ["Sci-Fi", "Drama", "Comedy", "Horror", "Docu"],
    },
    price: {
      type: String,
      required: true,
    },
    order_date: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
