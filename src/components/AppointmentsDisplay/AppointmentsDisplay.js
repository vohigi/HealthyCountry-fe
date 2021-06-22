import React from "react";
import { AppointmentCard } from "./AppointmentCard";
import { Col, Row, Card, Space } from "antd";
import Button from "antd/es/button";
export const AppointmentsDisplay = ({
  appointments,
  doctorId,
  currentTab,
  changeTabClickHandler,
  enableControls,
  handleStartClick,
  handleCancelClick,
  onPrintClick,
}) => {
  const tabList = [
    {
      key: "past",
      tab: "Минулі",
    },
    {
      key: "today",
      tab: "Сьогодні",
    },
    {
      key: "future",
      tab: "Майбутні",
    },
  ];
  return (
    <Row justify="center">
      {/* <a
        className="btn"
        href={`http://localhost:5000/api/appointments/${doctorId}/print`}
        target="_blank"
      >
        Роздрукувати форму 074
      </a> */}
      <Card
        style={{ width: "90%" }}
        title={
          <div>
            <span>Мої прийоми</span>
            {enableControls && (
              <Button
                style={{ display: "inline-block", marginLeft: "30px" }}
                onClick={() => onPrintClick("open")}
              >
                Роздрукувати форму 074/о
              </Button>
            )}
          </div>
        }
        tabList={tabList}
        defaultActiveTabKey={"tab1"}
        activeTabKey={currentTab}
        tabProps={{
          size: "large",
        }}
        onTabChange={(key) => {
          changeTabClickHandler(key);
        }}
      >
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {appointments &&
            appointments.map(
              ({
                dateTime,
                status,
                appointmentId,
                employee,
                reason,
                diagnosis,
                action,
                comment,
                patient,
              }) => {
                console.log(dateTime);
                return (
                  <Row justify="center" key={appointmentId}>
                    <Col span={22}>
                      <AppointmentCard
                        key={appointmentId}
                        dateTime={dateTime}
                        status={status}
                        reason={reason ? reason.name + " " + reason.code : ""}
                        diagnosis={
                          diagnosis ? diagnosis.name + " " + diagnosis.code : ""
                        }
                        action={action ? action.name + " " + action.code : ""}
                        comment={comment}
                        doctorName={`${employee.lastName} ${
                          employee.firstName
                        } ${employee.middleName ?? ""}`}
                        patientName={`${patient.lastName} ${
                          patient.firstName
                        } ${patient.middleName ? patient.middleName : ""}`}
                        enableControls={enableControls}
                        handleStartClick={() =>
                          handleStartClick(appointmentId, status === "BOOKED")
                        }
                        handleCancelClick={() =>
                          handleCancelClick(appointmentId)
                        }
                      />
                    </Col>
                  </Row>
                );
              }
            )}
        </Space>
      </Card>
    </Row>
  );
};
export default AppointmentsDisplay;
