import React, { useState, useContext, useEffect } from "react";
import Lottie from "react-lottie";
import Farmer from "./Lotties/64641-farmers-to-industrial-workers.json";
import Holding from "./Lotties/70911-thinking.json";
import { ActContext } from "../App";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import { en } from "../localize/en";
import { fr } from "../localize/fr";
import "../styles/home.scss";
import { motion } from "framer-motion";
import Lang from "./Outils/Lang";
import {
  EmailRounded,
  HomeRounded,
  PhoneAndroidRounded,
} from "@mui/icons-material";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
  },
  lng: window.navigator.language,
  fallbackLng: window.navigator.language,
  interpolation: { escapeValue: false },
});

const Home = () => {
  const { t } = useTranslation();
  const { width } = useContext(ActContext);
  const animatedLottie = {
    loop: true,
    autoplay: true,
  };
  const [state, setState] = useState(0);
  const axes = [
    {
      id: 0,
      title: t("axes.axe.0.title"),
      act: t("axes.axe.0.act"),
      obj: [
        t("axes.axe.0.obj.0"),
        t("axes.axe.0.obj.1"),
        t("axes.axe.0.obj.2"),
        t("axes.axe.0.obj.3"),
        t("axes.axe.0.obj.4"),
      ],
    },
    {
      id: 1,
      title: t("axes.axe.1.title"),
      act: t("axes.axe.1.act"),
      obj: [t("axes.axe.1.obj.0"), t("axes.axe.1.obj.1")],
    },
    {
      id: 2,
      title: t("axes.axe.2.title"),
      act: t("axes.axe.2.act"),
      obj: [t("axes.axe.2.obj.0")],
    },
    {
      id: 3,
      title: t("axes.axe.3.title"),
      act: t("axes.axe.3.act"),
      obj: [
        t("axes.axe.3.obj.0"),
        t("axes.axe.3.obj.1"),
        t("axes.axe.3.obj.2"),
        t("axes.axe.3.obj.3"),
      ],
    },
    {
      id: 4,
      title: t("axes.axe.4.title"),
      act: t("axes.axe.4.act"),
      obj: [
        t("axes.axe.4.obj.0"),
        t("axes.axe.4.obj.1"),
        t("axes.axe.4.obj.2"),
        t("axes.axe.4.obj.3"),
      ],
    },
    {
      id: 5,
      title: t("axes.axe.5.title"),
      act: t("axes.axe.5.act"),
      obj: [
        t("axes.axe.5.obj.0"),
        t("axes.axe.5.obj.1"),
        t("axes.axe.5.obj.2"),
        t("axes.axe.5.obj.3"),
      ],
    },
  ];
  const missions = [
    {
      txt: t("missions.mission.0"),
    },
    {
      txt: t("missions.mission.1"),
    },
    {
      txt: t("missions.mission.2"),
    },
  ];
  useEffect(() => {
    if (localStorage.getItem("lang")) {
      i18n.changeLanguage(localStorage.getItem("lang"));
    }
  }, []);
  return (
    <>
      <div id="home">
        <div
          style={{
            position: "fixed",
            top: 150,
            right: 50,
            zIndex: 2,
            background: "rgba(255,255,255,0.2)",
            backdropFilter: "blur(1px)",
          }}
        >
          <Lang />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="row-div"
          style={{ alignItems: "center", minHeight: "calc(100vh - 250px)" }}
        >
          <div className="title">
            <h1>
              Association des Paysans pour le Développement Inter–
              Professionnels (APDIP)
            </h1>
            <p>{t("sTitle")}</p>
          </div>
          <Lottie
            options={{ ...animatedLottie, animationData: Farmer }}
            style={{ width: "340px" }}
          />
        </motion.div>
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ marginTop: "100px", textAlign: "center" }}
          className="title-h3"
        >
          {t("axes.title")}
        </motion.h3>
        <div
          className="row-div"
          style={{ position: "relative", margin: "20px 0" }}
        >
          <div
            className="column-div"
            style={{
              minWidth: "300px",
              alignItems: "flex-start",
              maxWidth: "calc(50% - 10px)",
            }}
          >
            {axes.map((axe, index) => (
              <motion.h5
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
                key={index}
                style={{
                  background: state === axe.id ? "rgb(85, 82, 82)" : "none",
                  color: state === axe.id ? "#fff" : "#000",
                }}
                className="axe"
                onMouseEnter={(e) => {
                  if (state !== axe.id) {
                    e.currentTarget.style.background = "#ccc";
                  }
                }}
                onMouseLeave={(e) => {
                  if (state !== axe.id) {
                    e.currentTarget.style.background = "none";
                  }
                }}
                onClick={() => setState(index)}
              >
                {axe.title}
              </motion.h5>
            ))}
          </div>
          {axes
            .filter((item) => item.id === state)
            .map((axe, index) => (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="column-div"
                key={index}
                style={{
                  minWidth: "300px",
                  alignItems: "flex-start",
                  maxWidth: "calc(50% - 10px)",
                  justifyContent: "center",
                }}
              >
                <h5>{t("axes.act")}</h5>
                <p>{axe.act}</p>
                <h5>{t("axes.obj")}</h5>
                {axe.obj.map((o) => (
                  <p key={o}>-{o}</p>
                ))}
              </motion.div>
            ))}
        </div>
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            marginTop: "100px",
            textAlign: "center",
            marginBottom: "20px",
          }}
          className="title-h3"
        >
          {t("missions.title")}
        </motion.h3>
        <div
          className="row-div"
          style={{ minWidth: "300px", textAlign: "center" }}
        >
          <div
            className="column-div"
            style={{
              width: width > 686 ? "50%" : "80%",
              justifyContent: "center",
            }}
          >
            {missions.map((mission, index) => (
              <motion.p
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  type: "tween",
                  delay: 0.2 * index,
                }}
                key={index}
                style={{
                  fontSize: "17px",
                  lineHeight: "25px",
                  textAlign: "justify",
                  width: "100%",
                }}
                className="title"
              >
                {mission.txt}
              </motion.p>
            ))}
          </div>
          <Lottie
            options={{ ...animatedLottie, animationData: Holding }}
            style={{ width: "300px" }}
          />
        </div>
      </div>
      <div id="footer">
        <div>
          <img src="logo_APDIP.png" alt="Sary APDIP" />
        </div>
        <div>
          <h3>Contact:</h3>
          <div
            className="row-div"
            style={{
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 0,
            }}
          >
            <PhoneAndroidRounded />
            <p>&nbsp;:&nbsp;+261 34 68 030 98</p>
          </div>
          <div
            className="row-div"
            style={{
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 0,
            }}
          >
            <EmailRounded />
            &nbsp;:&nbsp;
            <a href="mailto:apdiptsiro@gmail.com">apdiptsiro@gmail.com</a>
          </div>
          <div
            className="row-div"
            style={{
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 0,
            }}
          >
            <HomeRounded />
            <p>&nbsp;:&nbsp; Lot 8 AB 14 Ter Soamahamanina TSIROANOMANDIDY</p>
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center", background: "var(--colorNavbar)"}}>
        <h5 style={{ padding: "10px" }}>
          &copy; Rakotondrazaka Miza Tommy, 2022 reserved
        </h5>
      </div>
    </>
  );
};

export default Home;
