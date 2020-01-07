import React from "react";
import "./App.css";

import PrivateTodos from "./Todo/PrivateTodos";
import SharedTodos from "./Todo/SharedTodos";
import Amplify from "aws-amplify";
import API from "@aws-amplify/api";
import PubSub from "@aws-amplify/pubsub";
import awsconfig from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react";
import { Paper, Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import AddNewTodo from "./Todo/AddNewTodo";

Amplify.configure(awsconfig);
API.configure(awsconfig);
PubSub.configure(awsconfig);

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
