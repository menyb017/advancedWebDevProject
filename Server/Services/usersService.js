const bcrypt = require("bcrypt");
const dbConnection = require("../dbConnection.js");

async function checkIfUserInDb(username) {
  const dbUsers = dbConnection.getDB();

  const foundUser = await dbUsers.collection("users").findOne({ username });

  return foundUser ? true : false;
}

async function authenticateUser(username, password) {
  const dbUsers = dbConnection.getDB();
  const foundUser = await dbUsers.collection("users").findOne({ username });

  if (!foundUser) {
    return false;
  }

  return await bcrypt.compare(password, foundUser.password);
}
async function authenticateSuperAdmin(username, password) {
  const dbUsers = dbConnection.getDB();
  const foundUser = await dbUsers.collection("superAdmin").findOne({ username });

  if (!foundUser) {
    return false;
  }

  return await bcrypt.compare(password, foundUser.password);
}

async function addUserToDB(username, password) {
  const dbUsers = dbConnection.getDB();
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  await dbUsers.collection("users").insertOne({
    username: username,
    password: hashedPassword,
  });
}

module.exports = { checkIfUserInDb, addUserToDB, authenticateUser,authenticateSuperAdmin };
