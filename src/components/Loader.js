import React from "react";
import Lottie from "react-lottie";
import LoadPage from "./LoadPage.json";
const Loader = ({loader_color}) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadPage,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className={`empty-loader flex aic jc ${loader_color && 'loader-grey'}`}>
      <Lottie options={defaultOptions} height={200} width={200} />
    </div>
  );
};

export default Loader;
