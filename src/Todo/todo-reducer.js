const QUERY = 'QUERY';
const ON_CREATE = 'ON_CREATE';
const ON_DELETE = 'ON_DELETE';

const reducer = (todos, action) => {
  switch (action.type) {
    case QUERY:
      return action.todos;
    case ON_CREATE:
      return [action.todo, ...todos];
    case ON_DELETE:
      return todos.filter(x => x.id !== action.todo.id);
    default:
      return todos;
  }
};

export default reducer;
export {
  QUERY,
  ON_CREATE,
  ON_DELETE
};