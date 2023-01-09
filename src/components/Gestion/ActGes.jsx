import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import { AddRounded } from "@mui/icons-material";
import Progress from "../Outils/Progress";
import AddAct from "./AddAct";

const ActGes = ({ activity, loading, setActivity, server, setNotif }) => {
  const [dialog, setDialog] = useState();
  const columns = [
    { field: "id", headerName: "ID", flex: 0.1 },
    { field: "title", headerName: "Title", flex: 0.2 },
    { field: "date", headerName: "Date", flex: 0.2 },
    { field: "place", headerName: "Place", flex: 0.2 },
    { field: "descri", headerName: "Description", flex: 0.3 },
  ];
  return !loading ? (
    <div
      className="ges-div"
      style={{
        position: "relative",
      }}
    >
      <h3>Liste des activités: </h3>
      <div>
        <DataGrid
          columns={columns}
          rows={activity}
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
            <AddAct
              close={setDialog}
              setActivity={setActivity}
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

export default ActGes;
