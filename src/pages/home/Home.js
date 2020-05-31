import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import DoctorCard from "../../components/DoctorCard/DoctorCard";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/index";
import "./_home.scss";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weatherInfo: "",
      loading: true,
    };
  }
  loadData() {
    axios
      .get("api/users", {
        headers: {
          Authorization: "Bearer " + this.props.token,
        },
      })
      .then((response) =>
        this.setState({
          doctorData: response.data,
          loading: false,
        })
      );
  }
  componentDidMount() {
    this.loadData();
  }
  render() {
    const { doctorData, loading } = this.state;
    return (
      <>
        {loading && <Loader />}
        <div className="search">
          <input
            type="text"
            placeholder="Введіть прізвище лікаря"
            className="searchInput"
          />
          <button className="searchButton">Пошук</button>
        </div>
        <div className="cards-holder">
          {doctorData &&
            doctorData.map(
              ({ userId, firstName, lastName, middleName, organization }) => (
                <DoctorCard
                  key={userId}
                  firstName={firstName}
                  lastName={lastName}
                  middleName={middleName}
                  address={organization.address}
                  orgName={organization.name}
                />
              )
            )}
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    errors: state.auth.errors,
    isAuthenticated: state.auth.token !== null,
    loginRedirectPath: state.auth.authRedirectPath,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
