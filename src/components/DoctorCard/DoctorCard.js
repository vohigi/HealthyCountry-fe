import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faMapMarkerAlt,
  faClinicMedical,
} from "@fortawesome/free-solid-svg-icons";
import { faMap } from "@fortawesome/free-regular-svg-icons";
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
        <p>
          <FontAwesomeIcon icon={faStar} color="#ffcc00" className="icon" />
          0.0(0)
        </p>
        <p>Стаж: невідомий</p>
      </div>
    </div>
    <div className="doctorCardBottom">
      <p className="font-20 font-b">
        {lastName + " " + firstName + " " + middleName}
      </p>
      <p>{spec === "Therapist" ? "Терапевт" : "Педіатр"}</p>
      <div className="divider"></div>
      <p>
        <FontAwesomeIcon icon={faClinicMedical} className="icon" />
        {orgName}
      </p>
      <p>
        <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
        {address}
      </p>
      <div className="doctorCardBottomControlls">
        <button
          className="doctorCardButton"
          onClick={(e) => appointmentClickHandler(e, userId)}
        >
          Записатись
        </button>
      </div>
    </div>
  </div>
);
export default DoctorCard;
