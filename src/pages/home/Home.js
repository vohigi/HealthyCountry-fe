import React, { Component } from "react";
import PropTypes from "prop-types";
import Loader from "../../components/Loader/Loader";
import DoctorCard from "../../components/DoctorCard/DoctorCard";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/index";
import "./_home.scss";
import Input from "../../components/UI/Input/Input";
import { updateObject } from "../../shared/utility";
import Pagination from "../../components/UI/Pagination";
import { Fragment } from "react";

class Home extends Component {
  state = {
    query: "",
    currentPage: 1,
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
          options: [
            { label: "-", value: null },
            { label: "Тестова Поліклініка", value: "650d70c4-5136-4c13-9a60-aa3aebae8ea5" }
          ],
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
  handlePageClick(page) {
    const selectedPage = page;
    console.log(page);
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
    const params = {
      page: this.state.currentPage,
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
      limit: this.props.limit,
    };
    this.props.onGetDoctors(params);
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
    const updatedObject =
      controlName === "sort"
        ? { controls: updatedControls }
        : { currentPage: 1, controls: updatedControls };
    this.setState(updatedObject, () => {
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
    const elemCount = formElementsArray.length;
    let form = formElementsArray.map((formElement, i) => (
      <Fragment key={formElement.id}>
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
        {elemCount !== i + 1 ? <div className="filtersDivider"></div> : null}
      </Fragment>
    ));
    const { doctors, loading, errors, pageCount, limit } = this.props;
    return (
      <>
        <div className="homeStickyHeader">
          <div className="homeStickyHeaderLeft"></div>
          <div className="homeStickyHeaderRight">
            <div className="search">
              <div className="searchInputContainer">
                <input
                  type="text"
                  placeholder="Введіть прізвище лікаря"
                  className="searchInput"
                  value={this.state.query}
                  onChange={(e) => this.handleSearchChange(e)}
                />
              </div>
              <button className="searchButton" onClick={() => this.loadData()}>
                Пошук
              </button>
            </div>
          </div>
        </div>
        <div className="homeContainer">
          <div className="homeContainerControls">
            <h6 className="font-20 font-b homeContainerControlsHeader">
              Фільтри
            </h6>
            {/* <button
              className="searchButton"
              onClick={() => this.resetFilters()}
            >
              Скинути
            </button> */}
            {form}
          </div>
          <div className="cardsHolder">
            {loading && <Loader />}
            {/* {errors && <p>{errors}</p>} */}
            {doctors &&
              !loading &&
              doctors.map(
                (
                  {
                    id:userId,
                    firstName,
                    lastName,
                    middleName,
                    organization,
                    specialization,
                    gender
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
                    sex={gender==="MALE"}
                    appointmentClickHandler={(e, id) =>
                      this.handleAppointmentClick(id)
                    }
                  />
                )
              )}
          </div>
        </div>
        {!loading && (
          <Pagination
            containerClassName="pagianateContainer"
            current={this.state.currentPage}
            pageSize={limit}
            onChange={(e) => this.handlePageClick(e)}
            total={pageCount * limit}
          />
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loading: state.doctors.loading,
    errors: state.doctors.errors,
    doctors: state.doctors.doctors,
    length: state.doctors.length,
    pageCount: state.doctors.pageCount,
    limit: state.doctors.limit,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetDoctors: (params) => dispatch(actions.getDoctors(params)),
  };
};
Home.propTypes = {
  loading: PropTypes.bool,
  errors: PropTypes.any,
  doctors: PropTypes.array,
  length: PropTypes.number,
  pageCount: PropTypes.number,
  limit: PropTypes.number,
};
Home.defaultProps = {
  loading: true,
  errors: null,
  doctors: [],
  length: 0,
  pageCount: 0,
  limit: 0,
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
