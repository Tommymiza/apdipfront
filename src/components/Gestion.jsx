import React, { useState, useContext, useEffect } from "react";
import { ActContext } from "../App";
import {
  BusinessCenterRounded,
  StorefrontRounded,
  ShoppingBagRounded,
  MarkEmailUnreadRounded,
} from "@mui/icons-material";
import ActGes from "./Gestion/ActGes";
import PrdGes from "./Gestion/PrdGes";
import ComGes from "./Gestion/ComGes";
import MessGes from "./Gestion/MessGes";
import Lottie from "react-lottie";
import Blocklottie from "./Lotties/76732-locked-icon.json";
import { Badge } from "@mui/material";
import Axios from "axios";

const Gestion = () => {
  const animatedLottie = {
    loop: true,
    autoplay: true,
    animationData: Blocklottie,
  };
  const [message, setMessage] = useState();
  const [content, setContent] = useState("Activité");
  const {
    activity,
    product,
    server,
    connected,
    setNotif,
    loading,
    setActivity,
    setProduct,
    width,
  } = useContext(ActContext);
  const menus = [
    {
      label: "Activité",
      icon: <BusinessCenterRounded />,
    },
    {
      label: "Produit",
      icon: <StorefrontRounded />,
    },
    {
      label: "Commande",
      icon: <ShoppingBagRounded />,
    },
    {
      label: "Message",
      icon: <MarkEmailUnreadRounded />,
    },
  ];
  useEffect(() => {
    Axios({
      method: "get",
      url: server + "/message",
    })
      .then((res) => {
        setMessage(res.data);
      })
      .catch((err) => {
        setNotif({ severity: "error", message: "Connection error!" });
      });
  }, [server, setNotif]);
  return connected ? (
    <div
      className="row-div"
      style={{ justifyContent: "flex-start", gap: 0, flexWrap: "nowrap" }}
    >
      <div
        id="bord"
        style={{
          width: width >= 1100 ? "15%" : "65px",
          fontFamily: "var(--fontNavbar)",
          fontWeight: "bold",
          background: "var(--backNavbar)",
          paddingTop: `${
            document.getElementById("navbar")?.offsetHeight + 40
          }px`,
          height: `calc(100vh - ${
            document.getElementById("navbar")?.offsetHeight + 40
          }px)`,
        }}
      >
        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "40px",
          }}
        >
          {menus.map((item) => {
            return item.label === "Message" ? (
              <li
                key={item.label}
                className="row-div"
                onClick={() => setContent(item.label)}
                style={{
                  justifyContent: "flex-start",
                  paddingLeft: "20px",
                  cursor: "pointer",
                  color:
                    content === item.label
                      ? "var(--primary)"
                      : "var(--colorNavbar)",
                }}
              >
                <Badge
                  max={9}
                  color="info"
                  badgeContent={
                    message?.filter((item) => item.lu === "non").length
                  }
                  sx={{ fontFamily: "var(--fontText)" }}
                >
                  {item.icon}
                </Badge>{" "}
                {width >= 1100 && item.label}
              </li>
            ) : (
              <li
                key={item.label}
                className="row-div"
                onClick={() => setContent(item.label)}
                style={{
                  justifyContent: "flex-start",
                  paddingLeft: "20px",
                  cursor: "pointer",
                  color:
                    content === item.label
                      ? "var(--primary)"
                      : "var(--colorNavbar)",
                }}
              >
                {item.icon} {width >= 1100 && item.label}
              </li>
            );
          })}
        </ul>
      </div>
      {content === "Activité" && (
        <ActGes
          activity={activity}
          server={server}
          loading={loading}
          setNotif={setNotif}
          setActivity={setActivity}
        />
      )}
      {content === "Produit" && (
        <PrdGes
          product={product}
          server={server}
          loading={loading}
          setNotif={setNotif}
          setProduct={setProduct}
        />
      )}
      {content === "Commande" && <ComGes />}
      {content === "Message" && (
        <MessGes item={message} setMessage={setMessage} />
      )}
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
      <Lottie options={animatedLottie} style={{ width: "250px" }} />
    </div>
  );
};

export default Gestion;
