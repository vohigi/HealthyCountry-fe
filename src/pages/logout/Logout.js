import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../../redux/actions/index";

class Logout extends Component {
  componentDidMount() {
    this.props.onLogout();
    console.log("logout + logout");
  }

  render() {
    return <Redirect to="/login" />;
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
