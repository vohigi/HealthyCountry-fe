import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Loader from "../../components/Loader/Loader";
import DoctorCard from "../../components/DoctorCard/DoctorCard";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/index";
import "./_home.scss";

class Home extends Component {
  state = {
    doctorData: "",
    query: "",
    currentPage: 1,
    pageCount: 0,
    limit: 30,
    loading: true,
  };
  handlePageClick(e) {
    const selectedPage = e.selected;
    this.setState(
      {
        currentPage: selectedPage,
      },
      () => {
        this.loadData();
      }
    );
  }
  handleSearchChange(e) {
    this.setState({
      query: e.target.value,
    });
  }
  handleAppointmentClick(id) {
    console.log(id);
    this.props.history.push("/doctor/" + id);
  }
  loadData() {
    this.setState({
      loading: true,
    });
    axios
      .get("api/users/doctors", {
        headers: {
          Authorization: "Bearer " + this.props.token,
        },
        params: {
          page: this.state.currentPage,
          name: this.state.query,
          limit: 30,
        },
      })
      .then((response) =>
        this.setState({
          doctorData: response.data.data,
          loading: false,
          pageCount:
            response.data.paging.length % 30 === 0
              ? response.data.paging.length / 30
              : Math.floor(response.data.paging.length / 30) + 1,
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
        <div className="search">
          <input
            type="text"
            placeholder="Введіть прізвище лікаря"
            className="searchInput"
            value={this.state.query}
            onChange={(e) => this.handleSearchChange(e)}
          />
          <button className="searchButton" onClick={() => this.loadData()}>
            Пошук
          </button>
        </div>
        {loading && <Loader />}
        <div className="cards-holder">
          {doctorData &&
            !loading &&
            doctorData.map(
              ({ userId, firstName, lastName, middleName, organization }) => (
                <DoctorCard
                  key={userId}
                  userId={userId}
                  firstName={firstName}
                  lastName={lastName}
                  middleName={middleName}
                  address={organization.address}
                  orgName={organization.name}
                  appointmentClickHandler={(e, id) =>
                    this.handleAppointmentClick(id)
                  }
                />
              )
            )}
        </div>
        {!loading && (
          <div className="pagianateContainer">
            <ReactPaginate
              previousLabel={"Попередня"}
              nextLabel={"Наступна"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={this.state.pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={(e) => this.handlePageClick(e)}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </div>
        )}
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
