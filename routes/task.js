  const express = require(`express`);
  const  TaskController  = require("../controllers").TaskController;

  const router = express.Router();

  router.post("/", TaskController.addTask);
  router.get("/", TaskController.getAllTasks);
  router.get("/:id", TaskController.getTaskById);
  router.delete("/:id", TaskController.deleteTask);
  router.post("/update/:updateId", TaskController.updateTask);
  router.post("/terminat/:id", TaskController.taskTerminat);

  module.exports = router;