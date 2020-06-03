import React from "react";
import "./_appointmentGrid.scss";
import moment from "moment";
const AppointmentGrid = ({ appointments, appointmentClickHandler }) => (
  <div className="appointmentGrid">
    <p className="appointmentGridText">Оберіть час запису</p>
    <div className="appointmentGridSlots">
      {appointments &&
        appointments.map((appointment) => {
          const dateTime = moment(appointment.dateTime)
            .format("DD-MM-YYYY HH:mm")
            .split(" ");
          return (
            <button
              className="slot"
              key={appointment.appointmentId}
              disabled={appointment.status !== "FREE"}
              onClick={(e) =>
                appointmentClickHandler(e, appointment.appointmentId)
              }
            >
              {dateTime[0]}
              <br />
              {dateTime[1]}
            </button>
          );
        })}
    </div>
  </div>
);
export default AppointmentGrid;
