import React, { Component } from "react";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import UserInfo from "../../components/DoctorInfo/UserInfo";
import { getBearer } from "../../shared/utility";
import AppointmentsDisplay from "../../components/AppointmentsDisplay/AppointmentsDisplay";
import moment from "moment";

class PatientProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      patientData: null,
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
          patientData: response.data,
        });
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`/api/appointments/patient/${localStorage.getItem("userId")}`, {
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
  onTabChangeClick(tab) {
    this.setState({
      currentTab: tab,
    });
  }
  componentDidMount() {
    this.loadData();
  }
  render() {
    const { patientData, loading, appointments, currentTab } = this.state;
    return (
      <div>
        {loading && <Loader />}
        {patientData && (
          <UserInfo
            isPatient={true}
            firstName={patientData.firstName}
            lastName={patientData.lastName}
            middleName={patientData.middleName}
            phone={patientData.phone}
            birthDate={patientData.birthDate}
            gender={patientData.gender}
          />
        )}
        {appointments && (
          <AppointmentsDisplay
            appointments={this.getList(currentTab, appointments)}
            currentTab={currentTab}
            changeTabClickHandler={this.onTabChangeClick.bind(this)}
          />
        )}
      </div>
    );
  }
}
export default PatientProfile;
