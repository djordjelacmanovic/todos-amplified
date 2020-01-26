import React, { useReducer, useEffect } from "react";
import TodoList from "./TodoList";
import {
  onCreatePrivateTodo,
  onDeletePrivateTodo
} from "graphql/subscriptions";
import API, { graphqlOperation } from "@aws-amplify/api";
import reducer, { ON_CREATE, QUERY, ON_DELETE } from "./todo-reducer";
import AuthService from "utils/auth";
import {
  getPrivateTodos,
  deletePrivateTodo
} from "services/private-todos-service";

let createSubscription, deleteSubscription;

const PrivateTodos = () => {
  const [todos, dispatch] = useReducer(reducer, []);

  const onDeleteTodo = async id => {
    console.log(`delete private ${id}`);
    await deletePrivateTodo(id);
    console.log(`deleted private ${id}`);
  };

  useEffect(() => {
    const load = async () =>
      dispatch({
        type: QUERY,
        todos: await getPrivateTodos()
      });
    load();

    const subscribe = async () => {
      const currentUser = await AuthService.getCurrentUsername();
      createSubscription = API.graphql(
        graphqlOperation(onCreatePrivateTodo, {
          owner: currentUser
        })
      ).subscribe({
        next: eventData => {
          const privateTodo = eventData.value.data.onCreatePrivateTodo;
          dispatch({
            type: ON_CREATE,
            todo: { ...privateTodo, isOwner: true }
          });
        }
      });
      deleteSubscription = API.graphql(
        graphqlOperation(onDeletePrivateTodo, {
          owner: currentUser
        })
      ).subscribe({
        next: eventData => {
          const deletedTodo = eventData.value.data.onDeletePrivateTodo;
          dispatch({ type: ON_DELETE, todo: deletedTodo });
        }
      });
    };

    subscribe();

    return () => {
      createSubscription && createSubscription.unsubscribe();
      deleteSubscription && deleteSubscription.unsubscribe();
    };
  }, []);

  return <TodoList onDelete={onDeleteTodo} name="Private" todos={todos} />;
};

export default PrivateTodos;
