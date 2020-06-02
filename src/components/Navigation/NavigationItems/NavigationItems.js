import React from "react";

import "./_navigationItems.scss";
import NavigationItem from "./Item/NavigationItem";

const NavigationItems = ({ isAuthenticated }) => {
  return (
    <ul className="navigationItems">
      {isAuthenticated ? (
        <NavigationItem link="/" exact>
          Головна
        </NavigationItem> //<NavigationItem link="/orders">Orders</NavigationItem>
      ) : null}
      {!isAuthenticated ? (
        <>
          <NavigationItem link="/login">Увійти</NavigationItem>
          <NavigationItem link="/register">Зареєструватись</NavigationItem>
        </>
      ) : (
        <NavigationItem link="/logout">Вийти з системи</NavigationItem>
      )}
    </ul>
  );
};

export default NavigationItems;
