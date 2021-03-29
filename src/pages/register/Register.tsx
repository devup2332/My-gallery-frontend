import React from "react";
import RigthSection from "./components/RightSection/RightSection";
import WaveVectorSVG from "../../assets/images/wave-vector.png";
import { ReactComponent as RegisterVector } from "../../assets/icons/register-vector.svg";

const RegisterPage = () => {
  return (
    <div className="register_page_container">
      <div className="left_container fadeIn">
        <img src={WaveVectorSVG} alt="" />
        <RegisterVector className="downEntrance" />
      </div>
      <RigthSection />
    </div>
  );
};

export default RegisterPage;
