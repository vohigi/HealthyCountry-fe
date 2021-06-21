import React, { Component } from "react";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import DoctorInfo from "../../components/DoctorInfo/DoctorInfo";
import { getBearer } from "../../shared/utility";
import AppointmentsDisplay from "../../components/AppointmentsDisplay/AppointmentsDisplay";
import moment from "moment";

class DoctorProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      doctorData: null,
      appointments: [],
      loading: true,
      currentTab: "today",
    };
  }
  getList = (tab, apps) => {
    let list = [];
    switch (tab) {
      case "past":
        list = apps.filter(
          (appointment) =>
            moment().startOf("day").diff(appointment.dateTime, "days") > 0
        );
        break;
      case "today":
        list = apps.filter((appointment) => {
          return (
            moment().startOf("day").diff(appointment.dateTime, "days") === 0
          );
        });
        break;
      case "future":
        list = apps.filter(
          (appointment) =>
            moment().startOf("day").diff(appointment.dateTime, "days") < 0
        );
        break;
      default:
        list = apps.filter((appointment) => {
          return (
            moment().startOf("day").diff(appointment.dateTime, "days") === 0
          );
        });
        break;
    }
    return list;
  };
  loadData() {
    axios
      .get(`/api/users/${localStorage.getItem("userId")}`, {
        headers: {
          Authorization: "Bearer " + getBearer(),
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
      .get(`/api/appointments/doctor/${localStorage.getItem("userId")}`, {
        headers: {
          Authorization: "Bearer " + getBearer(),
        },
      })
      .then((response) =>
        this.setState({
          appointments: response.data,
          loading: false,
        })
      );
  }
  onStartClick(appointmentId, needToChangeStatus) {
    if (needToChangeStatus) {
      const data = this.state.appointments.find(
        (appointment) => appointment.appointmentId == appointmentId
      );
      data.status = "INPROGRESS";
      console.log(data);
      axios
        .patch(`/api/appointments/${data.appointmentId}`, data, {
          headers: {
            Authorization: "Bearer " + getBearer(),
          },
        })
        .then((response) => {
          this.props.history.push(`/appointments/${appointmentId}/edit`);
        });
      return;
    }
    this.props.history.push(`/appointments/${appointmentId}/edit`);
  }
  onCancelClick(appointmentId) {
    const data = this.state.appointments.find(
      (appointment) => appointment.appointmentId === appointmentId
    );
    data.status = "CANCELED";
    axios
      .patch(`/api/appointments/${appointmentId}`, data, {
        headers: {
          Authorization: "Bearer " + getBearer(),
        },
      })
      .then((response) => this.loadData());
  }
  onTabChangeClick(tab) {
    this.setState({
      currentTab: tab,
    });
  }
  componentDidMount() {
    this.loadData();
  }
  render() {
    const { doctorData, loading, appointments, currentTab } = this.state;
    return (
      <div>
        {loading && <Loader />}
        {doctorData && (
          <DoctorInfo
            firstName={doctorData.firstName}
            lastName={doctorData.lastName}
            middleName={doctorData.middleName}
            address={doctorData.organization.address}
            orgName={doctorData.organization.name}
            phone={doctorData.phone}
            spec={doctorData.specialization}
          />
        )}
        {appointments && (
          <AppointmentsDisplay
            appointments={this.getList(currentTab, appointments)}
            currentTab={currentTab}
            changeTabClickHandler={this.onTabChangeClick.bind(this)}
            enableControls={true}
            handleCancelClick={this.onCancelClick.bind(this)}
            handleStartClick={this.onStartClick.bind(this)}
          />
        )}
      </div>
    );
  }
}
export default DoctorProfile;
