import React, { Component } from "react";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import DoctorInfo from "../../components/DoctorInfo/DoctorInfo";
import { getBearer } from "../../shared/utility";

class PatientProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      patientData: null,
      appointments: [],
      loading: true,
    };
  }
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
  componentDidMount() {
    this.loadData();
  }
  render() {
    const { patientData, loading } = this.state;
    return (
      <div>
        {loading && <Loader />}
        {patientData && (
          <DoctorInfo
            firstName={patientData.firstName}
            lastName={patientData.lastName}
            middleName={patientData.middleName}
            phone={patientData.phone}
          />
        )}
      </div>
    );
  }
}
export default PatientProfile;
