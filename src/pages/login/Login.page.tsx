import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { environments } from "../../environments";
import { CredentialsLogin } from "../../models/Credentials-login.model";
import Form from "./components/Form/Form";
import Snackbar from "./components/Snackbar/Snackbar";
import { channel } from "../../app";
import { ReactComponent as Vector } from "../../assets/icons/login-vector.svg";
import Wave from "../../assets/images/wave-vector-login.png";

const pattern_email = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
let myWindow: Window;
let timer: NodeJS.Timeout;

const LoginPage = () => {
  const history = useHistory();
  const [message, setMessage] = useState("");

  const loginUser = async (credentials: CredentialsLogin) => {
    clearTimeout(timer);
    const { data } = await axios.post(
      `${environments.api_uri}/login`,
      credentials
    );

    if (!data.status) {
      setMessage(data.message);
      timer = setTimeout(() => {
        setMessage("");
        clearTimeout(timer);
      }, 2000);
      return;
    }

    localStorage.setItem("t1ks1ehn", data.token);
    return history.push("/home");
  };

  const loginFacebook = () => {
    myWindow = window.open(`${environments.api_uri}/auth/facebook`) as Window;
  };

  const goToRegister = () => {
    history.push("/register");
    clearTimeout(timer);
  };

  useEffect(() => {
    channel.bind("login-facebook", (data: any) => {
      localStorage.setItem("t1ks1ehn", data.token);
      channel.unbind();
      myWindow?.close();
      history.push("/home");
    });

    channel.bind("register-facebook", (data: any) => {
      myWindow?.close();
      localStorage.setItem("t1ks1ehn", data.token);
      history.push("/home");
      channel.unbind();
      return;
    });
    return;
  }, [history]);

  return (
    <div className="login_container">
      <div className="right_container fadeIn">
        <img src={Wave} alt="" />
        <div className="vector_container downEntrance">
          <Vector />
        </div>
      </div>
      <div className="left_container fadeIn">
        <div className="subcontainer">
          <h1 className="title_page">LOGIN</h1>

          <h2 className="subtitle_page">WELCOME BACK</h2>

          <button className="btn_login_facebook" onClick={loginFacebook}>
            Login With Facebook
          </button>

          <span className="or">O</span>

          <Form loginUser={loginUser} pattern_email={pattern_email} />

          <p className="question_login">
            You still dont have an account ?{" "}
            <span className="link" onClick={goToRegister}>
              Register
            </span>
          </p>
        </div>
      </div>
      <Snackbar message={message} setMessage={setMessage} timer={timer} />
    </div>
  );
};

export default LoginPage;
