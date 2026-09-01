const Todo = require("../model/Todo");

//Add a new todo
const createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res
        .status(400)
        .json({ message: "Title is required", success: false });
    }
    const todo = await Todo.create({ title });
    res.status(201).json({
      data: todo,
      success: true,
      message: "Todo created successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

//Get all todos
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    return res.status(200).json({
      data: todos,
      success: true,
      message: "Todos fetched successfully",
      count: todos.length,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

//Get a single todo
const getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res
        .status(404)
        .json({ message: "Todo not found", success: false });
    }
    return res.status(200).json({
      data: todo,
      success: true,
      message: "Todo fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

//update a todo
const updatetodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!todo) {
      return res
        .status(404)
        .json({ message: "Todo not found", success: false });
    }
    return res.status(200).json({
      data: todo,
      success: true,
      message: "Todo updated successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

//delete a todo
const deletetodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res
        .status(404)
        .json({ message: "Todo not found", success: false });
    }
    return res.status(200).json({
      data: todo,
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = { createTodo, getTodos, getTodo, updatetodo, deletetodo };
