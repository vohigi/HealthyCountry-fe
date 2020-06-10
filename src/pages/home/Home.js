import React, { Component } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Loader from "../../components/Loader/Loader";
import DoctorCard from "../../components/DoctorCard/DoctorCard";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/index";
import "./_home.scss";
import Input from "../../components/UI/Input/Input";
import { updateObject } from "../../shared/utility";
class Home extends Component {
  state = {
    doctorData: "",
    query: "",
    currentPage: 0,
    pageCount: 0,
    limit: 30,
    loading: true,
    controls: {
      sort: {
        label: "Сортування",
        elementType: "select",
        elementConfig: {
          options: [
            { label: "За прізвищем А-Я", value: "lastName_asc" },
            { label: "За прізвищем Я-А", value: "lastName_desc" },
          ],
          placeholder: "Сортувати за...",
        },
        value: "",
      },
      organization: {
        label: "Організація",
        elementType: "select",
        elementConfig: {
          options: [{ label: "Тестова Поліклініка", value: "org_1" }],
          placeholder: "Організація",
        },
        value: "",
      },
      specialization: {
        label: "Спеціальність",
        elementType: "select",
        elementConfig: {
          options: [
            { label: "Терапевт", value: "Therapist" },
            { label: "Педіатр", value: "Pediatrician" },
          ],
          placeholder: "Спеціальність",
        },
        value: "",
      },
    },
  };
  handlePageClick(e) {
    const selectedPage = e.selected;
    console.log(e);
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
          page: this.state.currentPage + 1,
          name: this.state.query,
          ...(this.state.controls.sort.value && {
            sort: this.state.controls.sort.value.value,
          }),
          ...(this.state.controls.specialization.value && {
            spec: this.state.controls.specialization.value.value,
          }),
          ...(this.state.controls.organization.value && {
            orgId: this.state.controls.organization.value.value,
          }),
          limit: 2,
        },
      })
      .then((response) =>
        this.setState({
          doctorData: response.data.data,
          loading: false,
          pageCount:
            response.data.paging.length % 2 === 0
              ? response.data.paging.length / 2
              : Math.floor(response.data.paging.length / 2) + 1,
        })
      );
  }
  resetFilters() {
    const updatedControls = updateObject(this.state.controls, {
      organization: updateObject(this.state.controls.organization, {
        value: "",
      }),
      sort: updateObject(this.state.controls.sort, {
        value: "",
      }),
      specialization: updateObject(this.state.controls.specialization, {
        value: "",
      }),
    });
    this.setState({ controls: updatedControls }, () => {
      this.loadData();
    });
  }
  componentDidMount() {
    this.loadData();
  }
  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event,
      }),
    });
    this.setState({ controls: updatedControls }, () => {
      this.loadData();
    });
  };
  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let form = formElementsArray.map((formElement) => (
      <Input
        key={formElement.id}
        label={formElement.config.label}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
      />
    ));
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
        <div className="homeContainer">
          <div className="homeContainerControls">
            <button
              className="searchButton"
              onClick={() => this.resetFilters()}
            >
              Скинути
            </button>
            {form}
          </div>
          <div className="cardsHolder">
            {loading && <Loader />}
            {doctorData &&
              !loading &&
              doctorData.map(
                (
                  {
                    userId,
                    firstName,
                    lastName,
                    middleName,
                    organization,
                    specialization,
                  },
                  index
                ) => (
                  <DoctorCard
                    isCat={index % 2 === 0}
                    key={userId}
                    userId={userId}
                    firstName={firstName}
                    lastName={lastName}
                    middleName={middleName}
                    address={organization.address}
                    orgName={organization.name}
                    spec={specialization}
                    appointmentClickHandler={(e, id) =>
                      this.handleAppointmentClick(id)
                    }
                  />
                )
              )}
          </div>
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
              forcePage={this.state.currentPage}
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
