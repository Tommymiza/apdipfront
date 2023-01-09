import React, { useContext, useState, useEffect } from "react";
import { ActContext } from "../../App";
import { ArrowLeftRounded } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import Progress from "../Outils/Progress";
import Facture from "./Facture";
import Axios from "axios";

const ComGes = () => {
  const { server, setNotif } = useContext(ActContext);
  const [client, setClient] = useState();
  const [tel, setTel] = useState();
  const [com, setCom] = useState([]);
  const [loading, setLoading] = useState(true);
  const columns = [
    { field: "name", headerName: "Nom", flex: 0.4 },
    { field: "place", headerName: "Adresse", flex: 0.3 },
    { field: "tel", headerName: "Phone", flex: 0.3 },
  ];
  function facture(tel,nom) {
    setTel(tel)
    setClient(nom);
  }
  useEffect(() => {
    setLoading(true);
    Axios({
      url: server + "/commande",
      method: "get",
    })
      .then((res) => {
        setCom(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setNotif({ severity: "error", message: "Connection error!" });
      });
    // eslint-disable-next-line
  }, []);
  return !loading ? (
    <div
      className="ges-div"
      style={{
        position: "relative",
      }}
    >
      {client ? (
        <>
          <div
            style={{
              position: "absolute",
              top: "115px",
              left: "0px",
              width: "fit-content",
              height: "fit-content",
            }}
          >
            <IconButton
              onClick={() => {
                setClient();
              }}
              size={"small"}
            >
              <ArrowLeftRounded sx={{ fontSize: 40 }} />
            </IconButton>
          </div>
          <Facture nom={client} tel={tel} server={server} setCom={setCom} />
        </>
      ) : (
        <>
          <h3>Liste des commandes: </h3>
          <div>
            <DataGrid
              columns={columns}
              rows={com}
              sx={{
                width: "100%",
                border: "none",
                fontFamily: "var(--fontNavbar)",
              }}
              rowsPerPageOptions={[5, 10, 100]}
              pageSize={5}
              pagination
              hideFooterSelectedRowCount={true}
              onRowDoubleClick={(e) => {
                facture(e.row.tel, e.row.name);
              }}
            />
          </div>
        </>
      )}
    </div>
  ) : (
    <div className="ges-div">
      <Progress />
    </div>
  );
};

export default ComGes;
