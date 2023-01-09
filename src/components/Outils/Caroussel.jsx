import React, { useState, useContext } from "react";
import { Dialog, IconButton } from "@mui/material";
import { CloseRounded, ArrowBack, ArrowForward } from "@mui/icons-material";
import { ActContext } from "../../App";

const Caroussel = ({ photos, server, close }) => {
  const [slide, setSlide] = useState(0);
  const { width } = useContext(ActContext);
  const keyboardpressed = (e) => {
    switch (e.key) {
      case "Escape":
        close();
        break;
      case "ArrowLeft":
        slideright();
        break;
      case "ArrowRight":
        slideleft();
        break;
      default:
        break;
    }
  };
  const slideleft = () => {
    if (slide > -((photos?.length - 1) * 100)) {
      var trsltX = slide - 100;
      setSlide(trsltX);
      document.querySelectorAll(".diapo").forEach((element) => {
        element.style.transform = `translateX(${trsltX}%)`;
      });
    }
  };
  const slideright = () => {
    if (slide < 0) {
      var trsltX = slide + 100;
      setSlide(trsltX);
      document.querySelectorAll(".diapo").forEach((element) => {
        element.style.transform = `translateX(${trsltX}%)`;
      });
    }
  };
  return (
    <Dialog
      open={true}
      PaperProps={{
        style: {
          background: "transparent",
          boxShadow: "none",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center"
        },
      }}
      onKeyDown={keyboardpressed}
      fullScreen={width < 370 ? true : false}
    >
      <div className="diapo-container">
        {photos.map((photo) => (
          <div className="diapo" key={photo}>
            <img src={server + "/images/" + photo} alt={photo} />
          </div>
        ))}
        <IconButton
          sx={{
            position: "fixed",
            top: "20px",
            right: "20px",
            background: "rgba(0,0,0,0.1)",
            color: "white",
          }}
          onClick={close}
        >
          <CloseRounded />
        </IconButton>
        <IconButton
          sx={{
            position: "fixed",
            top: "50%",
            left: "20px",
            background: "rgba(0,0,0,0.1)",
            color: "white",
            transform: "translateY(-50%)",
          }}
          onClick={slideright}
        >
          <ArrowBack />
        </IconButton>
        <IconButton
          sx={{
            position: "fixed",
            top: "50%",
            right: "20px",
            background: "rgba(0,0,0,0.1)",
            color: "white",
            transform: "translateY(-50%)",
          }}
          onClick={slideleft}
        >
          <ArrowForward />
        </IconButton>
      </div>
    </Dialog>
  );
};

export default Caroussel;
