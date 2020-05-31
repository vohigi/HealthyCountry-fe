import React from "react";

import "./_navigationItems.scss";
import NavigationItem from "./Item/NavigationItem";

const NavigationItems = (props) => {
  return (
    <ul className="navigationItems">
      <NavigationItem link="/" exact>
        Головна
      </NavigationItem>
      {props.isAuthenticated
        ? //<NavigationItem link="/orders">Orders</NavigationItem>
          null
        : null}
      {!props.isAuthenticated ? (
        <NavigationItem link="/login">Увійти</NavigationItem>
      ) : (
        <NavigationItem link="/logout">Вийти з системи</NavigationItem>
      )}
    </ul>
  );
};

export default NavigationItems;
