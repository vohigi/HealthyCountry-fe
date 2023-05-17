import React, { Component } from "react";
import Loader from "../../components/Loader/Loader";
import { checkValidity, updateObject, getBearer } from "../../shared/utility";
import { Form, Button, Input, List, Select, DatePicker, Divider } from "antd";
import locale from "antd/es/date-picker/locale/uk_UA";
import { connect } from "react-redux";
import moment from "moment";
import "moment/locale/uk";
import {
    EditOutlined,
    CloseCircleOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import axios from "axios";
import AsyncSelect from "../../components/UI/AsyncSelect";
import "./_appointmentBooking.scss";
import DrawerForm from "../../components/DrawerForm";
import { clinicalStatuses, severity } from "../../data";
import { VideoCall } from "../../components/VideoCall/VideoCall";
import VideoCallContainer from "../../components/VideoCall/VideoCallContainer";
const { TextArea } = Input;
const { Option } = Select;
//import Button from "../../components/UI/Button/Button";
// import Input from "../../components/UI/Input/Input";

class AppointmentView extends Component {
    commentFormRef = React.createRef();
    reasonFormRef = React.createRef();
    diagnosisFormRef = React.createRef();
    actionsFormRef = React.createRef();

    state = {
        appointment: null,
        loading: true,
        errors: null,
        reason: {
            value: null,
        },
        reasonsDrawerVisible: false,
        diagnosisDrawerVisible: false,
        actionsDrawerVisible: false,
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
                if(response.data.status=="FINISHED")
                this.commentFormRef.current.setFields([
                    {
                        name: "comment",
                        value: this.state.appointment.comment,
                    },
                ]);
            });
    }
    onDrawerVisibilityChange(name, action) {
        switch (name) {
            case "reasons":
                if (action === "close") {
                    this.setState({ reasonsDrawerVisible: false });
                    this.reasonFormRef.current.resetFields();
                } else {
                    this.setState({ reasonsDrawerVisible: true });
                }
                break;
            case "diagnosis":
                if (action === "close") {
                    this.setState({ diagnosisDrawerVisible: false });
                    this.diagnosisFormRef.current.resetFields();
                } else {
                    this.setState({ diagnosisDrawerVisible: true });
                    if (this.state.appointment.diagnosis) {
                        setTimeout(() => {
                            this.diagnosisFormRef.current.setFields([
                                {
                                    name: "date",
                                    value: moment(this.state.appointment.diagnosis.date),
                                },
                                {
                                    name: "diagnosis",
                                    value: {
                                        key: this.state.appointment.diagnosis.code.id,
                                        label: `${this.state.appointment.diagnosis.code.name} ${this.state.appointment.diagnosis.code.code}`,
                                        value: this.state.appointment.diagnosis.code.id,
                                    },
                                },
                                {
                                    name: "severity",
                                    value:
                                        this.state.appointment.diagnosis.severity.toLowerCase(),
                                },
                                {
                                    name: "clinicalStatus",
                                    value:
                                        this.state.appointment.diagnosis.clinicalStatus.toLowerCase(),
                                },
                            ]); //works with setTimeout
                        }, 500);
                    }
                }
                break;
            case "actions":
                if (action === "close") {
                    this.setState({ actionsDrawerVisible: false });
                    this.actionsFormRef.current.resetFields();
                } else {
                    this.setState({ actionsDrawerVisible: true });
                }
                break;
            default:
                break;
        }
    }
    onBackToListClick() {
        this.props.currentUser.role !== "PATIENT"
            ? this.props.history.push("/doctor/profile")
            : this.props.history.push("/patient/profile");
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
    deleteHandler(type, id) {
        axios
            .delete(
                `/api/appointments/${this.state.appointment.id}/${type}/${id}`,
                {
                    headers: {
                        Authorization: "Bearer " + getBearer(),
                    },
                }
            )
            .then((response) => {
                this.setState({ appointment: response.data });
            });
    }
    addHandler(values, type) {
        if (type !== "diagnosis") {
            const data = {
                codeId: values[type].value,
            };
            axios
                .post(
                    `/api/appointments/${this.state.appointment.id}/${type}`,
                    data,
                    {
                        headers: {
                            Authorization: "Bearer " + getBearer(),
                        },
                    }
                )
                .then((response) => {
                    this.onDrawerVisibilityChange(type, "close");
                    this.setState({ appointment: response.data });
                });
            return;
        }
        console.log(values);
        const data = {
            codeId: values[type].value,
            date: values.date,
            severity: values.severity,
            clinicalStatus: values.clinicalStatus,
        };
        axios
            .put(
                `/api/appointments/${this.state.appointment.id}/diagnosis`,
                data,
                {
                    headers: {
                        Authorization: "Bearer " + getBearer(),
                    },
                }
            )
            .then((response) => {
                this.onDrawerVisibilityChange(type, "close");
                this.setState({ appointment: response.data });
            });
    }

    submitHandler(values) {
        console.log(values);
        const data = this.state.appointment;
        data.comment = values.comment;
        data.status = "FINISHED";
        console.log(data);
        axios
            .patch(`/api/appointments/${data.id}`, data, {
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

                {this.state.appointment?.status == "FINISHED" && (
                    <>
                        <List
                            size="large"
                            locale={{ emptyText: "Немає даних" }}
                            header={
                                <div
                                    style={{
                                        fontSize: "18px",
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <strong>Причини</strong>
                                    {this.state.appointment?.status !== "FINISHED" && (
                                        <Button
                                            type="primary"
                                            size="large"
                                            style={{ fontSize: "18px" }}
                                            onClick={() =>
                                                this.onDrawerVisibilityChange("reasons", "open")
                                            }
                                        >
                                            <PlusOutlined />
                                            Додати
                                        </Button>
                                    )}
                                </div>
                            }
                            className="demo-loadmore-list"
                            itemLayout="horizontal"
                            dataSource={
                                this.state.appointment
                                    ? this.state.appointment.reasons
                                    : [
                                        { id: "1", code: "A02 / Лихоманка" },
                                        { id: "2", code: "A03 / Біль" },
                                    ]
                            }
                            renderItem={(item) => (
                                <List.Item
                                    actions={
                                        this.state.appointment?.status !== "FINISHED"
                                            ? [
                                                <a
                                                    key="list-loadmore-more"
                                                    onClick={() => this.deleteHandler("reasons", item?.id)}
                                                >
                                                    <CloseCircleOutlined
                                                        style={{ fontSize: "32px", color: "#f5222d" }}
                                                    />
                                                </a>,
                                            ]
                                            : []
                                    }
                                >
                                    <div style={{ fontSize: "16px" }}>
                                        {item?.coding?.code + " " + item?.coding?.name}
                                    </div>
                                </List.Item>
                            )}
                        />
                        <List
                            size="large"
                            locale={{ emptyText: "Немає даних" }}
                            header={
                                <div
                                    style={{
                                        fontSize: "18px",
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <strong>Діагноз</strong>
                                    {!this.state.appointment?.diagnosis &&
                                        this.state.appointment?.status !== "FINISHED" && (
                                            <Button
                                                type="primary"
                                                size="large"
                                                style={{ fontSize: "18px" }}
                                                onClick={() =>
                                                    this.onDrawerVisibilityChange("diagnosis", "open")
                                                }
                                            >
                                                <PlusOutlined />
                                                Додати
                                            </Button>
                                        )}
                                </div>
                            }
                            className="demo-loadmore-list"
                            itemLayout="horizontal"
                            dataSource={
                                this.state.appointment?.diagnosis
                                    ? [this.state.appointment.diagnosis]
                                    : []
                            }
                            renderItem={(item) => (
                                <List.Item
                                    actions={
                                        this.state.appointment?.status !== "FINISHED"
                                            ? [
                                                <a
                                                    key="list-loadmore-edit"
                                                    onClick={() =>
                                                        this.onDrawerVisibilityChange("diagnosis", "open")
                                                    }
                                                >
                                                    <EditOutlined style={{ fontSize: "32px" }} />
                                                </a>,
                                            ]
                                            : []
                                    }
                                >
                                    <div style={{ fontSize: "16px" }}>
                                        {item?.code?.code + " " + item?.code?.name}
                                        <Divider type="vertical" />
                                        {item?.date && moment(item.date).format("DD-MM-YYYY")}
                                        <Divider type="vertical" />
                                        {console.log(severity)}
                                        <span>Важкість: {severity[item?.severity]}</span>
                                        <Divider type="vertical" />
                                        <span>
                                            Клінічний стан: {clinicalStatuses[item?.clinicalStatus]}
                                        </span>
                                    </div>
                                </List.Item>
                            )}
                        />
                        <List
                            size="large"
                            locale={{ emptyText: "Немає даних" }}
                            header={
                                <div
                                    style={{
                                        fontSize: "18px",
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <strong>Дії</strong>
                                    {this.state.appointment?.status !== "FINISHED" && (
                                        <Button
                                            type="primary"
                                            size="large"
                                            style={{ fontSize: "18px" }}
                                            onClick={() =>
                                                this.onDrawerVisibilityChange("actions", "open")
                                            }
                                        >
                                            <PlusOutlined />
                                            Додати
                                        </Button>
                                    )}
                                </div>
                            }
                            className="demo-loadmore-list"
                            itemLayout="horizontal"
                            dataSource={
                                this.state.appointment ? this.state.appointment.actions : []
                            }
                            renderItem={(item) => (
                                <List.Item
                                    actions={
                                        this.state.appointment?.status !== "FINISHED"
                                            ? [
                                                <a
                                                    key="list-loadmore-more"
                                                    onClick={() => this.deleteHandler("actions", item?.id)}
                                                >
                                                    <CloseCircleOutlined
                                                        style={{ fontSize: "32px", color: "#f5222d" }}
                                                    />
                                                </a>,
                                            ]
                                            : []
                                    }
                                >
                                    <div style={{ fontSize: "16px" }}>
                                        {item?.coding?.code + " " + item?.coding?.name}
                                    </div>
                                </List.Item>
                            )}
                        />
                        <Form
                            {...formItemLayout}
                            layout="vertical"
                            requiredMark={false}
                            onFinish={(values) => this.submitHandler(values)}
                            ref={this.commentFormRef}
                        >
                            <Form.Item
                                label={<strong style={{ fontSize: "18px" }}>Коментар</strong>}
                                name="comment"
                            >
                                <TextArea
                                    disabled={this.state.appointment?.status === "FINISHED"}
                                    placeholder="Коментар до прийому"
                                    autoSize={{ minRows: 2, maxRows: 6 }}
                                />
                            </Form.Item>
                            {this.state.appointment?.status !== "FINISHED" && (
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    size="large"
                                    style={{ fontSize: "18px" }}
                                >
                                    Завершити
                                </Button>
                            )}
                            {this.state.appointment?.status === "FINISHED" && (
                                <Button
                                    size="large"
                                    style={{ fontSize: "18px" }}
                                    onClick={() => this.onBackToListClick()}
                                >
                                    Назад до списку
                                </Button>
                            )}
                        </Form>
                    </>
                )}
                {this.state.appointment?.status==="INPROGRESS" && <VideoCallContainer userId={this.props.currentUser.id} roomId={this.state.appointment.id} userRole={this.props.currentUser.role} />}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        currentUser: state.auth.user,
    };
};
export default connect(mapStateToProps, () => ({}))(AppointmentView);
