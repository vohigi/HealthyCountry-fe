import React from "react";
import "./_userCard.scss";
import moment from "moment";

export const UserCard = ({
  onEditClick,
  onDeactivateClick,
  user: {
    firstName,
    lastName,
    middleName,
    userId,
    role,
    isActive,
    organization,
    taxId,
    birthDate,
    gender,
    phone,
    specialization,
  },
}) => {
  return (
    <div className="userCard">
      <div className="userCardContent">
        <p>
          {lastName} {firstName} {middleName}
        </p>
        <p>
          {role !== "PATIENT" && organization.name} {role}
        </p>
        <p>{moment(birthDate).format("DD-MM-YYYY")}</p>
        <p>{gender === "MALE" ? "Чоловіча" : "Жіноча"}</p>
        <p>{phone}</p>
        <p>{taxId}</p>
        <p>{specialization}</p>
        <p>{isActive ? "Активний" : "Деактивований"}</p>
      </div>
      <div className="userCardControls">
        <button className="userCardButton" onClick={onEditClick}>
          Редагувати
        </button>
        <button className="userCardButton" onClick={onDeactivateClick}>
          {isActive ? "Деактивувати" : "Активувати"}
        </button>
      </div>
    </div>
  );
};
