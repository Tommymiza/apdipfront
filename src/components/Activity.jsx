import React, { useContext, useEffect, useState } from "react";
import { ActContext } from "../App";
import Progress from "./Outils/Progress";
import Card from "./Outils/Card";
import { TextField } from "@mui/material";

const Activity = () => {
  const { loading, activity } = useContext(ActContext);
  const [some, setSome] = useState(null);
  useEffect(() => {
    var temp = [];
    activity.forEach((i) => {
      temp.push(false);
    });
  }, [activity]);
  return !loading ? (
    <div className="column-div" style={{ paddingTop: "150px" }}>
      <h3>Activités récentes:</h3>
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
            activity.filter(
              (item) =>
                item.title.includes(e.currentTarget.value) ||
                item.place.includes(e.currentTarget.value) ||
                item.descri.includes(e.currentTarget.value)
            )
          );
        }}
      />
      <div className="card-container">
        {some === null
          ? activity.map((act) => <Card act={act} key={act.id} />)
          : some.map((act) => <Card act={act} key={act.id} />)}
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

export default Activity;
