const dbConnection = require("../dbConnection.js");

const getAllOrders = async () => {
  const database = dbConnection.getDB();
  return await database.collection("Orders").find().toArray();
};

const addOrder = async (order) => {
  const database = dbConnection.getDB();
  await database.collection("Orders").insertOne({
    user: order.user,
    orderItems: order.orderItems,
    shippingState: order.shippingState,
    shippingCity: order.shippingCity,
    shippingAddress: order.shippingAddress,
    shippingZipCode: order.shippingZipCode,
    email: order.email,
    itemsPrice: order.itemsPrice,
    totalPrice: order.totalPrice,
  });
};

const deleteOrder = async (orderId) => {
  const database = dbConnection.getDB();
  await database.collection("Orders").deleteOne({ orderId });
};

module.exports = { getAllOrders, addOrder, deleteOrder };
