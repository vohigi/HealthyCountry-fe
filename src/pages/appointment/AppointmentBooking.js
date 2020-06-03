import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import DoctorCard from "../../components/DoctorCard/DoctorCard";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/index";
import "./_appointmentBooking.scss";
import DoctorInfo from "../../components/DoctorInfo/DoctorInfo";
import AppointmentGrid from "../../components/AppointmentGrid/AppointmentGrid";

class AppointmentBooking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      doctorData: { organization: {} },
      appointments: [],
      loading: true,
    };
  }
  loadData() {
    axios
      .get(`/api/users/${this.props.match.params.doctorId}`, {
        headers: {
          Authorization: "Bearer " + this.props.token,
        },
      })
      .then((response) => {
        console.log(response);
        this.setState({
          doctorData: response.data,
        });
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`/api/appointments/${this.props.match.params.doctorId}`, {
        headers: {
          Authorization: "Bearer " + this.props.token,
        },
      })
      .then((response) =>
        this.setState({
          appointments: response.data,
          loading: false,
        })
      );
  }
  handleAppointmentClick(id) {
    this.setState({
      loading: true,
    });
    console.log(id);
    console.log(this.state.appointments);
    const appointment = this.state.appointments.find(
      (appointment) => appointment.appointmentId === id
    );
    console.log(appointment);
    appointment.status = "BOOKED";
    appointment.patientId = localStorage.getItem("userId");
    axios
      .patch(`/api/appointments/${id}`, appointment, {
        headers: {
          Authorization: "Bearer " + this.props.token,
        },
      })
      .then((response) => {
        this.setState({
          //appointments: response.data,
          loading: false,
        });
        this.loadData();
      })
      .catch((errors) => {
        this.setState({ errors: errors.data });
      });
  }
  componentDidMount() {
    this.loadData();
  }
  render() {
    const { doctorData, loading, appointments } = this.state;
    return (
      <>
        {loading && <Loader />}
        {doctorData.lastName && (
          <DoctorInfo
            firstName={doctorData.firstName}
            lastName={doctorData.lastName}
            middleName={doctorData.middleName}
            address={doctorData.organization.address}
            orgName={doctorData.organization.name}
            phone={doctorData.phone}
          />
        )}
        <div className="appointmentContainer">
          {appointments && (
            <AppointmentGrid
              appointments={appointments}
              appointmentClickHandler={(e, id) =>
                this.handleAppointmentClick(id)
              }
            />
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
export default connect(mapStateToProps, mapDispatchToProps)(AppointmentBooking);
