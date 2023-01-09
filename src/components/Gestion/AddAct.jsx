import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Axios from "axios";
import { PhotoCamera } from "@mui/icons-material";

const AddAct = ({ close, setActivity, server, setNotif }) => {
  const [load, setLoad] = useState(false);
  const form = useRef(null);
  const showimage = () => {
    var bool = true;
    var i = 0;
    while (bool) {
      if (document.getElementById("image" + i)) {
        document
          .getElementById("listes")
          .removeChild(document.getElementById("image" + i));
      } else {
        bool = false;
      }
      i++;
    }
    var fichiers = form.current.photos.files;
    const arrayFile = Object.keys(fichiers);
    arrayFile.forEach((i) => {
      var node = document.createElement("img");
      node.setAttribute("id", `image${i}`);
      document.getElementById("listes").appendChild(node);
    });
    arrayFile.forEach((key) => {
      var reader = new FileReader();
      reader.onload = () => {
        document.getElementById("image" + key).src = reader.result;
      };
      reader.readAsDataURL(fichiers[key]);
    });
  };
  const add = (e) => {
    e.preventDefault();
    setLoad(true);
    const formdata = new FormData();
    const fichier = form.current.photos.files;
    for (let i = 0; i < fichier.length; i++) {
      formdata.append(fichier[i].name, fichier[i]);
    }
    formdata.append("title", form.current.title.value);
    formdata.append("date", form.current.date.value);
    formdata.append("place", form.current.place.value);
    formdata.append("descri", form.current.descri.value);
    setTimeout(() => {
      Axios({
        method: "post",
        url: server + "/activity/add",
        data: formdata,
      })
        .then((res) => {
          Axios({
            url: server + "/activity",
            method: "get",
          }).then((res) => {
            setActivity(res.data);
            setNotif({
              severity: "success",
              message: "Done!",
            });
            form.current.reset();
            showimage();
          });
        })
        .catch((err) => {
          setNotif({
            severity: "error",
            message: "Connection error!",
          });
        })
        .finally(() => {
          setLoad(false);
        });
    }, 1000);
  };
  return (
    <Dialog open={true}>
      <DialogTitle>Ajout d'une activité:</DialogTitle>
      <DialogContent>
        <form
          ref={form}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "300px",
          }}
          onSubmit={add}
          encType="multipart/form-data"
        >
          <TextField
            type={"text"}
            required
            variant="standard"
            label="Title:"
            name="title"
          />
          <TextField type={"date"} variant="standard" name="date" required />
          <TextField
            type={"text"}
            variant="standard"
            required
            label="Place:"
            name="place"
          />
          <TextField
            multiline
            type={"text"}
            label="Description:"
            name="descri"
          />
          <Button>
            <label
              htmlFor="cam"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <PhotoCamera />
            </label>
          </Button>
          <input
            type={"file"}
            accept="image/*"
            multiple
            id="cam"
            required
            name="photos"
            onChange={showimage}
          />
          <div id="listes"></div>
          <DialogActions>
            <LoadingButton
              loading={load}
              autoFocus
              variant="outlined"
              type="submit"
              sx={{
                textTransform: "none",
                fontFamily: "var(--fontText)",
                fontWeight: "bolder",
              }}
            >
              Ajout
            </LoadingButton>
            <Button
              variant="outlined"
              onClick={() => close()}
              sx={{
                textTransform: "none",
                fontFamily: "var(--fontText)",
                fontWeight: "bolder",
              }}
            >
              Annuler
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAct;
