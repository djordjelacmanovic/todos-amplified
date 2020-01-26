import Api from "utils/api";

import { listSharedTodos as listOperation } from "graphql/queries";
import {
  deleteSharedTodo as deleteOperation,
  createSharedTodo as createOperation
} from "graphql/mutations";
import AuthService from "utils/auth";

import SharedTodo from "models/Todo/SharedTodo";

const listSharedTodos = async () => {
  const {
    data: {
      listSharedTodos: { items: todos }
    }
  } = await Api.graphql(listOperation);
  const currentUser = await AuthService.getCurrentUsername();
  return todos.map(todo => new SharedTodo(todo, todo.owner === currentUser));
};

const deleteSharedTodo = async id =>
  await Api.graphql(deleteOperation, { input: { id } });

const createSharedTodo = async ({ title, text }) =>
  await Api.graphql(createOperation, { input: { title, text } });

export { listSharedTodos, deleteSharedTodo, createSharedTodo };
