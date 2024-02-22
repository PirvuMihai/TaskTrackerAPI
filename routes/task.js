  const express = require(`express`);
  const  TaskController  = require("../controllers").TaskController;

  const router = express.Router();

  router.post("/add", TaskController.addTask);
  router.get("/getAll", TaskController.getAllTasks);
  router.get("/getTask/:id", TaskController.getTaskById);
  router.delete("/:id", TaskController.deleteTask);
  router.post("/update/:updateId", TaskController.updateTask);
  router.post("/terminat/:id", TaskController.taskTerminat);
  router.get("/unfinished", TaskController.getAllUnfinishedTasks);

  module.exports = router;