import React, { Component, lazy } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "./hoc/layout";
import * as actions from "./redux/actions/index";
import PrivateRoute from "./components/PrivateRoute";
import "./antdGlobalCss";
import AppointmentView from "./pages/appointment/AppointmentView";
const Home = lazy(() => import("./pages/home/Home"));
const Login = lazy(() => import("./pages/login/Login"));
const Logout = lazy(() => import("./pages/logout/Logout"));
const Register = lazy(() => import("./pages/register/Register"));
const AppointmentBooking = lazy(() =>
  import("./pages/appointment/AppointmentBooking")
);
const UserManagement = lazy(() => import("./pages/management/UserManagement"));
const OrganizationManagement = lazy(() =>
  import("./pages/management/OrganizationManagement")
);
const UserManagementEdit = lazy(() =>
  import("./pages/management/UserManagementEdit")
);
const UserManagementCreate = lazy(() =>
  import("./pages/management/UserManagementCreate")
);
const PatientProfile = lazy(() => import("./pages/profile/PatientProfile"));
const DoctorProfile = lazy(() => import("./pages/profile/DoctorProfile"));
const AppointementEdit = lazy(() =>
  import("./pages/appointment/AppointementEdit")
);
const News = lazy(() => import("./pages/home/News"));

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
          component={News}
          setAuthRedirectPath={this.props.onSetAuthRedirectPath}
          userId={this.props.userId}
          userRole={this.props.role}
          role="ANY"
        />
        <PrivateRoute
          path="/doctors"
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
          role="ANY"
        />
        <PrivateRoute
          path="/appointments/:appointmentId/view"
          component={AppointmentView}
          setAuthRedirectPath={this.props.onSetAuthRedirectPath}
          userId={this.props.userId}
          userRole={this.props.role}
          role="PATIENT"
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
