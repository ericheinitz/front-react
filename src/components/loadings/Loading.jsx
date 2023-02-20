import React from "react";
import "./Loading.css";
import middleCodeLogo from "../../assets/img/middle-code-logo.png"

const Loading = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <img src={middleCodeLogo}/>
      </div>
    </div>
  );
};

export default Loading;
