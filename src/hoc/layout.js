import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import "./_layout.scss";
import Toolbar from "../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <>
        {this.props.location.pathname !== "/login" &&
        this.props.location.pathname !== "/register" ? (
          <>
            <Toolbar
              isAuth={this.props.isAuthenticated}
              userRole={this.props.userRole}
              drawerToggleClicked={this.sideDrawerToggleHandler}
            />
            <SideDrawer
              isAuth={this.props.isAuthenticated}
              userRole={this.props.userRole}
              open={this.state.showSideDrawer}
              closed={this.sideDrawerClosedHandler}
            />
          </>
        ) : null}

        <main className="content">{this.props.children}</main>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    userRole: state.auth.user ? state.auth.user.role : "",
  };
};

export default withRouter(connect(mapStateToProps)(Layout));
