const initialState = {
    todos: null,
  }


  export function todoReducer(state = initialState, action) {
    switch (action.type) {
  
      case 'SET_TODOS':
        return {
          ...state,
          todos: action.todos
        }

        case 'REMOVE_TODO':
      return { ...state, todos: state.todos.filter(todo => todo._id !== action.todoId) }

      case 'UPDATE_TODO':
      const idx = state.todos.findIndex(todo => todo._id === action.todo._id)
      const updatedTodos = [...state.todos]
      updatedTodos[idx] = action.todo
      return { ...state, todos: updatedTodos }

      case 'ADD_TODO':
      return { todos: [...state.todos, action.todo], ...state }


      default:
        return state
    }
  }