const express = require(`express`);

const router = express.Router();

const UserController = require(`../controllers`).UserController;

router.post("/", UserController.addUser);
router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
router.delete("/:id", UserController.deleteUser);
router.post("/update/:updateId", UserController.updateUser);
router.post("/login/", UserController.login);

module.exports = router;