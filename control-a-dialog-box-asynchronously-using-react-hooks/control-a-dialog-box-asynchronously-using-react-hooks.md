---
title: Control a Dialog Box Asynchronously using React Hooks
tags: react, javascript, tutorial
---

We often control dialog boxes by including the component in our JSX and controlling its visibility and behaviour with state variables and props.

Most of the time however, these are pretty standard components that requires very little data to render, like a confirmation dialog box, for example. With hooks, we should be able to do something like this:

```jsx
const { getConfirmation } = useConfirmationDialog();

// ...

const confirmed = await getConfirmation({
  title: "Attention!",
  message: "Are you sure you would like to delete this entry?",
});

if (confirmed) {
  // perform operation
}
```

In this post, we will create the above hook. This will allow us to have a single confirmation dialog box at an app-level, and communicate with it using the context API.

[The final implementation can be found in this CodeSandbox](https://githubbox.com/metamodal/blob/master/control-a-dialog-box-asynchronously-using-react-hooks/example/final).

## Step 1: Setup the context

Create an empty context object and a provider HOC, which we can later wrap at an app level.

```jsx
import React from "react";
import ConfirmationDialog from "./ConfirmationDialog";

const ConfirmationDialogContext = React.createContext({});

const ConfirmationDialogProvider = ({ children }) => {
  return (
    <ConfirmationDialogContext.Provider>
      <ConfirmationDialog />
      {children}
    </ConfirmationDialogContext.Provider>
  );
};
```

## Step 2: Add the control mechanism

Here we add a state variable `dialogOpen` to control the visibility of the dialog. We also create another state variable called `dialogConfig`, which would contain the dialog content and action callback.

We then use these to create trigger functions for displaying the dialog, as well as handler functions that are called when the action buttons are pressed.

```jsx
const ConfirmationDialogProvider = ({ children }) => {
  const { dialogOpen, setDialogOpen } = React.useState(false);
  const { dialogConfig, setDialogConfig } = React.useState({});

  const openDialog = ({ title, message, actionCallback }) => {
    setDialogOpen(true);
    setDialogConfig({ title, message, actionCallback });
  };

  const resetDialog = () => {
    setDialogOpen(false);
    setDialogConfig({});
  };

  const onConfirm = () => {
    resetDialog();
    dialogConfig.actionCallback(true);
  };

  const onDismiss = () => {
    resetDialog();
    dialogConfig.actionCallback(false);
  };

  return (
    <ConfirmationDialogContext.Provider value={{ openDialog }}>
      <ConfirmationDialog
        open={dialogOpen}
        title={dialogConfig.title}
        message={dialogConfig.message}
        onConfirm={onConfirm}
        onDismiss={onDismiss}
      />
      {children}
    </ConfirmationDialogContext.Provider>
  );
};
```

## Step 3: Create a hook to trigger the dialog

Use this hook to trigger the dialog from anywhere in your app. It returns a function that lets you await the user input. This would let you use the `async/await` syntax rather than passing in a callback.

```jsx
const useConfirmationDialog = () => {
  const { openDialog } = React.useContext(ConfirmationDialogContext);

  const getConfirmation = ({ ...options }) =>
    new Promise((res) => {
      openDialog({ actionCallback: res, ...options });
    });

  return { getConfirmation };
};
```

Usage:

```jsx
const { getConfirmation } = useConfirmationDialog();

// ...

const confirmed = await getConfirmation({
  title: "Attention!",
  message: "Are you sure you would like to delete this entry?",
});

if (confirmed) {
  // perform operation
}
```

## Typos? Improvements?
Thanks for reading. If you notice any typos or would like to suggest improvements, please feel free to either create an issue or PR [here]().
