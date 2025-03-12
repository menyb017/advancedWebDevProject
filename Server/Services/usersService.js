const bcrypt = require("bcrypt");
const dbConnection = require("../dbConnection.js");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "this_is_the_secret_key";

//----------------------------------------
async function attributeToken(username) {
  const dbUsers = dbConnection.getDB();
  const user = await dbUsers.collection('users').findOne({ username });
  const superAdmin = await dbUsers.collection('superAdmin').findOne({ username });
  if (superAdmin) {
    const token = jwt.sign({ id: superAdmin._id, username: superAdmin.username ,role:superAdmin.role}, SECRET_KEY, { expiresIn: '1h' });
    await dbUsers.collection('superAdmin').updateOne({ username }, { $set: { token } });
    return token;
  }
  if (user) {
    const token = jwt.sign({ id: user._id, username: user.username,role:user.role }, SECRET_KEY, { expiresIn: '1h' });
    await dbUsers.collection('users').updateOne({ username }, { $set: { token } });
    return token;
  }
  throw new Error('User not found');
}
//----------------------------------------
async function checkToken(token) {
  try {
    const decodedToken = jwt.decode(token);
    const db = dbConnection.getDB();
    const userRole = decodedToken.role;
    // console.log("decodedToken:"+ decodedToken);
    // console.log("decodedToken.id:"+ decodedToken.id);
    // console.log("user:"+ user);
    // console.log("superAdmin:"+superAdmin);
    if (userRole == 'user') {
      return 'user';
      console.log("enter in user");
    } 
    // console.log(superAdmin);
    if (userRole == 'superAdmin') {
      return 'superAdmin';
      console.log("enter in superAdmin");
    } 
    else {
      return "invalid";
    }
  } catch (error) {
    console.error('Invalid token:', error);
    return "invalid";
  }
}

//----------------------------------------
async function checkValidyToken(token) {
    const decodedToken = jwt.decode(token);
    const currentTime = (Date.now() / 1000); 

    if(decodedToken.exp < currentTime){
      return false;
    }else{
      return true;
    } 
}

//----------------------------------------


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
  else{
    return await bcrypt.compare(password, foundUser.password);
  }
}
async function authenticateSuperAdmin(username, password) {
  const dbUsers = dbConnection.getDB();
  const foundUser = await dbUsers.collection("superAdmin").findOne({ username });

  if (!foundUser) {
    return false;
  }
  else{
    return await bcrypt.compare(password, foundUser.password);
  }

}

async function addUserToDB(username, password) {
  const dbUsers = dbConnection.getDB();
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  await dbUsers.collection("users").insertOne({
    username: username,
    password: hashedPassword,
    role: "user",
  });
}
async function getAllUsers() {
  try {
    const dbUsers = dbConnection.getDB();
    const users = await dbUsers.collection("users").find().toArray();
    return users;
  } catch (error) {
    console.error("Error retrieving users:", error);
    throw error;
  }
}
async function deleteUser(username) {
  try {
    const dbUsers = dbConnection.getDB();
    await dbUsers.collection("users").deleteOne({ username });
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}
module.exports = { checkIfUserInDb, addUserToDB, authenticateUser,authenticateSuperAdmin, getAllUsers ,deleteUser,attributeToken,checkToken,checkValidyToken};
