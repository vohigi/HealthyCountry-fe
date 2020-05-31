import React from "react";

import "./_drawerToggle.scss";

const drawerToggle = (props) => (
  <div className="drawerToggle" onClick={props.clicked}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default drawerToggle;
