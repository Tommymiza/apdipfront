import React, { useState, useContext } from "react";
import { IconButton, TextField, Tooltip } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  DeleteRounded,
  BorderColorRounded,
  AddShoppingCartRounded,
} from "@mui/icons-material";
import Dialog from "./Dialog";
import Axios from "axios";
import { ActContext } from "../../App";
import Caroussel from "./Caroussel";

const Prd = ({ prd }) => {
  const { setProduct, connected, server, setNotif, panier, setPanier } =
    useContext(ActContext);
  const [load, setLoad] = useState(false);
  const [dialog, setDialog] = useState();
  function disable(id) {
    for (let index = 0; index < panier.length; index++) {
      if (panier[index].id === id) {
        return true;
      }
    }
    return false;
  }
  function checkValue(id) {
    for (let index = 0; index < panier.length; index++) {
      if (panier[index].id === id) {
        return panier[index].qte;
      }
    }
    return null;
  }
  function addproduit(e, p) {
    e.preventDefault();
    if (
      document.getElementById("prd" + p.id).value <= 0 ||
      isNaN(document.getElementById("prd" + p.id).value) ||
      document.getElementById("prd" + p.id).value > p.stock
    ) {
      setNotif({ severity: "warning", message: "Please enter correct value" });
      document.getElementById("prd" + p.id).value = null;
    } else {
      var temp = [];
      panier.forEach((item) => {
        temp.push(item);
      });
      temp.push({
        id: p.id,
        name: p.name,
        qte: document.getElementById("prd" + p.id).value,
        price: document.getElementById("prd" + p.id).value * p.price,
        photo: p.photo[0],
        unit: p.unit,
      });
      setPanier(temp);
    }
  }
  function update(a) {
    if (
      document.getElementById("name" + a.id).value === "" ||
      document.getElementById("price" + a.id).value < 1 ||
      document.getElementById("stock" + a.id).value < 0 ||
      document.getElementById("unit" + a.id).value === ""
    ) {
      setNotif({ severity: "warning", message: "Please enter correct value" });
    } else {
      setLoad(true);
      setTimeout(() => {
        Axios({
          url: server + "/product/update",
          method: "post",
          data: {
            name: document.getElementById("name" + a.id).value,
            price: document.getElementById("price" + a.id).value,
            unit: document.getElementById("unit" + a.id).value,
            stock: document.getElementById("stock" + a.id).value,
            id: a.id,
          },
        })
          .then((res) => {
            Axios({
              url: server + "/product",
              method: "get",
            }).then((res) => {
              setProduct(res.data);
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
      }, 1000);
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
              photos={prd.photo}
              close={() => setDialog()}
            />
          )
        }
      >
        <img src={server + "/images/" + prd.photo[0]} alt="Activité" />
      </div>
      <div className="text-container">
        {connected ? (
          <>
            <div className="row-div" style={{ alignItems: "center" }}>
              <h5>Name: </h5>
              <TextField
                id={"name" + prd.id}
                defaultValue={prd.name}
                type={"text"}
                variant="standard"
              />
            </div>
            <div className="row-div" style={{ alignItems: "center" }}>
              <h5>Price: </h5>
              <TextField
                id={"price" + prd.id}
                defaultValue={prd.price}
                type={"number"}
                inputProps={{
                  min: "1",
                }}
                variant="standard"
              />
            </div>
            <div className="row-div" style={{ alignItems: "center" }}>
              <h5>Stock: </h5>
              <TextField
                id={"stock" + prd.id}
                defaultValue={prd.stock}
                type={"number"}
                inputProps={{
                  min: "0",
                }}
                variant="standard"
              />
            </div>
            <div className="row-div" style={{ alignItems: "center" }}>
              <h5>Unit: </h5>
              <TextField
                id={"unit" + prd.id}
                defaultValue={prd.unit}
                type={"text"}
                variant="standard"
                sx={{ marginBottom: "5px" }}
              />
            </div>
          </>
        ) : (
          <>
            <h2 style={{ color: "var(--colorNavbar)" }}>{prd.name}</h2>
            <h4>{"Prix: " + prd.price + " Ariary"}</h4>
            <h4>{"Stock: " + prd.stock + " " + prd.unit}</h4>
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
              onClick={() => update(prd)}
            >
              Update
            </LoadingButton>
          ) : (
            <form
              onSubmit={(e) => {
                addproduit(e, prd);
              }}
            >
              <div className="row-div" style={{ justifyContent: "flex-end" }}>
                <TextField
                  id={"prd" + prd.id}
                  InputProps={{
                    style: {
                      height: "37px",
                      width: "80px",
                      fontFamily: "var(--fontNavbar)",
                    },
                  }}
                  defaultValue={checkValue(prd.id)}
                  disabled={disable(prd.id) ? true : false}
                  type={"number"}
                />
                <LoadingButton
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    fontFamily: "var(--fontText)",
                    fontWeight: "bolder",
                  }}
                  type="submit"
                  disabled={disable(prd.id) ? true : false}
                >
                  <AddShoppingCartRounded />
                </LoadingButton>
              </div>
            </form>
          )}
        </div>
      </div>
      {connected && (
        <Tooltip title="Delete Product">
          <IconButton
            sx={{ position: "absolute", top: "10px", right: "10px" }}
            onClick={() =>
              setDialog(
                <Dialog
                  act={prd}
                  server={server}
                  close={setDialog}
                  setNotif={setNotif}
                  setProduct={setProduct}
                  activ={false}
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

export default Prd;
