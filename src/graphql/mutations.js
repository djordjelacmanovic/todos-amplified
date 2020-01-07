/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSharedTodo = `mutation CreateSharedTodo(
  $input: CreateSharedTodoInput!
  $condition: ModelSharedTodoConditionInput
) {
  createSharedTodo(input: $input, condition: $condition) {
    id
    title
    text
    owner
    createdAt
    updatedAt
  }
}
`;
export const updateSharedTodo = `mutation UpdateSharedTodo(
  $input: UpdateSharedTodoInput!
  $condition: ModelSharedTodoConditionInput
) {
  updateSharedTodo(input: $input, condition: $condition) {
    id
    title
    text
    owner
    createdAt
    updatedAt
  }
}
`;
export const deleteSharedTodo = `mutation DeleteSharedTodo(
  $input: DeleteSharedTodoInput!
  $condition: ModelSharedTodoConditionInput
) {
  deleteSharedTodo(input: $input, condition: $condition) {
    id
    title
    text
    owner
    createdAt
    updatedAt
  }
}
`;
export const createPrivateTodo = `mutation CreatePrivateTodo(
  $input: CreatePrivateTodoInput!
  $condition: ModelPrivateTodoConditionInput
) {
  createPrivateTodo(input: $input, condition: $condition) {
    id
    title
    text
    createdAt
    updatedAt
    owner
  }
}
`;
export const updatePrivateTodo = `mutation UpdatePrivateTodo(
  $input: UpdatePrivateTodoInput!
  $condition: ModelPrivateTodoConditionInput
) {
  updatePrivateTodo(input: $input, condition: $condition) {
    id
    title
    text
    createdAt
    updatedAt
    owner
  }
}
`;
export const deletePrivateTodo = `mutation DeletePrivateTodo(
  $input: DeletePrivateTodoInput!
  $condition: ModelPrivateTodoConditionInput
) {
  deletePrivateTodo(input: $input, condition: $condition) {
    id
    title
    text
    createdAt
    updatedAt
    owner
  }
}
`;
