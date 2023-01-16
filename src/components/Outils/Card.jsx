import React, { useState, useContext } from "react";
import { IconButton, TextField, Menu, Tooltip } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { DeleteRounded, BorderColorRounded } from "@mui/icons-material";
import Dialog from "./Dialog";
import Axios from "axios";
import { ActContext } from "../../App";
import Caroussel from "./Caroussel";

const Card = ({ act }) => {
  const { setActivity, connected, server, setNotif } = useContext(ActContext);
  const [load, setLoad] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const [mess, setMess] = useState();
  const [dialog, setDialog] = useState();
  function getDate(a) {
    const date = a.split("-");
    return date[2] + "-" + date[1] + "-" + date[0];
  }
  function update(a) {
    if (
      document.getElementById("title" + a.id).value === "" ||
      document.getElementById("place" + a.id).value === "" ||
      document.getElementById("date" + a.id).value === "" ||
      document.getElementById("descri" + a.id).value === ""
    ) {
      setNotif({ severity: "warning", message: "Please enter correct value" });
    } else {
      setLoad(true);
      Axios({
        url: server + "/activity/update",
        method: "post",
        data: {
          title: document.getElementById("title" + a.id).value,
          date: document.getElementById("date" + a.id).value,
          place: document.getElementById("place" + a.id).value,
          descri: document.getElementById("descri" + a.id).value,
          id: a.id,
        },
      })
        .then((res) => {
          Axios({
            url: server + "/activity",
            method: "get",
          }).then((res) => {
            setActivity(res.data);
            setLoad(false);
            setNotif({
              severity: "success",
              message: "Update done successfully!",
            });
          });
        })
        .catch((err) => {
          setNotif({ severity: "error", message: "Update failed!" });
        });
    }
  }
  return (
    <div className="card">
      {dialog}
      <div
        className="img-container"
        onClick={() =>
          setDialog(
            <Caroussel
              server={server}
              photos={act.photo}
              close={() => setDialog()}
            />
          )
        }
      >
        <img src={server + "/images/" + act.photo[0]} alt="Activité" />
      </div>
      <div className="text-container">
        {connected ? (
          <>
            <div className="row-div" style={{ alignItems: "center" }}>
              <h5>Title: </h5>
              <TextField
                id={"title" + act.id}
                defaultValue={act.title}
                type={"text"}
                variant="standard"
              />
            </div>
            <div className="row-div" style={{ alignItems: "center" }}>
              <h5>Place: </h5>
              <TextField
                id={"place" + act.id}
                defaultValue={act.place}
                type={"text"}
                variant="standard"
              />
            </div>
            <div className="row-div" style={{ alignItems: "center" }}>
              <h5>Date: </h5>
              <TextField
                id={"date" + act.id}
                defaultValue={getDate(act.date)}
                type={"date"}
                variant="standard"
                inputProps={{
                  style: {
                    width: "195px",
                  },
                }}
              />
            </div>
            <div className="row-div" style={{ alignItems: "center" }}>
              <h5>Description: </h5>
              <TextField
                id={"descri" + act.id}
                defaultValue={act.descri}
                type={"text"}
                variant="standard"
                sx={{ marginBottom: "5px" }}
                inputProps={{
                  style: {
                    width: "152px",
                  },
                }}
              />
            </div>
          </>
        ) : (
          <>
            <h4>{act.title}</h4>
            <h4>{act.place}</h4>
            <h5>{act.date}</h5>
            <p>{act.descri.substr(0, 30)}...</p>
          </>
        )}
        <div className="row-div" style={{ justifyContent: "flex-end" }}>
          {connected ? (
            <LoadingButton
              variant="contained"
              startIcon={<BorderColorRounded />}
              loading={load}
              sx={{
                textTransform: "none",
                fontFamily: "var(--fontText)",
                fontWeight: "bolder",
              }}
              onClick={() => update(act)}
            >
              Update
            </LoadingButton>
          ) : (
            <>
              <LoadingButton
                variant="contained"
                sx={{
                  textTransform: "none",
                  fontFamily: "var(--fontText)",
                  fontWeight: "bolder",
                }}
                onClick={(e) => {
                  setAnchor(e.currentTarget);
                  setMess(act.descri);
                }}
              >
                More...
              </LoadingButton>
              <Menu
                open={anchor !== null}
                anchorEl={anchor}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                onClose={() => setAnchor(null)}
                sx={{
                  transform: "translateY(-10px)",
                }}
              >
                <div style={{ padding: "10px" }}>
                  <h4>Description: </h4>
                  <p>{mess}</p>
                </div>
              </Menu>
            </>
          )}
        </div>
      </div>
      {connected && (
        <Tooltip title="Delete Activity">
          <IconButton
            sx={{ position: "absolute", top: "10px", right: "10px" }}
            onClick={() =>
              setDialog(
                <Dialog
                  act={act}
                  server={server}
                  close={setDialog}
                  setNotif={setNotif}
                  setActivity={setActivity}
                  activ={true}
                />
              )
            }
          >
            <DeleteRounded
              htmlColor="var(--red)"
              sx={{
                background: "rgba(255,255,255,0.5)",
                padding: "3px",
                borderRadius: "100%",
                transition: "0.3s",
                "&:hover": { background: "white" },
              }}
            />
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
};

export default Card;
