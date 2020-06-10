import React from "react";
import "./_navigationItem.scss";
import NavigationItem from "./NavigationItem";

const NavigationItemDropdown = ({ name, links, isOpen }) => (
  <li className="navigationItem dropdownContainer">
    <a href="#">{name}</a>
    <ul className="navigationItemDropdown">
      {links &&
        links.map((link, index) => (
          <NavigationItem key={index} exact={link.exact} link={link.link}>
            {link.children}
          </NavigationItem>
        ))}
    </ul>
  </li>
);

export default NavigationItemDropdown;
