import React from "react";
import "./_doctorCard.scss";
import portrait from "../../img/Portrait_Placeholder.png";
const DoctorCard = ({
  userId,
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
        <img src={portrait} alt="doctor image" className="doctorImg"></img>
      </div>
      <div className="doctorCardTopText">
        <p>{lastName + " " + firstName + " " + middleName}</p>
        <p>Терапевт</p>
      </div>
    </div>
    <div className="doctorCardBottom">
      <p>{orgName}</p>
      <p>{address}</p>
      <button
        className="doctorCardButton"
        onClick={(e) => appointmentClickHandler(e, userId)}
      >
        Записатись на прийом
      </button>
    </div>
  </div>
);
export default DoctorCard;
