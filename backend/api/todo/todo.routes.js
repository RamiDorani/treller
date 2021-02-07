const express = require('express')
// const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getTodo, getTodos, deleteTodo, updateTodo,addTodo } = require('./todo.controller')
const router = express.Router()


router.get('/', getTodos)
router.get('/:id', getTodo)
router.put('/:id', updateTodo)
router.post('/', addTodo)
router.delete('/:id', deleteTodo)


module.exports = router