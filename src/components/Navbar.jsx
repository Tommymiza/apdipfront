import React, { useState, useContext } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Tooltip,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Login,
  Logout,
  LibraryBooks,
  MenuRounded,
  AccountCircle,
  ShoppingBagRounded,
  RemoveCircleRounded,
  RemoveShoppingCartRounded,
  ShoppingCartRounded,
} from "@mui/icons-material";
import { ActContext } from "../App";
import Connexion from "./Connexion";
import "../styles/navbar.scss";
import { LoadingButton } from "@mui/lab";
import Axios from "axios";

const Navbar = () => {
  const {
    connected,
    user,
    setUser,
    setConnected,
    width,
    panier,
    setNotif,
    setProduct,
    setPanier,
    server,
  } = useContext(ActContext);
  const [anchor, setAnchor] = useState(null);
  const [anchor1, setAnchor1] = useState(null);
  const [anchor2, setAnchor2] = useState(null);
  const [dialog, setDialog] = useState();
  const [open3, setOpen3] = useState(false);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const open = Boolean(anchor);
  const open1 = Boolean(anchor1);
  const open2 = Boolean(anchor2);
  const menus = [
    {
      label: "Accueil",
      link: "/",
    },
    {
      label: "Activité",
      link: "/activity",
    },
    {
      label: "Nos produits",
      link: "/product",
    },
    {
      label: "Contact",
      link: "/contact-us",
    },
  ];
  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };
  const handleClick1 = (event) => {
    setAnchor1(event.currentTarget);
  };
  const handleClick2 = (event) => {
    setAnchor2(event.currentTarget);
  };
  const logout = () => {
    setUser();
    localStorage.removeItem("user");
    setConnected(false);
  };
  const send = (e) => {
    e.preventDefault();
    const form = document.getElementById("persForm");
    setLoad(true);
    var promise = [];
    promise.push(
      Axios({
        url: server + "/commande/add",
        method: "post",
        data: {
          list: panier,
          tel: form.phone.value,
          place: form.adresse.value,
          name: form.nom.value,
        },
      })
    );
    Promise.all(promise)
      .then((res) => {
        console.log(res);
        if (res[0].data[0]?.data?.errno) {
          var lis = "";
          for (let index = 0; index < res[0].data.length; index++) {
            lis = lis + res[0].data[index].name + ", ";
          }
          setNotif({ severity: "error", message: "Stock out for: " + lis });
        } else {
          setNotif({
            severity: "success",
            message: "Thank you for trusting us!",
          });
        }
        Axios({
          url: server + "/product",
          method: "get",
        }).then((res) => {
          setProduct(res.data);
          setPanier([]);
        });
      })
      .catch((err) => {
        console.log(err);
        setNotif({ severity: "error", message: "Connection lost!" });
      })
      .finally(() => {
        setLoad(false);
        setOpen3(false);
        setAnchor2();
      });
  };
  function removepanier(id) {
    var temp = [];
    panier.forEach((item) => {
      if (item.id !== id) {
        temp.push(item);
      }
    });
    setPanier(temp);
  }
  function total() {
    var total = 0;
    panier.forEach((item) => {
      total += item.price;
    });
    return total;
  }
  return (
    <nav id="navbar">
      <div id="logo" onClick={() => navigate("/")}>
        <img src="/header.png" alt="Header logo" style={{ width: "100px" }} />
      </div>
      <ul>
        {width > 700 ? (
          menus.map((item) => (
            <NavLink
              key={item.label}
              to={item.link}
              end={item.link === "/" ? true : false}
            >
              <li>{item.label}</li>
            </NavLink>
          ))
        ) : (
          <div>
            <Tooltip title="Menu">
              <IconButton onClick={handleClick1} size="small" sx={{ ml: 2 }}>
                <MenuRounded sx={{ width: 32, height: 32 }} />
              </IconButton>
            </Tooltip>
            <Menu
              open={open1}
              onClose={() => setAnchor1(null)}
              onClick={() => setAnchor1(null)}
              anchorEl={anchor1}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              {menus.map((item) => (
                <MenuItem key={item.label}>
                  <NavLink
                    to={item.link}
                    end={item.link === "/" ? true : false}
                  >
                    <p>{item.label}</p>
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </div>
        )}
      </ul>
      <div>
        {!connected && (
          <>
            <Badge
              badgeContent={panier.length}
              sx={{ cursor: "pointer" }}
              color={"info"}
            >
              <ShoppingBagRounded
                htmlColor="var(--colorNavbar)"
                sx={{
                  transition: "0.2s",
                  "&:hover": {
                    color: "var(--primary)",
                  },
                }}
                onClick={handleClick2}
              />
            </Badge>
            <Menu
              open={open2}
              onClose={() => setAnchor2(null)}
              anchorEl={anchor2}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              PaperProps={{
                style: {
                  padding: "10px",
                },
              }}
            >
              {panier.length !== 0 ? (
                panier.map((item) => (
                  <div className="panier" key={item.id}>
                    <div
                      className="row-div box-hover"
                      style={{
                        alignItems: "center",
                        width: "calc(100% - 10px)",
                      }}
                    >
                      <img
                        src={server + "/images/" + item.photo}
                        alt={item.name}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          borderRadius: "100%",
                          objectPosition: "center",
                        }}
                      />
                      <div>
                        <h3>{item.name}</h3>
                        <h5>
                          Quantité: {item.qte} {item.unit}
                        </h5>
                        <h5>Prix: {item.price} Ariary</h5>
                      </div>
                      <RemoveCircleRounded
                        htmlColor="var(--colorNavbar)"
                        sx={{
                          cursor: "pointer",
                          transition: "0.2s",
                          "&:hover": {
                            color: "var(--red)",
                            transform: "scale(1.2)",
                          },
                        }}
                        onClick={() => removepanier(item.id)}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <h5>No items found</h5>
              )}
              {panier.length !== 0 && (
                <div>
                  <div className="row-div" style={{ marginTop: "10px" }}>
                    <h4>Total: {total()} Ariary</h4>
                  </div>
                  <div className="row-div" style={{ marginTop: "10px" }}>
                    <IconButton size="large" onClick={() => setPanier([])}>
                      <RemoveShoppingCartRounded htmlColor="var(--red)" />
                    </IconButton>
                    <IconButton size="large" onClick={() => setOpen3(true)}>
                      <ShoppingCartRounded htmlColor="var(--primary)" />
                    </IconButton>
                    <Dialog open={open3} onClose={() => setOpen3(false)}>
                      <DialogTitle>Information: </DialogTitle>
                      <DialogContent>
                        <form
                          className="column-div"
                          style={{ paddingTop: "10px" }}
                          onSubmit={send}
                          id="persForm"
                        >
                          <TextField
                            variant="outlined"
                            type={"text"}
                            required
                            label="Name: "
                            name="nom"
                          />
                          <TextField
                            variant="outlined"
                            type={"text"}
                            required
                            label="Address: "
                            name="adresse"
                          />
                          <TextField
                            variant="outlined"
                            type={"tel"}
                            required
                            label="Tel: "
                            name="phone"
                          />
                          <DialogActions>
                            <Button
                              onClick={() => setOpen3(false)}
                              variant="contained"
                              sx={{
                                textTransform: "none",
                                fontFamily: "var(--fontText)",
                                fontWeight: "bolder",
                                background: "var(--red)",
                                "&:hover": {
                                  background: "#a5240e",
                                },
                              }}
                            >
                              Close
                            </Button>
                            <LoadingButton
                              type="submit"
                              variant="contained"
                              loading={load}
                              sx={{
                                textTransform: "none",
                                fontFamily: "var(--fontText)",
                                fontWeight: "bolder",
                              }}
                            >
                              Acheter
                            </LoadingButton>
                          </DialogActions>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              )}
            </Menu>
          </>
        )}
        <Tooltip title="Espace personnel">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            {connected ? (
              <Avatar sx={{ width: 32, height: 32 }}>
                {user.username.substr(0, 1)}
              </Avatar>
            ) : (
              <AccountCircle sx={{ width: 32, height: 32 }} />
            )}
          </IconButton>
        </Tooltip>
      </div>
      <Menu
        open={open}
        onClose={() => setAnchor(null)}
        onClick={() => setAnchor(null)}
        anchorEl={anchor}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {!connected ? (
          <div>
            <MenuItem
              onClick={() => {
                setDialog(<Connexion close={() => setDialog()} />);
              }}
            >
              <Login sx={{ width: 20, height: 20 }} />
              <p>Connexion</p>
            </MenuItem>
          </div>
        ) : (
          <div>
            <MenuItem onClick={() => navigate("/gestion")}>
              <LibraryBooks sx={{ width: 20, height: 20 }} />
              <p>Gestion</p>
            </MenuItem>
            <MenuItem onClick={logout}>
              <Logout sx={{ width: 20, height: 20 }} />
              <p>Quitter</p>
            </MenuItem>
          </div>
        )}
      </Menu>
      {dialog}
    </nav>
  );
};

export default Navbar;
