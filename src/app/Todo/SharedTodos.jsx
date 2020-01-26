import React, { useReducer, useEffect } from "react";
import { onCreateSharedTodo, onDeleteSharedTodo } from "graphql/subscriptions";
import API, { graphqlOperation } from "@aws-amplify/api";
import TodoList from "./TodoList";
import reducer, { ON_CREATE, QUERY, ON_DELETE } from "./todo-reducer";
import AuthService from "utils/auth";
import {
  deleteSharedTodo,
  listSharedTodos
} from "services/shared-todos-service";

const SharedTodos = () => {
  const [todos, dispatch] = useReducer(reducer, []);
  const onDeleteTodo = async id => {
    console.log(`delete shared ${id}`);
    await deleteSharedTodo(id);
    console.log(`deleted shared ${id}`);
  };

  useEffect(() => {
    const load = async () =>
      dispatch({
        type: QUERY,
        todos: await listSharedTodos()
      });
    load();

    const createSubscription = API.graphql(
      graphqlOperation(onCreateSharedTodo)
    ).subscribe({
      next: async eventData => {
        const sharedTodo = eventData.value.data.onCreateSharedTodo;
        const currentUsername = await AuthService.getCurrentUsername();
        dispatch({
          type: ON_CREATE,
          todo: { ...sharedTodo, isOwner: sharedTodo.owner === currentUsername }
        });
      }
    });

    const deleteSubscription = API.graphql(
      graphqlOperation(onDeleteSharedTodo)
    ).subscribe({
      next: eventData => {
        const deletedTodo = eventData.value.data.onDeleteSharedTodo;
        dispatch({ type: ON_DELETE, todo: deletedTodo });
      }
    });

    return () => {
      createSubscription.unsubscribe();
      deleteSubscription.unsubscribe();
    };
  }, []);

  return <TodoList onDelete={onDeleteTodo} name="Shared" todos={todos} />;
};

export default SharedTodos;
