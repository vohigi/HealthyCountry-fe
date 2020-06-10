import React from "react";
import { NavLink } from "react-router-dom";

import "./_navigationItem.scss";

const NavigationItem = ({ link, exact, children }) => (
  <li className="navigationItem">
    <NavLink to={link} exact={exact} activeClassName="active">
      {children}
    </NavLink>
  </li>
);

export default NavigationItem;
