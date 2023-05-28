import React from "react";
import moment from "moment";

//import "./_appointmentDisplay.scss";
import { Button, Card, Row } from "antd";
import './index.scss'

export const AppointmentInfoCard = ({
  doctorName,
  patientName,
  dateTime,
  status
}) => {
    let dateArr = moment(dateTime).format("DD-MM-YYYY HH:mm");
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
        <Card className="appointmentInfoCard">
            <Row><h2>Прийом {dateArr}</h2></Row>
            
            <Row>
                <h3>Лікар: {doctorName}</h3>
                <h3 className="appointmentInfoCard_h1">Пацієнт: {patientName}</h3>
                <h3 className="appointmentInfoCard_h1">Статус: {getDisplayStatus(status)}</h3>
            </Row>
        </Card>
    );
}