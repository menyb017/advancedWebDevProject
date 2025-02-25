const dbConnection = require("../dbConnection.js");

async function getAllProducts() {
  const database = dbConnection.getDB();
  const products = await database.collection("Products").find().toArray();
  if (products.length > 0) return products;
  else return null;
}

async function addProduct(product) {
  const database = dbConnection.getDB();
  await database.collection("Products").insertOne({
    productCategory: product.productCategory,
    productId: product.productId,
    productName: product.productName,
    itemDescription: product.itemDescription,
    productPrice: product.productPrice,
    itemQuantity: product.itemQuantity,
    itemImage: product.itemImage,
  });
}

async function checkIfinDb(product) {
  const database = dbConnection.getDB();
  const existingProduct = await database.collection("Products").findOne({
    productName: product.productName,
    productId: product.productId,
  });
  return existingProduct !== null;
}

module.exports = { checkIfinDb, addProduct, getAllProducts };
