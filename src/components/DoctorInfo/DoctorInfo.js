import React from "react";
import "./_doctorInfo.scss";
import portrait from "../../img/Portrait_Placeholder.png";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
const DoctorInfo = ({
  firstName,
  lastName,
  middleName,
  address,
  orgName,
  phone,
  appointmentClickHandler,
  google,
}) => (
  <div className="doctorInfo">
    <div className="doctorInfoLeft">
      <div className="doctorInfoLeftImageContainer">
        <img src={portrait} alt="doctor" className="doctorImg"></img>
      </div>
    </div>
    <div className="doctorInfoRight">
      <div className="">
        <p>{lastName + " " + firstName + " " + middleName}</p>
        <p>
          {" "}
          <strong>Спеціальність:</strong>Терапевт
        </p>
      </div>
      <p>
        <strong>Організація:</strong> {orgName}
      </p>
      <p>
        <strong>Адреса:</strong> {address}
      </p>
      <p>
        <strong>Телефон:</strong> {phone}
      </p>
    </div>
    <div className="doctorInfoMap">
      <Map
        google={google}
        zoom={17}
        style={{
          width: "100%",
          height: "100%",
        }}
        containerStyle={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
        initialCenter={{ lat: 51.52374805, lng: -0.15856988 }}
      >
        <Marker name={"Baker Street 221B"} />
        <Marker />
      </Map>
    </div>
  </div>
);
export default GoogleApiWrapper({
  apiKey: "AIzaSyB3ztWR2oCr75031dMgeGH3S60dfik7-aI",
  language: "uk",
})(DoctorInfo);
