import React, { useReducer, useEffect } from 'react';
import { listSharedTodos } from '../graphql/queries';
import { deleteSharedTodo } from '../graphql/mutations';
import { onCreateSharedTodo, onDeleteSharedTodo } from '../graphql/subscriptions';
import API, { graphqlOperation } from '@aws-amplify/api';
import TodoList from './TodoList';
import reducer, { ON_CREATE, QUERY, ON_DELETE } from './todo-reducer';
import { getCurrentUsername } from '../lib/get-current-user';

const SharedTodos = () => {
  const [todos, dispatch] = useReducer(reducer, []);
  const onDeleteTodo = async (id) => { 
    console.log(`delete shared ${id}`);
    await deleteTodo(id);
    console.log(`deleted shared ${id}`);
  };

  useEffect(() => {
    const load = async () => dispatch(
      {
        type: QUERY, 
        todos: await loadSharedTodos() 
      });
    load();

    const createSubscription = API.graphql(graphqlOperation(onCreateSharedTodo)).subscribe({
      next: async (eventData) => {
        const sharedTodo = eventData.value.data.onCreateSharedTodo;
        const currentUsername = await getCurrentUsername();
        dispatch({type: ON_CREATE, todo: { ...sharedTodo, isOwner: sharedTodo.owner === currentUsername } });
      }
    });

    const deleteSubscription = API.graphql(graphqlOperation(onDeleteSharedTodo)).subscribe({
      next: (eventData) => {
        const deletedTodo = eventData.value.data.onDeleteSharedTodo;
        dispatch({type: ON_DELETE, todo: deletedTodo });
      }
    });

    return () => {
      createSubscription.unsubscribe();
      deleteSubscription.unsubscribe();
    }
  }, []);

  return <TodoList onDelete={onDeleteTodo} name="Shared" todos={todos} />
}

async function loadSharedTodos(){
  const result = await API.graphql(graphqlOperation(listSharedTodos));
  const currentUser = await getCurrentUsername();
  return result.data.listSharedTodos.items.map(todo => ({...todo, isOwner: todo.owner === currentUser }));
}

async function deleteTodo(id){
  await API.graphql(graphqlOperation(deleteSharedTodo, { input: { id }}));
}

export default SharedTodos;