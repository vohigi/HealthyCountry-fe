import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import Slick from "react-slick";
import medReform from "../../img/moz.png";
import medReform2 from "../../img/nszu.jpg";
import "./_home.scss";

class News extends Component {
  render() {
    return (
      <div>
        <h2 className="newsHeading">Новини</h2>
        <div className="carouselContainer">
          <Slick
            slidesToShow={1}
            slidesToScroll={1}
            autoplay={true}
            infinite={true}
            autoplaySpeed={5000}
            pauseOnHover={true}
            dots={true}
            arrows={false}
            fade={false}
            draggable={false}
            swipe={false}
            adaptiveHeight={false}
            className="banner"
            dotsClass="bannerDots"
          >
            <a
              href="https://moz.gov.ua/plan-reform"
              target="_blank"
              className="bannerCard"
              rel="noopener noreferrer"
            >
              <img
                src={medReform}
                className="bannerImg"
                alt="медична реформа баннер"
              />
              <p className="bannerCardText">Медична реформа</p>
            </a>
            <a
              href="https://moz.gov.ua/plan-reform"
              target="_blank"
              className="bannerCard"
              rel="noopener noreferrer"
            >
              <img
                src={medReform2}
                className="bannerImg"
                alt="медична реформа баннер"
              />
              <p className="bannerCardText">Медична реформа</p>
            </a>
          </Slick>
        </div>
        <article className="steps">
          <div className="stepsContainer">
            <div className="step step_find">
              <div className="stepImg" />
              <span className="stepDescr">
                Знаходите <br />
                лікаря
              </span>
            </div>
            <div className="step stepChooseTime">
              <div className="stepImg" />
              <span className="stepDescr">
                Обираєте зручний <br />
                для вас час
              </span>
            </div>
            <div className="step stepVisit">
              <div className="stepImg" />
              <span className="stepDescr">
                Приходите до <br />
                поліклініки у <br />
                вказаний час
              </span>
            </div>
            <div className="step stepWithoutQueue">
              <div className="stepImg" />
              <span className="stepDescr">
                Потрапляєте <br />
                до лікаря
                <br />
                без черги
              </span>
            </div>
            <div className="step stepMedicalCard">
              <div className="stepImg" />
              <span className="stepDescr">
                Слідкуєте за своєю електронною медичною карткою
              </span>
            </div>
          </div>
        </article>
      </div>
    );
  }
}
export default News;
