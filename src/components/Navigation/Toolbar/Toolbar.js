import React from "react";

import "./_toolbar.scss";
//import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const toolbar = (props) => (
  <header className="toolbar">
    <DrawerToggle clicked={props.drawerToggleClicked} />
    <div className="logo">{/* <Logo /> */}</div>
    <nav className="desktopOnly">
      <NavigationItems isAuthenticated={props.isAuth} />
    </nav>
  </header>
);

export default toolbar;
