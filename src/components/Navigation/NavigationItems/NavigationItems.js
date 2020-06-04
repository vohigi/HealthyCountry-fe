import React from "react";

import "./_navigationItems.scss";
import NavigationItem from "./Item/NavigationItem";

const NavigationItems = ({ isAuthenticated, userRole, userId }) => {
  return (
    <ul className="navigationItems">
      {isAuthenticated && (userRole === "PATIENT" || userRole === "ADMIN") ? (
        <NavigationItem link="/" exact>
          Головна
        </NavigationItem> //<NavigationItem link="/orders">Orders</NavigationItem>
      ) : null}
      {isAuthenticated && userRole === "ADMIN" ? (
        <>
          <NavigationItem link="/management/users">Користувачі</NavigationItem>
          {/* <NavigationItem link="/management/organizations">
            Організації
          </NavigationItem> */}
        </>
      ) : null}
      {isAuthenticated ? (
        <NavigationItem
          link={userRole === "PATIENT" ? "/patient/profile" : `/doctor/profile`}
          exact
        >
          Профіль
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
