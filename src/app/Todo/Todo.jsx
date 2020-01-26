import React from "react";
import moment from "moment";
import Linkify from "react-linkify";

import {
  Grid,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Button,
  Typography
} from "@material-ui/core";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";

const Todo = props => {
  const date = moment(props.createdAt).fromNow();
  const onDelete = () => props.onDelete(props.id);
  return (
    <Card id={`todo-${props.id}`} variant="outlined">
      <CardHeader title={props.title} />
      <CardContent>
        <Typography variant="body2" component="p">
          <Linkify>{props.text}</Linkify>
        </Typography>
      </CardContent>
      <CardActions>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Typography color="textSecondary">
            <i>{date.toLocaleString()}</i> -{" "}
            <strong>{props.isOwner ? "you" : props.owner}</strong>
          </Typography>
          <Button
            onClick={onDelete}
            size="small"
            color="secondary"
            disabled={!props.isOwner}
          >
            <DeleteForeverOutlinedIcon />
          </Button>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default Todo;
