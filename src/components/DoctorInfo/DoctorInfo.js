import React from "react";
import "./_doctorInfo.scss";
import portrait from "../../img/Portrait_Placeholder.png";
const DoctorInfo = ({
  firstName,
  lastName,
  middleName,
  address,
  orgName,
  phone,
  appointmentClickHandler,
}) => (
  <div className="doctorInfo">
    <div className="doctorInfoLeft">
      <div className="doctorInfoLeftImageContainer">
        <img src={portrait} className="doctorImg"></img>
      </div>
    </div>
    <div className="doctorInfoRight">
      <div className="">
        <p>{lastName + " " + firstName + " " + middleName}</p>
        <p>Терапевт</p>
      </div>
      <p>Організація: {orgName}</p>
      <p>Адреса: {address}</p>
      <p>Телефон: {phone}</p>
    </div>
  </div>
);
export default DoctorInfo;
