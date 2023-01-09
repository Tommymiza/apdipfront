import React from "react";
import Lottie from "react-lottie";
import Loadlottie from "../Lotties/127085-please-wait.json"


const Progress = () => {
  const animatedLottie = {
    loop: true,
    autoplay: true,
    animationData: Loadlottie,
  };
  return (
      <Lottie options={animatedLottie} style={{width: "150px"}} />
  );
};

export default Progress;
