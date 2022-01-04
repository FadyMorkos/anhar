const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: false,
  },
  iid: {
    type: String,
    required: false,
  },
  iname: {
    type: String,
    required: false,
  },
  qty: {
    type: String,
    required: true,
  },
});
const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;