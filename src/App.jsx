import React from "react";

import API from "@aws-amplify/api";
import Auth from "@aws-amplify/auth";
import awsConfig from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react";

import PrivateTodos from "./app/Todo/PrivateTodos";
import SharedTodos from "./app/Todo/SharedTodos";

import { Paper, Typography, Grid } from "@material-ui/core";
import AddNewTodo from "./app/Todo/AddNewTodo";

API.configure(awsConfig);
Auth.configure(awsConfig);

const App = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>
            <Typography align="center" variant="h2">
              Todos Amplified!
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="baseline"
          >
            <Grid item xs={11} sm={5}>
              <PrivateTodos />
            </Grid>
            <Grid item xs={11} sm={5}>
              <SharedTodos />
            </Grid>
          </Grid>
          <AddNewTodo />
        </Grid>
      </Grid>
    </>
  );
};

export default withAuthenticator(App, true);
