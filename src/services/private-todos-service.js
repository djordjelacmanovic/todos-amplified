import Api from "utils/api";

import { listPrivateTodos as listOperation } from "graphql/queries";
import {
  deletePrivateTodo as deleteOperation,
  createPrivateTodo as createOperation
} from "graphql/mutations";
import PrivateTodo from "models/Todo/PrivateTodo";

const getPrivateTodos = async () => {
  const {
    data: {
      listPrivateTodos: { items: todos }
    }
  } = await Api.graphql(listOperation);
  return todos.map(todo => new PrivateTodo(todo));
};

const deletePrivateTodo = async id => {
  await Api.graphql(deleteOperation, {
    input: {
      id
    }
  });
};

const createPrivateTodo = async ({ title, text }) => {
  await Api.graphql(createOperation, {
    input: {
      title,
      text
    }
  });
};

export { getPrivateTodos, deletePrivateTodo, createPrivateTodo };
