import React from "react";
import moment from "moment";
import "./_appointmentDisplay.scss";

export const AppointmentCard = ({
  doctorName,
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
  return (
    <div className="appointmentCard">
      <div className="appointmentCardRow">
        <div className="appointmentCardColumn">
          <p className="appointmentCardColumnItem">
            <strong>Лікар:</strong> {doctorName}
          </p>
          <p className="appointmentCardColumnItem">
            <strong>Спеціальність:</strong> Терапевт
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
        <div className="appointmentCardColumn">
          <p className="appointmentCardColumnItem">
            <strong>Причина:</strong> {reason}
          </p>
          <p className="appointmentCardColumnItem">
            <strong>Діагноз:</strong> {diagnosis}
          </p>
          <p className="appointmentCardColumnItem">
            <strong>Дія:</strong> {action}
          </p>
        </div>
        <div className="appointmentCardColumn">
          <p className="appointmentCardColumnItem">
            <strong>Коментар:</strong> {comment}
          </p>
        </div>
      </div>
      {enableControls && (
        <div className="appointmentCardRow border padding">
          <div className="appointmentCardColumnItem">
            <button
              disabled={status !== "BOOKED"}
              className="appointmentCardControl"
              onClick={handleStartClick}
            >
              Розпочати
            </button>
          </div>
          <div className="appointmentCardColumnItem">
            <button
              disabled={status !== "BOOKED"}
              className="appointmentCardControl"
              onClick={handleCancelClick}
            >
              Відмінити
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
