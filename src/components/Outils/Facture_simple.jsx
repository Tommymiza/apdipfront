import { Close, Check } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import React, { useContext, useState } from "react";
import { ActContext } from "../../App";
import Axios from "axios";
import jsPDF from "jspdf";

const FactureSimple = ({ nom, item, close, setLivraison }) => {
  const { width, server, setNotif } = useContext(ActContext);
  const [load, setLoad] = useState(false);
  function total(i) {
    var somme = 0;
    for (let index = 0; index < i.length; index++) {
      somme += i[index].total;
    }
    return somme;
  }
  const livrer = () => {
    setLoad(true);
    const doc = new jsPDF("p", "pt", "a4");
    doc.text("Facture de livraison",220,20)
    doc.html(document.getElementById("factDiv"), {
      html2canvas: {
        scale: 0.5,
      },
      callback: function (doc) {
        doc.save("facture.pdf");
      },
      y: 30
    });
    Axios({
      method: "post",
      url: server + "/commande/update",
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
          setNotif({ severity: "success", message: "update finished!" });
        }
      })
      .catch((err) => {
        console.log(err);
        setNotif({
          severity: "error",
          message: "Cannot update from database!",
        });
      })
      .finally(() => {
        setLoad(false);
        close();
      });
  };
  return (
    <Dialog
      open={true}
      onClose={() => close()}
      fullScreen={width < 700}
      PaperProps={{
        style: {
          width: width < 700 ? "100vw" : "80vw",
        },
      }}
      maxWidth="lg"
    >
      <DialogTitle>
        <div
          className="row-div"
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: "var(--fontText)",
            textAlign: "center",
            position: "relative",
          }}
        >
          <h3 style={{ width: "100%" }}>Facture de Livraison</h3>
          <IconButton
            onClick={() => close()}
            sx={{ position: "absolute", top: 0, right: "-10px" }}
          >
            <Close />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>
        <div className="column-div" id="factDiv">
          <div
            className="row-div"
            style={{
              alignItems: "center",
              width: width < 480 ? "100%" : "80%",
              gap: 0,
              justifyContent: "space-between",
            }}
          >
            <img
              src="/logo_APDIP.png"
              alt="Logo de l'association"
              style={{ width: "100px", height: "100px", objectFit: "contain" }}
            />
            <div>
              <h3>Client: {nom}</h3>
              <p>Adresse: {item[0].place}</p>
              <p>Tel: {item[0].tel}</p>
            </div>
          </div>
          <table
            style={{
              border: "1px solid black",
              width: width < 480 ? "100%" : "80%",
            }}
          >
            <thead>
              <tr>
                <td>Produit</td>
                <td>Quantité</td>
                <td>Prix unitaire</td>
                <td>Total</td>
              </tr>
            </thead>
            <tbody>
              {item.map((i, index) => (
                <tr key={index}>
                  <td>{i.name}</td>
                  <td>
                    {i.qte} {i.unit}
                  </td>
                  <td>{i.price} Ar</td>
                  <td>{i.total} Ar</td>
                </tr>
              ))}
              <tr>
                <td colSpan={3}>Total</td>
                <td style={{ fontWeight: "bolder" }}>{total(item)} Ar</td>
              </tr>
            </tbody>
          </table>
          <div
            className="row-div"
            style={{ width: width < 480 ? "100%" : "80%", height: "100px" }}
          >
            <p>Livreur</p>
            <p>Client</p>
          </div>
        </div>
        <div className="row-div">
          <LoadingButton
            variant="contained"
            startIcon={<Check />}
            loading={load}
            sx={{
              textTransform: "none",
              fontFamily: "var(--fontText)",
              fontWeight: "bolder",
            }}
            onClick={livrer}
          >
            Valider
          </LoadingButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FactureSimple;
