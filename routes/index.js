const express = require(`express`);
const router = express.Router();

const UserRouter = require(`./user`);
const TaskRouter = require(`./task`);

router.use(`/user`, UserRouter);
router.use(`/task`, TaskRouter);

module.exports = router;