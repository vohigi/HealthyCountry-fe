import React from "react";
import moment from "moment";

import "./_appointmentDisplay.scss";
import { Button, Card } from "antd";

export const AppointmentCard = ({
  doctorName,
  patientName,
  dateTime,
  status,
  reason,
  diagnosis,
  action,
  comment,
  enableControls,
  handleStartClick,
  handleCancelClick,
}) => {
  let dateArr = moment(dateTime).format("DD-MM-YYYY HH:mm").split(" ");
  const getDisplayStatus = (status) => {
    let displayStatus = "";
    switch (status) {
      case "BOOKED":
        displayStatus = "Заплановано";
        break;
      case "FREE":
        displayStatus = "Вільно";
        break;
      case "INPROGRESS":
        displayStatus = "На прийомі";
        break;
      case "FINISHED":
        displayStatus = "Завершено";
        break;
      case "CANCELED":
        displayStatus = "Відмінено";
        break;
      default:
        displayStatus = "Заплановано";
        break;
    }
    return displayStatus;
  };
  const actionArray =
    status === "BOOKED" && enableControls
      ? [
          <Button
            type="primary"
            size="large"
            disabled={status !== "BOOKED"}
            onClick={handleStartClick}
          >
            Розпочати
          </Button>,
          <Button
            type="primary"
            size="large"
            disabled={status !== "BOOKED"}
            onClick={handleCancelClick}
          >
            Відмінити
          </Button>,
        ]
      : status === "INPROGRESS" && enableControls
      ? [
          <Button type="primary" size="large" onClick={handleStartClick}>
            Продовжити заповнення
          </Button>,
        ]
      : status === "FINISHED"
      ? [
          <Button type="primary" size="large" onClick={handleStartClick}>
            Переглянути результати
          </Button>,
        ]
      : [];
  return (
    <Card actions={actionArray} type="inner">
      <div className="appointmentCardRow">
        <div className="appointmentCardColumn">
          <p className="appointmentCardColumnItem">
            {enableControls ? (
              <span>
                <strong>Пацієнт:</strong> {patientName}
              </span>
            ) : (
              <span>
                <strong>Лікар:</strong> {doctorName}
              </span>
            )}
          </p>
          <p className="appointmentCardColumnItem">
            {!enableControls ? (
              <span>
                <strong>Спеціальність:</strong> Терапевт
              </span>
            ) : null}
          </p>
        </div>
        <div className="appointmentCardColumn">
          <p className="appointmentCardColumnItem">
            <strong>Дата:</strong> {dateArr[0]}
          </p>
          <p className="appointmentCardColumnItem">
            <strong>Час:</strong> {dateArr[1]}
          </p>
          <p className="appointmentCardColumnItem">
            <strong>Статус:</strong> {getDisplayStatus(status)}
          </p>
        </div>
      </div>
    </Card>
  );
};
