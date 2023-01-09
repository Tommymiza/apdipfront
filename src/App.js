import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Alert, ThemeProvider } from "@mui/material";
import { theme } from "./components/Outils/theme";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Activity from "./components/Activity";
import Product from "./components/Product";
import Axios from "axios";
import "./styles/app.scss";
import Gestion from "./components/Gestion";
import Contact from "./components/Contact";
import Notfound from "./components/Notfound";

export const ActContext = createContext();

function App() {
  const [connected, setConnected] = useState(false);
  const [user, setUser] = useState();
  const [width, setWidth] = useState(document.body.offsetWidth);
  const [notif, setNotif] = useState();
  const [panier, setPanier] = useState([]);
  const [activity, setActivity] = useState([]);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const server = "https://apdipback.vercel.app/";

  function login(data) {
    setUser(data);
    localStorage.setItem("user", data.id);
    setConnected(true);
  }
  function get() {
    setLoading(true);
    var promise = [];
    setTimeout(() => {
      promise.push(
        Axios({
          url: server + "/activity",
          method: "get",
        }).then((res) => {
          setActivity(res.data);
        })
      );
      promise.push(
        Axios({
          url: server + "/product",
          method: "get",
        }).then((res) => {
          setProduct(res.data);
        })
      );
      Promise.all(promise)
        .catch((err) => {
          setNotif({ severity: "error", message: "Connection error!" });
        })
        .finally(() => {
          setLoading(false);
        });
    }, 2000);
  }
  useEffect(() => {
    if (notif) {
      setTimeout(() => {
        setNotif();
      }, 4000);
    }
  }, [notif]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(document.body.offsetWidth);
    });
    setLoading(true);
    if (localStorage.getItem("user")) {
      Axios({
        method: "get",
        url: server + "/user/byid",
        params: {
          id: localStorage.getItem("user"),
        },
      })
        .then((res) => {
          if (res.data.status) {
            setNotif({ severity: "error", message: res.data.status });
          } else {
            setConnected(true);
            setUser(res.data[0]);
          }
        })
        .catch((err) => {
          setNotif({ severity: "error", message: "Connection error!" });
        });
    }
    get();
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ActContext.Provider
          value={{
            server,
            connected,
            user,
            width,
            setConnected,
            setUser,
            login,
            setNotif,
            setActivity,
            setProduct,
            activity,
            product,
            loading,
            get,
            panier,
            setPanier,
          }}
        >
          <header>
            <Navbar />
          </header>
          <section>
            <Routes>
              <Route element={<Home />} path="/"></Route>
              <Route element={<Activity />} path="/activity"></Route>
              <Route element={<Product />} path="/product"></Route>
              <Route element={<Gestion />} path="/gestion"></Route>
              <Route element={<Contact />} path="/contact-us"></Route>
              <Route element={<Notfound />} path="/*"></Route>
            </Routes>
          </section>
          {notif && (
            <Alert
              onClose={() => setNotif()}
              variant="filled"
              severity={notif.severity}
              sx={{
                width: "300px",
                position: "fixed",
                top: "50px",
                left: "50%",
                zIndex: 1000,
                transform: "translateX(-50%)",
              }}
            >
              {notif.message}
            </Alert>
          )}
        </ActContext.Provider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
