import React, { useState, useEffect } from "react";
import Progress from "../Outils/Progress";
import Axios from "axios";
import { Chip } from "@mui/material";
import FactureSimple from "../Outils/Facture_simple";
import DeleteFacture from "../Outils/DeleteFacture";

const Facture = ({ nom, server, setCom, tel }) => {
  const [livre, setLivre] = useState(false);
  const [livraison, setLivraison] = useState();
  const [waiting, setWaiting] = useState(true);
  const [dialog, setDialog] = useState();
  useEffect(() => {
    Axios({
      method: "get",
      url: server + "/commande/nom",
      params: {
        tel: tel,
      },
    })
      .then((res) => {
        setLivraison(res.data);
        setWaiting(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [tel, server]);
  const styleButton = {
    cursor: "pointer",
    fontWeight: "bolder",
    fontSize: "20px",
  };
  return !waiting ? (
    <>
      <h3 style={{ marginTop: "20px", textAlign: "center" }}>
        Liste des commandes de {nom}
      </h3>
      <div
        className="row-div"
        style={{
          height: "fit-content",
          boxShadow: "0 0 5px var(--colorNavbar)",
          padding: "10px",
          borderRadius: "7px",
          width: "calc(80% - 20px)",
          margin: "10px 0",
        }}
      >
        <p
          style={{ ...styleButton, color: livre ? "black" : "var(--primary)" }}
          onClick={() => setLivre(false)}
        >
          Non livré
        </p>
        <p style={styleButton}>|</p>
        <p
          style={{ ...styleButton, color: livre ? "var(--primary)" : "black" }}
          onClick={() => setLivre(true)}
        >
          Livré
        </p>
      </div>
      <div style={{ height: "50vh", overflowY: "auto" }}>
        {!livre ? (
          <>
            {livraison
              .filter((item) => item.livre === "non")
              ?.map((item) => (
                <div className="panier" key={item.id}>
                  <div
                    className="row-div box-hover"
                    style={{
                      alignItems: "center",
                      width: "calc(100% - 10px)",
                      gap: "0px",
                      flexWrap: "nowrap",
                    }}
                  >
                    <img
                      src={server + "/images/" + item.photo[0]}
                      alt={item.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        borderRadius: "100%",
                        objectPosition: "center",
                      }}
                    />
                    <div style={{ width: "130px" }}>
                      <h3>{item.name}</h3>
                      <h5>
                        Quantité: {item.qte} {item.unit}
                      </h5>
                      <h5>Total: {item.total} Ariary</h5>
                    </div>
                    <Chip
                      label="Livrer"
                      clickable={true}
                      color="info"
                      size="medium"
                      sx={{ fontFamily: "var(--fontText)" }}
                      onClick={() =>
                        setDialog(
                          <FactureSimple
                            nom={nom}
                            item={[item]}
                            close={setDialog}
                            setLivraison={setLivraison}
                          />
                        )
                      }
                    />
                  </div>
                </div>
              ))}
            {livraison.filter((item) => item.livre === "non").length !== 0 && (
              <Chip
                label="Livrer tout"
                clickable={true}
                component="h1"
                color="info"
                size="medium"
                sx={{
                  position: "absolute",
                  bottom: "50px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontFamily: "var(--fontText)",
                }}
                onClick={() =>
                  setDialog(
                    <FactureSimple
                      nom={nom}
                      item={livraison.filter((item) => item.livre === "non")}
                      close={setDialog}
                      setLivraison={setLivraison}
                    />
                  )
                }
              />
            )}
          </>
        ) : (
          <>
            {livraison
              .filter((item) => item.livre === "oui")
              ?.map((item) => (
                <div className="panier" key={item.id}>
                  <div
                    className="row-div box-hover"
                    style={{
                      alignItems: "center",
                      width: "calc(100% - 10px)",
                      gap: "0px",
                      flexWrap: "nowrap",
                    }}
                  >
                    <img
                      src={server + "/images/" + item.photo[0]}
                      alt={item.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        borderRadius: "100%",
                        objectPosition: "center",
                      }}
                    />
                    <div style={{ width: "130px" }}>
                      <h3>{item.name}</h3>
                      <h5>
                        Quantité: {item.qte} {item.unit}
                      </h5>
                      <h5>Prix: {item.total} Ariary</h5>
                    </div>
                    <Chip
                      label="Supprimer"
                      clickable={true}
                      color="error"
                      size="medium"
                      sx={{ fontFamily: "var(--fontText)" }}
                      onClick={() =>
                        setDialog(
                          <DeleteFacture
                            close={setDialog}
                            item={[item]}
                            nom={nom}
                            setLivraison={setLivraison}
                          />
                        )
                      }
                    />
                  </div>
                </div>
              ))}
            {livraison.filter((item) => item.livre === "oui").length !== 0 && (
              <Chip
                label="Supprimer tout"
                clickable={true}
                component="h1"
                color="error"
                size="medium"
                sx={{
                  position: "absolute",
                  bottom: "50px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontFamily: "var(--fontText)",
                }}
                onClick={() =>
                  setDialog(
                    <DeleteFacture
                      close={setDialog}
                      item={livraison.filter((item) => item.livre === "oui")}
                      nom={nom}
                      setLivraison={setLivraison}
                    />
                  )
                }
              />
            )}
          </>
        )}
      </div>
      {dialog}
    </>
  ) : (
    <div>
      <Progress />
    </div>
  );
};

export default Facture;
