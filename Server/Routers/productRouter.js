const express = require("express");
const productService = require("../Services/productServices.js");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await productService.getAllProducts();

    if (products?.length > 0) {
      return res.status(200).json(products);
    } else {
      return res.status(404).send("No products found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching products");
  }
});

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
    productDescription: itemDescription,
    productPrice: itemPrice,
    productQuantity: itemQuantity,
    productImage: itemImage,
  };
  try {
    if ((await productService.checkIfinDb(product)) === 1) {
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
router.delete("/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    await productService.deleteProduct(productId);
    res.status(200).send("Product deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting product");
  }
});
router.get("/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await productService.getProduct(productId);
    if (product) {
      return res.status(200).json(product);
    } else {
      return res.status(404).send("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching product");
  }
});
router.patch("/update/:productId", async (req, res) => {
  const { productId } = req.params;
  const {
    productCategory,
    productName,
    productDescription,
    productPrice,
    productQuantity,
    productImage,
  } = req.body;
  const product = {
    productCategory,
    productId,
    productName,
    productDescription,
    productPrice,
    productQuantity,
    productImage,
  };
  try {
    await productService.updateProduct(productId, product);
    res.status(200).send("Product updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating product");
  }
});
module.exports = router;
