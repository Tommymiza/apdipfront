import React, { useContext, useState } from "react";
import { ActContext } from "../App";
import Progress from "./Outils/Progress";
import Prd from "./Outils/Prd";
import { TextField } from "@mui/material";
const Product = () => {
  const { loading, product } = useContext(ActContext);
  const [some, setSome] = useState(null);
  return !loading ? (
    <div className="column-div" style={{ paddingTop: "150px" }}>
      <h3>Produits disponible:</h3>
      <TextField
        type={"search"}
        placeholder={"Search..."}
        sx={{ position: "fixed", top: 178, right: "calc(10% + 10px)" }}
        inputProps={{
          style: {
            height: "15px",
          },
        }}
        onChange={(e) => {
          setSome(
            product.filter((item) => item.name.includes(e.currentTarget.value))
          );
        }}
      />
      <div className="card-container">
        {some === null
          ? product.map((prd) => <Prd prd={prd} key={prd.id} />)
          : some.map((prd) => <Prd prd={prd} key={prd.id} />)}
      </div>
    </div>
  ) : (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Progress />
    </div>
  );
};

export default Product;
