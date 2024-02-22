const express = require(`express`);

const router = express.Router();

const UserController = require(`../controllers`).UserController;

router.post("/add", UserController.addUser);
router.get("/getAll", UserController.getAllUsers);
router.get("/getId/:id", UserController.getUserById);
router.delete("/:id", UserController.deleteUser);
router.post("/update/:updateId", UserController.updateUser);
router.post("/login/", UserController.login);

module.exports = router;