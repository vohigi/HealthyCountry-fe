import React, { Component } from "react";
import Loader from "../../components/Loader/Loader";
import { checkValidity, updateObject, getBearer } from "../../shared/utility";
import { Form, Button, Input } from "antd";
import axios from "axios";
import AsyncSelect from "../../components/UI/AsyncSelect";
import "./_appointmentBooking.scss";
const { TextArea } = Input;
//import Button from "../../components/UI/Button/Button";
// import Input from "../../components/UI/Input/Input";

class AppointementEdit extends Component {
  state = {
    appointment: null,
    loading: true,
    errors: null,
    reason: {
      value: null,
    },
  };

  componentDidMount() {
    this.loadData();
  }
  loadData() {
    axios
      .get(`/api/appointments/${this.props.match.params.appointmentId}/one`, {
        headers: {
          Authorization: "Bearer " + getBearer(),
        },
      })
      .then((response) => {
        this.setState({ appointment: response.data });
      });
  }
  inputChangedHandler = (event, controlName) => {
    console.log(event);
    console.log(controlName);
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value:
          this.state.controls[controlName].elementType === "date"
            ? event.toISOString()
            : this.state.controls[controlName].elementType === "select" ||
              this.state.controls[controlName].elementType === "asyncSelect"
            ? event
            : event.target.value,
        valid:
          this.state.controls[controlName].elementType === "date" ||
          this.state.controls[controlName].elementType === "select" ||
          this.state.controls[controlName].elementType === "asyncSelect"
            ? true
            : checkValidity(
                event.target.value,
                this.state.controls[controlName].validation
              ),
        touched: true,
      }),
    });
    this.setState({ controls: updatedControls });
  };
  submitHandler(values) {
    console.log(values);
    const data = this.state.appointment;
    data.diagnosisId = values.diagnosis.value;
    data.reasonId = values.reason.value;
    data.actionId = values.action.value;
    data.comment = values.comment;
    data.status = "FINISHED";
    console.log(data);
    axios
      .patch(`/api/appointments/${data.appointmentId}`, data, {
        headers: {
          Authorization: "Bearer " + getBearer(),
        },
      })
      .then((response) => {
        this.props.history.push("/doctor/profile");
      });
  }
  newChangeHandler = (value) => {
    console.log(value);
    const updatedControls = updateObject(this.state.reason, {
      value: value,
    });
    this.setState({ reason: updatedControls });
  };
  searchCode = (inputValue, group) => {
    return new Promise((resolve) =>
      axios
        .get(`/api/appointments/icpc2`, {
          params: {
            search: inputValue,
            groupId:
              group === "reason"
                ? "REASON"
                : group === "diagnosis"
                ? "RESULT"
                : "ACTION",
          },
        })
        .then((response) => {
          let rscr = response.data.data.map((icpcEntity) => ({
            label: `${icpcEntity.name} ${icpcEntity.code}`,
            value: icpcEntity.id,
          }));
          console.log(rscr);
          resolve(rscr);
        })
    );
  };
  render() {
    const formItemLayout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 24,
      },
    };

    let errorMessage = null;

    if (this.props.errors) {
      errorMessage = this.props.errors.map((error, index) => (
        <p key={index} style={{ color: "red" }}>
          {error.messages[0]}
        </p>
      ));
    }
    return (
      <div className="register">
        {errorMessage}
        <Form
          {...formItemLayout}
          layout="vertical"
          requiredMark={false}
          onFinish={(values) => this.submitHandler(values)}
        >
          <Form.Item
            label="Причина"
            name="reason"
            rules={[
              {
                required: true,
                message: "Оберіть причину взаємодії",
              },
            ]}
          >
            <AsyncSelect
              placeholder="Оберіть причину взаємодії"
              fetchOptions={(input) => this.searchCode(input, "reason")}
              showSearch={true}
              style={{
                width: "100%",
              }}
              allowClear
            />
          </Form.Item>

          <Form.Item
            label="Діагноз"
            name="diagnosis"
            rules={[
              {
                required: true,
                message: "Оберіть причину взаємодії",
              },
            ]}
          >
            <AsyncSelect
              placeholder="Оберіть діагноз"
              fetchOptions={(input) => this.searchCode(input, "diagnosis")}
              showSearch={true}
              style={{
                width: "100%",
              }}
              allowClear
            />
          </Form.Item>
          <Form.Item
            label="Дія"
            name="action"
            rules={[
              {
                required: true,
                message: "Оберіть причину взаємодії",
              },
            ]}
          >
            <AsyncSelect
              placeholder="Оберіть дії"
              fetchOptions={(input) => this.searchCode(input, "action")}
              showSearch={true}
              style={{
                width: "100%",
              }}
              allowClear
            />
          </Form.Item>
          <Form.Item label="Коментар" name="comment">
            <TextArea
              placeholder="Коментар до прийому"
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Зберегти
          </Button>
        </Form>
      </div>
    );
  }
}
export default AppointementEdit;
