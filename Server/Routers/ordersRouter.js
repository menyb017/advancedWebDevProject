const express = require("express");
const nodemailer = require("nodemailer");
const orderService = require("../Services/orderService.js");
const router = express.Router();

// Nodemailer Transporter Configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "batchen.zion100@gmail.com", // Replace with your email
    pass: "tspvykiiyvjmqpdd", // Replace with your app password
  },
});

router.get("/", async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    if (orders?.length > 0) {
      return res.status(200).json(orders);
    } else {
      return res.status(404).send("No orders found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching orders");
  }
});

router.post("/addOrder", async (req, res) => {
  const {
    user,
    orderItems,
    shippingState,
    shippingCity,
    shippingAddress,
    shippingZipCode,
    itemsPrice,
    totalPrice,
    email,
  } = req.body;

  const order = {
    user: user,
    orderItems: orderItems,
    shippingState: shippingState,
    shippingCity: shippingCity,
    shippingAddress: shippingAddress,
    shippingZipCode: shippingZipCode,
    itemsPrice: itemsPrice,
    totalPrice: totalPrice,
    email: email,
  };

  try {
    await orderService.addOrder(order);

    // Email Content
    const mailOptions = {
      from: "batchen.zion100@gmail.com",
      to: email,
      subject: "Order Confirmation",
      html: `
        <h2>Order Confirmation</h2>
        <p>Dear ${user},</p>
        <p>Thank you for your order!</p>
        <h3>Order Details:</h3>
        <ul>
          ${orderItems
            .map(
              (item) => `
            <li>${item.productName} - Quantity: ${item.selectedQuantity} - Price: $${item.productPrice}</li>
          `
            )
            .join("")}  
        </ul>
        <p><strong>Total Price:</strong> $${totalPrice}</p>
        <h3>Shipping Address:</h3>
        <p>${shippingAddress}, ${shippingCity}, ${shippingState}, ${shippingZipCode}</p>
        <p>We will notify you when your order ships.</p>
      `,
    };

    // Send Email
    await transporter.sendMail(mailOptions);

    return res
      .status(200)
      .json({ message: "Order added successfully and email sent" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Error adding order or sending email" });
  }
});

module.exports = router;
