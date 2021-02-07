import { todoService } from '../../services/todoService';


export function loadTodos(filterBy) {
    return async dispatch => {
        //console.log('action file',filterBy);
        const todos = await todoService.query(filterBy);
        dispatch({ type: 'SET_TODOS', todos })
    }
}

export function removeTodo(todoId) {
    return async dispatch => {
        await todoService.remove(todoId)
        dispatch({ type: 'REMOVE_TODO', todoId })
    }
}


export function saveTodo(todo) {
    return async dispatch => {
        const actionType = todo._id ? 'UPDATE_TODO' : 'ADD_TODO';
        todo = await todoService.save(todo)
         dispatch({ type: actionType, todo })
    }
}