import React from "react";

// import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import "./_sideDrawer.scss";
import Backdrop from "../../UI/Backdrop/Backdrop";

const SideDrawer = ({ open, closed, isAuth, userRole }) => {
  let attachedClasses = ["sideDrawer", "close"];
  if (open) {
    attachedClasses = ["sideDrawer", "open"];
  }
  return (
    <>
      <Backdrop show={open} clicked={closed} />
      <div className={attachedClasses.join(" ")} onClick={closed}>
        <div className="logo">{/* <Logo /> */}</div>
        <nav>
          <NavigationItems isAuthenticated={isAuth} userRole={userRole} />
        </nav>
      </div>
    </>
  );
};

export default SideDrawer;
