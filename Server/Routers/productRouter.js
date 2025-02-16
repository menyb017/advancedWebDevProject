const express = require("express");
const productService = require("../Services/productServices.js");
const router = express.Router();

router.post("/addProduct", async (req, res) => {
  const {
    itemCategory,
    itemId,
    itemName,
    itemDescription,
    itemPrice,
    itemQuantity,
    itemImage,
  } = req.body;
  const product = {
    productCategory: itemCategory,
    productId: itemId,
    productName: itemName,
    itemDescription: itemDescription,
    productPrice: itemPrice,
    itemQuantity: itemQuantity,
    itemImage: itemImage,
  };
  try {
    if ((await productService.checkIfinDb(product)) == 1) {
      res.status(409).send("Error: Product already exists in your db");
    } else {
      await productService.addProduct(product);
      res.status(200).send("Product added successfully");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding product");
  }
});

module.exports = router;
