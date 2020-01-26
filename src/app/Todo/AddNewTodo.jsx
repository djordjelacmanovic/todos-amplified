import React, { useState } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import {
  Button,
  TextField,
  Fab,
  FormGroup,
  FormControlLabel,
  Switch,
  useTheme,
  IconButton
} from "@material-ui/core";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import { createSharedTodo } from "services/shared-todos-service";
import { createPrivateTodo } from "services/private-todos-service";

const fabStyle = {
  margin: 0,
  top: "auto",
  right: 20,
  bottom: 20,
  left: "auto",
  position: "fixed"
};

const initialFormData = {
  isShared: false,
  inputText: ""
};

const AddNewTodo = () => {
  const theme = useTheme();
  const fullScreenDialog = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const [isSnackOpen, setSnackIsOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const snackOpen = () => setSnackIsOpen(true);
  const snackClose = () => setSnackIsOpen(false);

  const handleFabClick = () => setOpen(true);
  const close = () => setOpen(false);
  const handleCancel = () => {
    resetFormData();
    close();
  };
  const resetFormData = () => setFormData(initialFormData);
  const handleAdd = () => {
    const [title, ...rest] = formData.inputText.split("\n");
    const text =
      rest.length > 0
        ? rest.filter(line => line && line !== "").join("\n")
        : null;
    const todo = { title, text };
    if (formData.isShared) {
      createNewSharedTodo(todo, snackOpen);
      resetFormData();
      close();
    } else {
      createNewPrivateTodo(todo, snackOpen);
      resetFormData();
      close();
    }
  };
  const handleCheckboxChange = event =>
    setFormData({ ...formData, isShared: event.target.checked });
  const handleInputChange = event =>
    setFormData({ ...formData, inputText: event.target.value });

  return (
    <>
      <Fab
        onClick={handleFabClick}
        style={fabStyle}
        color="primary"
        aria-label="add"
      >
        <AddIcon />
      </Fab>
      <Dialog
        maxWidth="md"
        fullWidth={true}
        fullScreen={fullScreenDialog}
        open={open}
        onClose={close}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add a new Todo</DialogTitle>
        <DialogContent>
          <FormGroup>
            <TextField
              required
              label="Todo text"
              placeholder="Type your todo here..."
              multiline
              rows="5"
              rowsMax="20"
              autoFocus
              value={formData.inputText}
              onChange={handleInputChange}
              variant="filled"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formData.isShared}
                  onChange={handleCheckboxChange}
                  value="isShared"
                />
              }
              label="Shared Todo"
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={isSnackOpen}
        autoHideDuration={5000}
        onClose={snackClose}
        message={`Added a new ${formData.isShared ? "shared" : "private"} todo`}
        action={
          <>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={snackClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
    </>
  );
};

async function createNewSharedTodo(todo, snackOpen) {
  await createSharedTodo(todo);
  snackOpen && snackOpen();
}

async function createNewPrivateTodo(todo, snackOpen) {
  await createPrivateTodo(todo);
  snackOpen && snackOpen();
}

export default AddNewTodo;
