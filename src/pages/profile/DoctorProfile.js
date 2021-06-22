import React, { Component } from "react";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import DoctorInfo from "../../components/DoctorInfo/DoctorInfo";
import { getBearer, openInNewTab } from "../../shared/utility";
import AppointmentsDisplay from "../../components/AppointmentsDisplay/AppointmentsDisplay";
import { Form, Button, Input, List, Select, DatePicker, Divider } from "antd";
import locale from "antd/es/date-picker/locale/uk_UA";
import moment from "moment";
import "moment/locale/uk";
import DrawerForm from "../../components/DrawerForm";
const { Option } = Select;

class DoctorProfile extends Component {
  printFormRef = React.createRef();
  constructor(props) {
    super(props);

    this.state = {
      doctorData: null,
      appointments: [],
      loading: true,
      currentTab: "today",
      printDrawerVisible: false,
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
  onPrintVisibilityChange(action) {
    switch (action) {
      case "open":
        this.setState({ printDrawerVisible: true });
        break;
      case "close":
        this.setState({ printDrawerVisible: false });
        this.printFormRef.current.resetFields();
        break;
      default:
        break;
    }
  }
  onPrintSubmit(values) {
    const url = `http://localhost:5000/api/appointments/${
      this.state.doctorData.userId
    }/print?startDate=${values.dateStart.format(
      "YYYY-MM-DD"
    )}&endDate=${values.dateEnd.format("YYYY-MM-DD")}&format=${values.format}`;
    openInNewTab(url);
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
        {appointments && doctorData && (
          <AppointmentsDisplay
            onPrintClick={this.onPrintVisibilityChange.bind(this)}
            doctorId={doctorData.userId}
            appointments={this.getList(currentTab, appointments)}
            currentTab={currentTab}
            changeTabClickHandler={this.onTabChangeClick.bind(this)}
            enableControls={true}
            handleCancelClick={this.onCancelClick.bind(this)}
            handleStartClick={this.onStartClick.bind(this)}
          />
        )}
        <DrawerForm
          visible={this.state.printDrawerVisible}
          title="Форма 074/о"
          onSubmit={(values) => this.onPrintSubmit(values)}
          onClose={() => this.onPrintVisibilityChange("close")}
          formRef={this.printFormRef}
          submitBtnText="Роздрукувати"
        >
          <Form.Item
            label="Дата з"
            name="dateStart"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <DatePicker locale={locale} />
          </Form.Item>
          <Form.Item
            label="Дата по"
            name="dateEnd"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <DatePicker locale={locale} />
          </Form.Item>
          <Form.Item
            label="Формат"
            name="format"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Select>
              <Option value="PDF">Pdf</Option>
              <Option value="DOCX">Docx</Option>
            </Select>
          </Form.Item>
        </DrawerForm>
      </div>
    );
  }
}
export default DoctorProfile;
