import React, { useState } from "react";
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

const DialogAct = ({
  server,
  act,
  close,
  setNotif,
  setActivity,
  setProduct,
  activ,
}) => {
  const [load, setLoad] = useState(false);
  const open = true;
  function deleteAct(id, photo) {
    setLoad(true);
    Axios({
      method: "post",
      url: activ ? server + "/activity/delete" : server + "/product/delete",
      data: {
        id: id,
        photo: photo,
      },
    })
      .then((res) => {
        Axios({
          url: activ ? server + "/activity" : server + "/product",
          method: "get",
        }).then((res) => {
          if (activ) {
            setActivity(res.data);
          } else {
            setProduct(res.data);
          }
          setLoad(false);
          close();
          setNotif({
            severity: "success",
            message: activ ? "Activity removed!" : "Product removed!",
          });
        });
      })
      .catch((err) => {
        close();
        setNotif({ severity: "error", message: "Remove failed!" });
      });
  }
  return (
    <Dialog open={open} onClose={() => close()}>
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Do you want to delete "{activ ? act.title : act.name}"
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => close()}>
          No
        </Button>
        <LoadingButton
          loading={load}
          onClick={() => deleteAct(act.id, act.photo)}
          autoFocus
          variant="outlined"
        >
          Yes
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default DialogAct;
