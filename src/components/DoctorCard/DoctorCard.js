import React from "react";
import "./_doctorCard.scss";
import portrait from "../../img/Portrait_Placeholder.png";
import cat from "../../img/cat.jpg";
const DoctorCard = ({
  userId,
  firstName,
  lastName,
  middleName,
  address,
  orgName,
  spec,
  appointmentClickHandler,
  isCat,
}) => (
  <div className="doctorCard">
    <div className="doctorCardTop">
      <div className="doctorImageContainer">
        <img
          src={isCat ? cat : portrait}
          alt="doctor"
          className="doctorImg"
        ></img>
      </div>
      <div className="doctorCardTopText">
        <p>{lastName + " " + firstName + " " + middleName}</p>
        <p>{spec === "Therapist" ? "Терапевт" : "Педіатр"}</p>
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
