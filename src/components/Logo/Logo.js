import React from "react";
import logo from "../../img/HealthyCountry_logo.jpg";
const Logo = ({ imageContainerClass, imageClass }) => (
  <div className={imageContainerClass}>
    <img alt="HealthyCountry logo" src={logo} className={imageClass} />
  </div>
);
export default Logo;
