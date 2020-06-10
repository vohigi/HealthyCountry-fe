import React from "react";

import "./_navigationItems.scss";
import NavigationItem from "./Item/NavigationItem";
import NavigationItemDropdown from "./Item/NavigationItemDropdown";

const NavigationItems = ({ isAuthenticated, userRole, userId, isOpen }) => {
  return (
    <ul className="navigationItems">
      {isAuthenticated && (userRole === "PATIENT" || userRole === "ADMIN") ? (
        // <NavigationItem link="/" exact>
        //   Головна
        // </NavigationItem>
        <NavigationItemDropdown
          isOpen
          name="Головна"
          links={[
            { link: "/", exact: true, children: "Новини" },
            { link: "/search", exact: true, children: "Пошук" },
          ]}
        />
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
        </NavigationItem>
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
