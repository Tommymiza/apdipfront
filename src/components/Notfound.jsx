import React from "react";
import Lottie from "react-lottie";
import Loadlottie from "./Lotties/127769-shark-island-404.json";

const Notfound = () => {
  const animatedLottie = {
    loop: true,
    autoplay: true,
    animationData: Loadlottie,
  };
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Lottie options={animatedLottie} style={{ width: "300px" }} />
    </div>
  );
};

export default Notfound;
