export default function todoReducer(prevState, action) {
  switch (action.type) {
    case "SHOW_TODO_CREATE_MODAL": {
      return {
        ...prevState,
        openTodoCreateModal: !action.payload,
      };
    }

    case "SET_TODOS": {
      return {
        ...prevState,
        todos: action.payload.todos,
      };
    }

    case "ADD_TODO": {
      return {
        ...prevState,
        todos: prevState.todos.concat(action.payload.todo),
      };
    }

    case "DELETE_TODO": {
      return {
        ...prevState,
        todos: prevState.todos.filter(
          (todo) => todo.id !== action.payload.todoId
        ),
      };
    }

    default: {
      return prevState;
    }
  }
}
