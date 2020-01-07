import React, { useReducer, useEffect } from 'react';
import TodoList from './TodoList';
import { onCreatePrivateTodo, onDeletePrivateTodo } from '../graphql/subscriptions';
import { listPrivateTodos } from '../graphql/queries';
import { deletePrivateTodo } from '../graphql/mutations';
import API, { graphqlOperation } from '@aws-amplify/api';
import reducer, { ON_CREATE, QUERY, ON_DELETE } from './todo-reducer';
import { getCurrentUsername } from '../lib/get-current-user';

let createSubscription, deleteSubscription;

const PrivateTodos = () => {
  const [todos, dispatch] = useReducer(reducer, []);
  const onDeleteTodo = async (id) => {
    console.log(`delete private ${id}`);
    await deleteTodo(id);
    console.log(`deleted private ${id}`);
  }
  useEffect(() => {
    const load = async () => dispatch(
      {
        type: QUERY, 
        todos: await loadPrivateTodos() 
      });
    load();

    const subscribe = async () => {
      const currentUser = await getCurrentUsername();
      createSubscription = API.graphql(graphqlOperation(onCreatePrivateTodo, {
        owner: currentUser
      })).subscribe({
        next: (eventData) => {
          const privateTodo = eventData.value.data.onCreatePrivateTodo;
          dispatch({type: ON_CREATE, todo: privateTodo });
        }
      });
      deleteSubscription = API.graphql(graphqlOperation(onDeletePrivateTodo, {
        owner: currentUser
      })).subscribe({
        next: (eventData) => {
          const deletedTodo = eventData.value.data.onDeletePrivateTodo;
          dispatch({type: ON_DELETE, todo: deletedTodo });
        }
      })
    }

    subscribe();

    return () => { 
      createSubscription && createSubscription.unsubscribe(); 
      deleteSubscription && deleteSubscription.unsubscribe();
    }
  }, []);

  return <TodoList onDelete={onDeleteTodo} name="Private" todos={todos}/>
}

async function loadPrivateTodos(){
  const result = await API.graphql(graphqlOperation(listPrivateTodos));
  return result.data.listPrivateTodos.items.map(todo => ({...todo, isOwner: true}));
}

async function deleteTodo(id){
  await API.graphql(graphqlOperation(deletePrivateTodo, {
    input: {
      id
    }
  }));
}

export default PrivateTodos;