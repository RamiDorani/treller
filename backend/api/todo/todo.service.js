const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}

async function query(filterBy = {}) {
    //console.log(filterBy);
    const criteria = _buildCriteria(filterBy);
    //console.log(criteria);
    const collection = await dbService.getCollection('todo')
    try {
        const todos = await collection.find(criteria).toArray();
        return _sortTodos(todos.reverse(), filterBy.sortBy)

    } catch (err) {
        console.log('ERROR: cannot find todos')
        throw err;
    }
}

function _sortTodos(todos, sortBy) {
    if (!sortBy) return todos
    return todos.sort((a, b) => {
        return a[sortBy] < b[sortBy] ? -1 : a[sortBy] < b[sortBy] ? 1 : 0;
    })
}

async function getById(todoId) {
    const collection = await dbService.getCollection('todo')
    try {
        const todo = await collection.findOne({
            "_id": ObjectId(todoId)
        })
        return todo
    } catch (err) {
        console.log(`ERROR: while finding todo ${todoId}`)
        throw err;
    }
}

async function remove(todoId) {
    const collection = await dbService.getCollection('todo')
    try {
        await collection.deleteOne({
            "_id": ObjectId(todoId)
        })
    } catch (err) {
        console.log(`ERROR: cannot remove todo ${todoId}`)
        throw err;
    }
}

async function update(todo) {
    const collection = await dbService.getCollection('todo')
    todo._id = ObjectId(todo._id);
    try {
        await collection.replaceOne({
            "_id": todo._id
        }, todo)
        return todo
    } catch (err) {
        console.log(`ERROR: cannot update todo ${todo._id}`)
        throw err;
    }
}

async function add(todo) {
    const collection = await dbService.getCollection('todo')
    try {
        await collection.insertOne(todo)
        return todo;
    } catch (err) {
        console.log(`ERROR: cannot insert todo`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.task) {
        criteria.task = new RegExp(filterBy.task, 'ig');
        //criteria.task = filterBy.task;
    }

    if (filterBy.importancy) {
        criteria.importancy = filterBy.importancy;
    }
    return criteria;
}