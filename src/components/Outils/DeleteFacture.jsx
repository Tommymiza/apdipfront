import React, { useState, useContext } from "react";
import { ActContext } from "../../App";
import { LoadingButton } from "@mui/lab";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import Axios from "axios";

const DeleteFacture = ({ close, item, nom, setLivraison }) => {
  const { setNotif, server } = useContext(ActContext);
  const [load, setLoad] = useState(false);
  const deleteFact = () => {
    setLoad(true);
    Axios({
      method: "post",
      url: server + "/commande/delete",
      data: {
        list: item,
        name: nom,
      },
    })
      .then((res) => {
        if (res.data[0]?.data?.errno) {
          setNotif({ severity: "error", message: "Error on database!" });
        } else {
          setLivraison(res.data);
          setNotif({ severity: "success", message: "Delete finished!" });
        }
      })
      .catch((err) => {
        console.log(err);
        setNotif({
          severity: "error",
          message: "Cannot delete from database!",
        });
      })
      .finally(() => {
        setLoad(false);
        close();
      });
  };
  return (
    <Dialog open={true} onClose={() => close()}>
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText>Do you want to delete ?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => close()}>
          No
        </Button>
        <LoadingButton
          loading={load}
          onClick={deleteFact}
          autoFocus
          variant="outlined"
        >
          Yes
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteFacture;
