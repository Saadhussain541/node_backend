const express = require("express");
const router = express.Router();

const {
  createTodo,
  getTodos,
  getTodo,
  updatetodo,
  deletetodo,
} = require("../controller/todoController");

router.post("/", createTodo);
router.get("/", getTodos);
router.get("/:id", getTodo);
router.put("/:id", updatetodo);
router.delete("/:id", deletetodo);

module.exports = router;
