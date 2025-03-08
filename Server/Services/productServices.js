const dbConnection = require("../dbConnection.js");

async function getAllProducts() {
  const database = dbConnection.getDB();
  const products = await database.collection("Products").find().toArray();
  if (products.length > 0) return products;
  else return null;
}
async function getProductById(productId) {
  const database = dbConnection.getDB();
  const product = await database.collection("Products").findOne({ productId });
  return product;
}

async function addProduct(product) {
  const database = dbConnection.getDB();
  await database.collection("Products").insertOne({
    productCategory: product.productCategory,
    productId: product.productId,
    productName: product.productName,
    productDescription: product.productDescription,
    productPrice: product.productPrice,
    productQuantity: product.productQuantity,
    productImage: product.productImage,

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
async function deleteProduct(productId) {
  const database = dbConnection.getDB();
  await database.collection("Products").deleteOne({productId});
}
async function updateProduct(productId, product) {
  const database = dbConnection.getDB();
  await database.collection("Products").updateOne(
    { productId: productId },
    {
      $set: {
        productCategory: product.productCategory,
        productName: product.productName,
        productDescription: product.productDescription,
        productPrice: product.productPrice,
        productQuantity: product.productQuantity,
        productImage: product.productImage,
      },
    }
  );
}
module.exports = { checkIfinDb, addProduct, getAllProducts, deleteProduct, updateProduct,getProductById };
