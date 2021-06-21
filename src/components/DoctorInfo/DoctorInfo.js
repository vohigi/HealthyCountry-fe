import React from "react";
import "./_doctorInfo.scss";
import portrait from "../../img/Portrait_Placeholder.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faMapMarkerAlt,
  faClinicMedical,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
const DoctorInfo = ({
  firstName,
  lastName,
  middleName,
  address,
  orgName,
  phone,
  spec,
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
      <p className="font-20 font-b">
        {lastName + " " + firstName + " " + (middleName ? middleName : "")}
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
      <p>
        <FontAwesomeIcon icon={faPhone} className="icon" />
        {phone}
      </p>
      <p>
        <FontAwesomeIcon icon={faStar} color="#ffcc00" className="icon" />
        0.0(0)
      </p>
      <p>Стаж: невідомий</p>

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
  </div>
);
export default GoogleApiWrapper({
  apiKey: "AIzaSyB3ztWR2oCr75031dMgeGH3S60dfik7-aI",
  language: "uk",
})(DoctorInfo);
