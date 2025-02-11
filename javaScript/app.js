const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser'); // Décommentez cette ligne
const { MongoClient } = require("mongodb");
const app = express();
const port = 8080;
const uri = "mongodb+srv://avmannet2202:avmannet@cluster0.ajl8l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

// Middleware pour parser le JSON
app.use(bodyParser.json());
app.use(cors());//tro let in the request from all location not sure;
async function addProduct(product) {
    await client.connect();
    const database = client.db('Store');
    await database.collection('Products').insertOne({
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
  await client.connect();
  const database = client.db('Store');
  const existingProduct = await database.collection('Products').findOne({ 
    productName: product.productName, 
    productId: product.productId });
    return existingProduct !== null;
}
app.post( '/add-item',async (req, res) => {
const { itemCategory , itemId ,itemName, itemDescription, itemPrice, itemQuantity,itemImage } = req.body;
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
    if(await checkIfinDb(product)==1){
      res.status(400).send('Error: Product already exists in your db');
    }else{
      await addProduct(product);
      res.status(200).send('Product added successfully');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding product');
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});