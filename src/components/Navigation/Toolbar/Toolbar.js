import React from "react";

import "./_toolbar.scss";
//import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const Toolbar = ({ drawerToggleClicked, isAuth, userRole }) => (
  <header className="toolbar">
    <DrawerToggle clicked={drawerToggleClicked} />
    <div className="logo">{/* <Logo /> */}</div>
    <nav className="desktopOnly">
      <NavigationItems
        isAuthenticated={isAuth}
        userRole={userRole}
        isOpen={false}
      />
    </nav>
  </header>
);

export default Toolbar;
