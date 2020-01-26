import React from "react";
import Todo from "./Todo";
import { Paper, Divider, Grid, Typography } from "@material-ui/core";

const TodoList = props => {
  const hasTodos = props.todos && props.todos.length;
  return (
    <Paper>
      <Typography variant="h5" align="center">
        {props.name}
      </Typography>
      <Divider />
      <Grid
        container
        direction="column"
        justify="space-evenly"
        alignItems="stretch"
      >
        {hasTodos ? (
          props.todos.sort(compareTodos).map(todo => (
            <Grid key={todo.id} item xs={12}>
              <Todo onDelete={props.onDelete} {...todo} />
              <Divider />
            </Grid>
          ))
        ) : (
          <Typography align="center">
            No Todos here{" "}
            <span role="img" aria-label="sad">
              😕
            </span>
          </Typography>
        )}
      </Grid>
    </Paper>
  );
};

function compareTodos(a, b) {
  if (b.createdAt < a.createdAt) {
    return -1;
  }
  if (b.createdAt > a.createdAt) {
    return 1;
  }
  return 0;
}

export default TodoList;
