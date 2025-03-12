const express = require("express");
const usersService = require("../Services/usersService.js");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await usersService.getAllUsers();

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching users");
  }
});

router.post("/addUser", async (req, res) => {
  const { username, password } = req.body;

  try {
    const userExists = await usersService.checkIfUserInDb(username);
    if (userExists) {
      return res
        .status(409)
        .json({ message: "The user already exists in DB!" });
    }

    await usersService.addUserToDB(username, password);
    return res
      .status(200)
      .json({ message: "User has been successfully added to DB!" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding user");
  }
});


router.get("/users", async (req, res) => {
  try {
    const users = await usersService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).send("Error getting users");
  }
});

router.delete("/users/:username", async (req, res) => {
  const { username } = req.params;
  try {
    await usersService.deleteUser(username);
    res.status(200).send("User deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting user");
  }
});

router.post("/authenticateUser", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userValid = await usersService.authenticateUser(username, password);
    const superAdminValid = await usersService.authenticateSuperAdmin(username, password);
    if (superAdminValid) {
      const token = await usersService.attributeToken(username);
      return res.status(200).json({ message: "Super Admin authenticated", token });
    }
    if (userValid) {
      const token = await usersService.attributeToken(username);
      return res.status(200).json({ message: "User authenticated", token });
    } else {
      return res.status(400).json({ message: "Invalid user or password!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error authenticating user");
  }
});

router.post("/verifyToken", async (req, res) => {
  const { token } = req.body;
  try {
    const role = await usersService.checkToken(token);
    const validToken =await usersService.checkValidyToken(token);
    if (role == 'user'&& validToken) {
      return res.status(200).json({ message: "user" });
    } 
    else if (role == 'superAdmin'&& validToken) {
      return res.status(200).json({ message: "superAdmin" });
    } 
    else {
      return res.status(200).json({ message: "Invalid token" });
    }

  } catch (error) {
    console.error(error);
    res.status(500).send("Error verifying token");
  }
});

module.exports = router;
