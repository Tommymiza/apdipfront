import React, { useEffect, useRef, useState, useContext, useMemo } from "react";
import "../styles/contact.scss";
import {
  TextField,
  ThemeProvider,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
} from "@mui/material";
import { Close, EmailRounded } from "@mui/icons-material";
import { theme } from "./Outils/theme";
import { LoadingButton } from "@mui/lab";
import { ActContext } from "../App";
import Axios from "axios";

const Contact = () => {
  const { server, setNotif } = useContext(ActContext);
  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState("");
  const [x, setX] = useState((Math.random().toFixed(2) * 100).toFixed(0));
  const [y, setY] = useState((Math.random().toFixed(2) * 100).toFixed(0));
  const form = useRef();
  const handleSubmit = useMemo(() => {
    return (e) => {
      setLoading(true);
      const f = form.current;
      e.preventDefault();
      if (
        parseInt(f.captcha1.value) + parseInt(f.captcha2.value) ===
        parseInt(f.captcha3.value)
      ) {
        setTimeout(() => {
          Axios({
            method: "post",
            url: server + "/message/add",
            data: {
              nom: f.nom.value,
              email: f.email.value,
              phone: f.phone.value,
              message: f.message.value,
            },
          })
            .then((res) => {
              if (res.data.errno) {
                setNotif({
                  severity: "error",
                  message: res.data.sqlMessage,
                });
              } else {
                setNotif({ severity: "success", message: "Message sent!" });
                f.nom.value = "";
                f.email.value = "";
                f.phone.value = "";
                f.message.value = "";
              }
            })
            .catch((err) => {
              setNotif({ severity: "error", message: "Connection error!" });
            })
            .finally(() => {
              setX((Math.random().toFixed(2) * 100).toFixed(0));
              setY((Math.random().toFixed(2) * 100).toFixed(0));
              f.captcha3.value = null;
              setLoading(false);
            });
        }, 1000);
      } else {
        setNotif({ severity: "error", message: "Captcha error!" });
        setX((Math.random().toFixed(2) * 100).toFixed(0));
        setY((Math.random().toFixed(2) * 100).toFixed(0));
        f.captcha3.value = null;
        setLoading(false);
      }
    };
  }, [server, setNotif]);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);
  return (
    <div id="contact">
      <h3 style={{ marginBottom: "20px" }}>Envoyez-nous un petit message</h3>
      <ThemeProvider theme={theme}>
        <form id="formContact" ref={form} onSubmit={handleSubmit}>
          <TextField
            label="Nom: "
            required
            sx={{
              width: "70%",
              minWidth: "300px",
              fontFamily: "var(--fontText)",
            }}
            variant="standard"
            name="nom"
            InputLabelProps={{
              style: {
                fontSize: "17px",
                fontFamily: "var(--fontText)",
              },
            }}
            inputProps={{
              style: {
                fontSize: "17px",
                fontFamily: "var(--fontText)",
              },
            }}
          />
          <TextField
            label="E-mail:"
            type="email"
            required
            sx={{
              width: "70%",
              minWidth: "300px",
              fontFamily: "var(--fontText)",
            }}
            variant="standard"
            name="email"
            InputLabelProps={{
              style: {
                fontSize: "17px",
                fontFamily: "var(--fontText)",
              },
            }}
            inputProps={{
              style: {
                fontSize: "17px",
                fontFamily: "var(--fontText)",
              },
            }}
          />
          <TextField
            type={"number"}
            label="Phone:"
            required
            sx={{
              width: "70%",
              minWidth: "300px",
              fontFamily: "var(--fontText)",
            }}
            variant="standard"
            name="phone"
            InputLabelProps={{
              style: {
                fontSize: "17px",
                fontFamily: "var(--fontText)",
              },
            }}
            inputProps={{
              style: {
                fontSize: "17px",
                fontFamily: "var(--fontText)",
              },
            }}
          />
          <TextField
            label="Message:"
            multiline
            maxRows={5}
            required
            name="message"
            sx={{
              width: "70%",
              minWidth: "300px",
            }}
            InputLabelProps={{
              style: {
                fontSize: "17px",
                fontFamily: "var(--fontText)",
              },
            }}
            inputProps={{
              style: {
                fontSize: "17px",
                fontFamily: "var(--fontText)",
                height: "150px",
              },
            }}
          />
          <div
            className="row-div"
            style={{
              width: "300px",
              justifyContent: "space-between",
              flexWrap: "nowrap",
              gap: 0,
              alignItems: "center",
            }}
          >
            <input
              type="number"
              name="captcha1"
              value={x}
              style={{
                width: "50px",
                height: "30px",
                borderRadius: "5px",
                fontSize: "20px",
                border: "1px solid #ccc",
                padding: "5px",
                fontFamily: "var(--fontText)",
              }}
              disabled
              required
            />
            <p>&nbsp;+&nbsp;</p>
            <input
              type="number"
              name="captcha2"
              value={y}
              style={{
                width: "50px",
                height: "30px",
                borderRadius: "5px",
                fontSize: "20px",
                border: "1px solid #ccc",
                padding: "5px",
                fontFamily: "var(--fontText)",
              }}
              disabled
              required
            />
            <p>&nbsp;=&nbsp;</p>
            <input
              type="number"
              name="captcha3"
              style={{
                width: "50px",
                height: "30px",
                fontSize: "20px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                padding: "5px",
                fontFamily: "var(--fontText)",
              }}
              required
            />
          </div>
          <LoadingButton
            variant="contained"
            type="submit"
            startIcon={<EmailRounded />}
            loading={loading}
            sx={{
              textTransform: "none",
              fontFamily: "var(--fontText)",
              fontWeight: "bolder",
            }}
          >
            Envoyer
          </LoadingButton>
        </form>
      </ThemeProvider>
      <Dialog open={dialog !== ""}>
        <DialogTitle sx={{ margin: 0, padding: 0 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "calc(100% - 20px)",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px",
              fontFamily: "SF",
              margin: 0,
            }}
          >
            <h3 style={{ margin: 0 }}>Alert:</h3>
            <IconButton onClick={() => setDialog("")}>
              <Close />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>{dialog}</DialogContent>
      </Dialog>
    </div>
  );
};

export default Contact;
