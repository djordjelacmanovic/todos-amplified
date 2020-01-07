/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSharedTodo = `subscription OnCreateSharedTodo {
  onCreateSharedTodo {
    id
    title
    text
    owner
    createdAt
    updatedAt
  }
}
`;
export const onUpdateSharedTodo = `subscription OnUpdateSharedTodo {
  onUpdateSharedTodo {
    id
    title
    text
    owner
    createdAt
    updatedAt
  }
}
`;
export const onDeleteSharedTodo = `subscription OnDeleteSharedTodo {
  onDeleteSharedTodo {
    id
    title
    text
    owner
    createdAt
    updatedAt
  }
}
`;
export const onCreatePrivateTodo = `subscription OnCreatePrivateTodo($owner: String!) {
  onCreatePrivateTodo(owner: $owner) {
    id
    title
    text
    createdAt
    updatedAt
    owner
  }
}
`;
export const onUpdatePrivateTodo = `subscription OnUpdatePrivateTodo($owner: String!) {
  onUpdatePrivateTodo(owner: $owner) {
    id
    title
    text
    createdAt
    updatedAt
    owner
  }
}
`;
export const onDeletePrivateTodo = `subscription OnDeletePrivateTodo($owner: String!) {
  onDeletePrivateTodo(owner: $owner) {
    id
    title
    text
    createdAt
    updatedAt
    owner
  }
}
`;
