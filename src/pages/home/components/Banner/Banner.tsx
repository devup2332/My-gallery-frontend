import React from "react";
import "./Banner.scss";
import WaveImage from "../../../../assets/images/wave-image.png";
import { ReactComponent as BannerVector } from "../../../../assets/icons/banner-vector.svg";

const BannerComponent = () => {
  return (
    <div className="banner_component_container">
      <div className="wave_banner_container">
        <img src={WaveImage} alt=""/>
      </div>

      <div className="banner_body">
        <div className="banner_text">
          <p className="description_banner text_entrance">
            FIND THOUNDANSD OF PHOTOS FREE OF COPYRIGHT
          </p>
          <button className="btn_join btn_entrance">Join Now</button>
        </div>
        <div className="banner_svg_container vector_entrance">
          <BannerVector />
        </div>
      </div>
    </div>
  );
};

export default BannerComponent;
