import React from "react";
import "./_doctorCard.scss";
import portrait from "../../img/Portrait_Placeholder.png";
const DoctorCard = ({
  firstName,
  lastName,
  middleName,
  address,
  orgName,
  appointmentClickHandler,
}) => (
  <div className="doctorCard">
    <div className="doctorCardTop">
      <div className="doctorImageContainer">
        <img src={portrait} className="doctorImg"></img>
      </div>
      <div className="doctorCardTopText">
        <p>{lastName + " " + firstName + " " + middleName}</p>
        <p>Терапевт</p>
      </div>
    </div>
    <div className="doctorCardBottom">
      <p>{orgName}</p>
      <p>{address}</p>
      <button className="doctorCardButton" onClick={appointmentClickHandler}>
        Записатись на прийом
      </button>
    </div>
  </div>
);
export default DoctorCard;
