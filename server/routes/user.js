const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

router.get("", userController.index);
router.post("", userController.find);
router.get("/addUser", userController.add_user);
router.post("/create_user", userController.create_user);
router.get("/edit_user/:id", userController.edit_user);
router.post("/update_user/:id", userController.update_user);
router.get("/destroy_user/:id", userController.delete_user);

module.exports = router;
