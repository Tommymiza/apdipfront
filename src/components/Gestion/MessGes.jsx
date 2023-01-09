import { Menu } from "@mui/material";
import React, { useState, useContext } from "react";
import { ActContext } from "../../App";
import Progress from "../Outils/Progress";
import Axios from "axios";
import {
  DeleteForeverRounded,
  MailRounded,
  PhoneAndroidRounded,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

const MessGes = ({ item, setMessage }) => {
  const { server, setNotif } = useContext(ActContext);
  const [anchor, setAnchor] = useState();
  const [nom, setNom] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [mes, setMes] = useState();
  const [load, setLoading] = useState(false);
  const [id, setId] = useState();
  const deleteMessage = () => {
    setLoading(true);
    Axios({
      method: "post",
      url: server + "/message/clean",
      data: {
        item: item,
      },
    })
      .then((res) => {
        setMessage(res.data);
        setNotif({ severity: "success", message: "Clean up finished!" });
      })
      .catch((err) => {
        setNotif({ severity: "error", message: "Connection error!" });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const updateMessage = () => {
    Axios({
      method: "post",
      url: server + "/message/update",
      data: {
        id: id,
      },
    })
      .then((res) => {
        setMessage(res.data);
      })
      .catch((err) => {
        setNotif({ severity: "error", message: "Connection error!" });
      });
  };
  return (
    <div className="ges-div">
      <h3 style={{ marginBottom: "20px" }}>Liste des messages:</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          overflowY: "auto",
          overflowX: "hidden",
          padding: "0 5px",
          marginBottom: "20px",
        }}
      >
        {item ? (
          item.map((i) => (
            <div
              className="row-div box-hover"
              style={{
                height: "auto",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px",
                width: "calc(100% - 20px)",
                border: "1px solid #ccc",
                borderRadius: "7px",
                cursor: "pointer",
                transition: "0.4s",
              }}
              key={i.id}
              onClick={(e) => {
                setId(i.id);
                setAnchor(e.currentTarget);
                setNom(i.nom);
                setEmail(i.email);
                setPhone(i.phone);
                setMes(i.message);
              }}
            >
              <div
                className="column-div"
                style={{ gap: 0, alignItems: "flex-start" }}
              >
                <h3>{i.nom}</h3>
                <p>{i.email}</p>
              </div>
              <span
                style={{
                  width: i.lu === "oui" ? 0 : "10px",
                  height: "10px",
                  background: "var(--primary)",
                  borderRadius: "100%",
                  boxShadow: "0 0 10px var(--primary), 0 0 20px var(--primary)",
                }}
              ></span>
            </div>
          ))
        ) : (
          <div>
            <Progress />
          </div>
        )}
        <Menu
          open={Boolean(anchor)}
          anchorEl={anchor}
          onClose={() => {
            setAnchor();
            setTimeout(() => {
              updateMessage();
              setNom();
              setEmail();
              setPhone();
              setMes();
            }, 100);
          }}
        >
          <div
            className="column-div"
            style={{ padding: "20px", alignItems: "flex-start" }}
          >
            <div>
              <h5>{nom}</h5>
              <p
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <MailRounded htmlColor="var(--colorNavbar)" />
                &nbsp;:&nbsp;{email}
              </p>
              <p
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <PhoneAndroidRounded htmlColor="var(--colorNavbar)" />
                &nbsp;:&nbsp;{phone}
              </p>
            </div>
            <div>
              <h5>Message: </h5>
              <p>{mes}</p>
            </div>
          </div>
        </Menu>
      </div>
      <LoadingButton
        startIcon={<DeleteForeverRounded />}
        variant="contained"
        loading={load}
        sx={{
          textTransform: "none",
          fontFamily: "var(--fontText)",
          fontWeight: "bolder",
        }}
        onClick={deleteMessage}
      >
        Clean
      </LoadingButton>
    </div>
  );
};

export default MessGes;
