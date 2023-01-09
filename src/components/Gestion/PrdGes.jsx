import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import { AddRounded } from "@mui/icons-material";
import Progress from "../Outils/Progress";
import AddPrd from "./AddPrd";

const PrdGes = ({ product, loading, setProduct, server, setNotif }) => {
  const [dialog, setDialog] = useState();
  const columns = [
    { field: "id", headerName: "ID", flex: 0.1 },
    { field: "name", headerName: "Title", flex: 0.2 },
    { field: "price", headerName: "Price", flex: 0.2 },
    { field: "unit", headerName: "Unit", flex: 0.2 },
    { field: "stock", headerName: "Stock", flex: 0.3 },
  ];
  return !loading ? (
    <div
      className="ges-div"
      style={{
        position: "relative",
      }}
    >
      <h3>Liste des produits disponible: </h3>
      <div>
        <DataGrid
          columns={columns}
          rows={product}
          sx={{
            width: "100%",
            border: "none",
            fontFamily: "var(--fontNavbar)",
          }}
          rowsPerPageOptions={[5, 10, 100]}
          pageSize={5}
          pagination
          hideFooterSelectedRowCount={true}
        />
      </div>
      <IconButton
        size="large"
        onClick={() =>
          setDialog(
            <AddPrd
              close={setDialog}
              setProduct={setProduct}
              server={server}
              setNotif={setNotif}
            />
          )
        }
      >
        <AddRounded />
      </IconButton>
      {dialog}
    </div>
  ) : (
    <div className="ges-div">
      <Progress />
    </div>
  );
};

export default PrdGes;
