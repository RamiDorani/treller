const todoService = require('./todo.service')
const logger = require('../../services/logger.service')

module.exports = {
  getTodo,
  getTodos,
  deleteTodo,
  updateTodo,
  addTodo
}

async function getTodo(req, res) {
  const todo = await todoService.getById(req.params.id)
  res.send(todo)
}


async function getTodos(req, res) {
  const todos = await todoService.query(req.query)
  logger.debug(todos);
  res.send(todos)
}

async function deleteTodo(req, res) {
  await todoService.remove(req.params.id)
  res.end()
}

async function updateTodo(req, res) {
  const todo = req.body;
  await todoService.update(todo)
  res.send(todo)
}

async function addTodo(req, res) {
  const todo = req.body;
  await todoService.add(todo)
  res.send(todo)
}