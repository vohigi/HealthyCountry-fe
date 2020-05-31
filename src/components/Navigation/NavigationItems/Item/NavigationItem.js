import React from "react";
import { NavLink } from "react-router-dom";

import "./_navigationItem.scss";

const NavigationItem = (props) => (
  <li className="navigationItem">
    <NavLink to={props.link} exact={props.exact} activeClassName="active">
      {props.children}
    </NavLink>
  </li>
);

export default NavigationItem;
