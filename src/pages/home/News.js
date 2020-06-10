import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import Slick from "react-slick";
import medReform from "../../img/med-reform.jpg";
import medReform2 from "../../img/med-reform2.jpg";
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
            >
              <img src={medReform} className="bannerImg" />
              <p className="bannerCardText">Медична реформа</p>
            </a>
            <a
              href="https://moz.gov.ua/plan-reform"
              target="_blank"
              className="bannerCard"
            >
              <img src={medReform2} className="bannerImg" />
              <p className="bannerCardText">Медична реформа</p>
            </a>
          </Slick>
        </div>
        <article className="page-main__way">
          <div className="page-main__way-container">
            <div className="page-main__step page-main__step_find">
              <div className="page-main__step-img" />
              <span className="page-main__step-descr">
                Знаходите <br />
                лікаря
              </span>
            </div>
            <div className="page-main__step page-main__step_choose-time">
              <div className="page-main__step-img" />
              <span className="page-main__step-descr">
                Обираєте зручний <br />
                для вас час
              </span>
            </div>
            <div className="page-main__step page-main__step_visit">
              <div className="page-main__step-img" />
              <span className="page-main__step-descr">
                Приходите до <br />
                поліклініки у <br />
                вказаний час
              </span>
            </div>
            <div className="page-main__step page-main__step_without-queue">
              <div className="page-main__step-img" />
              <span className="page-main__step-descr">
                Потрапляєте <br />
                до лікаря
                <br />
                без черги
              </span>
            </div>
            <div className="page-main__step page-main__step_medical-card">
              <div className="page-main__step-img" />
              <span className="page-main__step-descr">
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
