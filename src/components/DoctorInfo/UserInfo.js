import React from "react";
import "./_doctorInfo.scss";
import portrait from "../../img/Portrait_Placeholder.png";
import moment from "moment";
const UserInfo = ({
  firstName,
  lastName,
  middleName,
  gender,
  birthDate,
  phone,
}) => (
  <div className="doctorInfo">
    <div className="doctorInfoLeft">
      <div className="doctorInfoLeftImageContainer">
        <img src={portrait} alt="doctor image" className="doctorImg"></img>
      </div>
    </div>
    <div className="doctorInfoRight">
      <div className="">
        <p>{lastName + " " + firstName + " " + middleName}</p>
        <p> Дата народження: {moment(birthDate).format("yyyy-MM-DD")}</p>
      </div>
      <p>Стать: {gender === "MALE" ? "Чоловіча" : "Жіноча"}</p>
      <p>Телефон: {phone}</p>
    </div>
  </div>
);
export default UserInfo;
