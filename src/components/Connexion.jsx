import React, { useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
  ThemeProvider,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Login } from "@mui/icons-material";
import { theme } from "./Outils/theme";
import Axios from "axios";
import { ActContext } from "../App";
import { useNavigate } from "react-router-dom";

const Connexion = ({ close }) => {
  const navigate = useNavigate();
  const { login, server, setNotif, setPanier } = useContext(ActContext);
  const log = (e) => {
    e.preventDefault();
    Axios({
      url: server + "/user",
      method: "get",
      params: {
        username: document.getElementById("log-email").value,
        password: document.getElementById("log-password").value,
      },
    })
      .then((res) => {
        if (res.data.status) {
          setNotif({ severity: "error", message: res.data.status });
        } else {
          login(res.data[0]);
          setPanier([]);
          close();
          navigate("/gestion");
        }
      })
      .catch((err) => {
        setNotif({ severity: "error", message: "Connection failed!" });
      });
  };
  return (
    <Dialog open={true} onClose={close} maxWidth="sm">
      <DialogTitle
        variant="h5"
        sx={{ fontWeight: "bold", fontFamily: "var(--fontText)" }}
      >
        Log in:
      </DialogTitle>
      <DialogContent>
        <form onSubmit={log}>
          <FormControl
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              padding: "10px",
            }}
          >
            <ThemeProvider theme={theme}>
              <TextField
                label="Username: "
                required
                inputProps={{
                  style: { fontFamily: "var(--fontText)" },
                }}
                type="text"
                id="log-email"
              />
              <TextField
                label="Password: "
                required
                inputProps={{
                  style: { fontFamily: "var(--fontText)" },
                }}
                type="password"
                id="log-password"
              />
              <LoadingButton
                type="submit"
                startIcon={<Login />}
                sx={{
                  textTransform: "none",
                  fontFamily: "var(--fontText)",
                  fontWeight: "bolder",
                }}
                variant="contained"
              >
                Login
              </LoadingButton>
            </ThemeProvider>
          </FormControl>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Connexion;
