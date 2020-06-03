import React from "react";
import { AppointmentCard } from "./AppointmentCard";

export const AppointmentsDisplay = ({
  appointments,
  currentTab,
  changeTabClickHandler,
  enableControls,
  handleStartClick,
  handleCancelClick,
}) => {
  return (
    <div>
      <div className="controls">
        <button
          className={
            currentTab === "past" ? "controlsButton active" : "controlsButton"
          }
          onClick={() => changeTabClickHandler("past")}
        >
          Минулі
        </button>
        <button
          className={
            currentTab === "today" ? "controlsButton active" : "controlsButton"
          }
          onClick={() => changeTabClickHandler("today")}
        >
          Сьогодні
        </button>
        <button
          className={
            currentTab === "future" ? "controlsButton active" : "controlsButton"
          }
          onClick={() => changeTabClickHandler("future")}
        >
          Майбутні
        </button>
      </div>
      <div className="cardContainer">
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
            }) => {
              console.log(dateTime);
              return (
                <AppointmentCard
                  key={appointmentId}
                  dateTime={dateTime}
                  status={status}
                  reason={reason}
                  diagnosis={diagnosis}
                  action={action}
                  comment={comment}
                  doctorName={`${employee.lastName} ${employee.firstName} ${employee.middleName}`}
                  enableControls={enableControls}
                  handleStartClick={() => handleStartClick(appointmentId)}
                  handleCancelClick={() => handleCancelClick(appointmentId)}
                />
              );
            }
          )}
      </div>
    </div>
  );
};
export default AppointmentsDisplay;
