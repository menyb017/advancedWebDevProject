const express = require("express");
const cors = require("cors");
const dbConnection = require("./dbConnection.js");
const productRouter = require("../Server/Routers/productRouter.js");
const usersRouter = require("./Routers/usersRouter.js");
const port = 8080;

const app = express();
app.use(express.json());
app.use(cors());
app.use(usersRouter);
dbConnection
  .connectToDB()
  .then(() => {
    console.log("MongoDB connection established successfully!");

    app.use("/products", productRouter);
    app.use("/users", usersRouter);
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  });
