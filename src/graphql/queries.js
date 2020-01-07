/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSharedTodo = `query GetSharedTodo($id: ID!) {
  getSharedTodo(id: $id) {
    id
    title
    text
    owner
    createdAt
    updatedAt
  }
}
`;
export const listSharedTodos = `query ListSharedTodos(
  $filter: ModelSharedTodoFilterInput
  $limit: Int
  $nextToken: String
) {
  listSharedTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      text
      owner
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
export const getPrivateTodo = `query GetPrivateTodo($id: ID!) {
  getPrivateTodo(id: $id) {
    id
    title
    text
    createdAt
    updatedAt
    owner
  }
}
`;
export const listPrivateTodos = `query ListPrivateTodos(
  $filter: ModelPrivateTodoFilterInput
  $limit: Int
  $nextToken: String
) {
  listPrivateTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      text
      createdAt
      updatedAt
      owner
    }
    nextToken
  }
}
`;
