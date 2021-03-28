import React from "react";
import FormComponent from "./components/form/Form";
import "./Register.scss";
import WaveVectorSVG from "../../assets/images/wave-vector.png";
import { ReactComponent as RegisterVector } from "../../assets/icons/register-vector.svg";

const RegisterPage = () => {
  return (
    <div className="register_page_container">
      <div className="left_container fadeIn">
        <img src={WaveVectorSVG} alt="" />
        <RegisterVector className="vectorEntrance"/>
      </div>
      <FormComponent />
    </div>
  );
};

export default RegisterPage;


  
