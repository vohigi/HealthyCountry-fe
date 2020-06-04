import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "./hoc/Layout";
import Logout from "./pages/logout/Logout";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import * as actions from "./redux/actions/index";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./pages/register/Register";
import AppointmentBooking from "./pages/appointment/AppointmentBooking";
import UserManagement from "./pages/management/UserManagement";
import OrganizationManagement from "./pages/management/OrganizationManagement";
import UserManagementEdit from "./pages/management/UserManagementEdit";
import UserManagementCreate from "./pages/management/UserManagementCreate";
import PatientProfile from "./pages/profile/PatientProfile";
import DoctorProfile from "./pages/profile/DoctorProfile";
import AppointementEdit from "./pages/appointment/AppointementEdit";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute
          path="/"
          exact
          component={Home}
          setAuthRedirectPath={this.props.onSetAuthRedirectPath}
          userId={this.props.userId}
          userRole={this.props.role}
          role="ANY"
        />
        <PrivateRoute
          path="/doctor/profile"
          exact
          component={DoctorProfile}
          setAuthRedirectPath={this.props.onSetAuthRedirectPath}
          userId={this.props.userId}
          userRole={this.props.role}
          role="DOCTOR"
        />
        <PrivateRoute
          path="/doctor/:doctorId"
          component={AppointmentBooking}
          setAuthRedirectPath={this.props.onSetAuthRedirectPath}
          userId={this.props.userId}
          userRole={this.props.role}
          role="PATIENT"
        />
        <PrivateRoute
          path="/appointments/:appointmentId/edit"
          component={AppointementEdit}
          setAuthRedirectPath={this.props.onSetAuthRedirectPath}
          userId={this.props.userId}
          userRole={this.props.role}
          role="DOCTOR"
        />
        <PrivateRoute
          path="/management/users"
          exact
          component={UserManagement}
          setAuthRedirectPath={this.props.onSetAuthRedirectPath}
          userId={this.props.userId}
          userRole={this.props.role}
          role="ADMIN"
        />
        {console.log(this.props.role)}
        <PrivateRoute
          path="/management/users/create"
          exact
          component={UserManagementCreate}
          setAuthRedirectPath={this.props.onSetAuthRedirectPath}
          userId={this.props.userId}
          userRole={this.props.role}
          role="ADMIN"
        />
        <PrivateRoute
          path="/management/users/:userId/edit"
          component={UserManagementEdit}
          setAuthRedirectPath={this.props.onSetAuthRedirectPath}
          userId={this.props.userId}
          userRole={this.props.role}
          role="ADMIN"
        />
        <PrivateRoute
          path="/management/organizations"
          component={OrganizationManagement}
          setAuthRedirectPath={this.props.onSetAuthRedirectPath}
          userId={this.props.userId}
          userRole={this.props.role}
          role="ADMIN"
        />
        <PrivateRoute
          path="/patient/profile"
          component={PatientProfile}
          setAuthRedirectPath={this.props.onSetAuthRedirectPath}
          userId={this.props.userId}
          userRole={this.props.role}
          role="PATIENT"
        />
        <Route path="/logout" component={Logout} />
        {/* <Redirect to="/" /> */}
      </Switch>
    );

    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    userId: state.auth.userId,
    user: state.auth.user,
    role: state.auth.role,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
    onSetAuthRedirectPath: (path) =>
      dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
