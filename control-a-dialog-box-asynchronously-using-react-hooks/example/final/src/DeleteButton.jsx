import React from "react";
import Button from "@material-ui/core/Button";
import { useConfirmationDialog } from "./ConfirmationDialog";

const DeleteButton = () => {
  const { getConfirmation } = useConfirmationDialog();

  const onClick = async () => {
    const confirmed = await getConfirmation({
      title: "Attention!",
      message: "OMG are you sure?",
    });

    if (confirmed) alert("A Møøse once bit my sister... No realli!");
  };

  return (
    <Button variant="contained" color="primary" onClick={onClick}>
      Delete the Internet
    </Button>
  );
};

export default DeleteButton;
