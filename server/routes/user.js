const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

router.get("", userController.index);
router.post("", userController.find);
router.get("/addUser", userController.add_user);
router.post("/create_user", userController.create_user);

module.exports = router;
