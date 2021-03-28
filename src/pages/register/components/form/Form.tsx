import React, { useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./Form.scss";
import { environments } from "../../../../environments";
import { channel } from "../../../../app";

const pattern_email = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
const pattern_number = /^[0-9]+$/;
let newWindow: Window;

const FormComponent = () => {
  const { register, handleSubmit, errors, watch } = useForm();
  const password = useRef();
  const history = useHistory();
  password.current = watch("password", "");

  const registerUser = async (user: any) => {
    delete user.confirm_password;
    const { data } = await axios.post(`${environments.api_uri}/register`, user);
    console.log(data);
    localStorage.setItem("t1ks1ehn", data.token);
    history.push("/home");
    return;
  };

  const validateEmail = async (value: string) => {
    const { data } = await axios.post(
      `${environments.api_uri}/validate_email`,
      { email: value }
    );
    if (data.status) {
      return true;
    }
    return data.message;
  };

  const loginWithFacebook = async () => {
    newWindow = window.open(
      `${environments.api_uri}/register/facebook`
    ) as Window;

    return;
  };

  useEffect(() => {
    channel.bind("register-facebook", (data: any) => {
      newWindow.close();
      localStorage.setItem("t1ks1ehn", data.token);
      history.push("/home");
      channel.unbind();
      return;
    });

    channel.bind("login-facebook", (data: any) => {
      newWindow.close();
      localStorage.setItem("t1ks1ehn", data.token);
      history.push("/home");
      channel.unbind();
      return;
    });

    return;
  }, [history]);

  return (
    <div className=" container_form_register formEntrance">
      <div className="subcontainer_form_register">
        <h1 className="title_form">JOIN NOW</h1>
        <p className="subtitle_form">
          Join today free to start to get amazing images for free
        </p>

        <button className="btn_join_facebook" onClick={loginWithFacebook}>
          Join with facebook
        </button>

        <span className="or_line">O</span>

        <form className="form" onSubmit={handleSubmit(registerUser)}>
          <div className="input_container">
            <input
              className="input_form_register"
              ref={register({
                required: true,
              })}
              name="fullName"
              type="text"
              autoComplete="off"
              placeholder="Full Name"
            />
            <p
              className={
                errors.username?.type === "required"
                  ? "error_message visible"
                  : "error_message"
              }
            >
              Please enter your username
            </p>
          </div>

          <div className="input_container">
            <input
              className="input_form_register"
              ref={register({
                required: {
                  value: true,
                  message: "Please enter your email",
                },
                pattern: {
                  value: pattern_email,
                  message: "Email is invalid",
                },
                validate: {
                  onUse: validateEmail,
                },
              })}
              name="email"
              autoComplete="off"
              type="text"
              placeholder="Email"
            />
            <p
              className={
                errors.email?.type === "required" ||
                errors.email?.type === "pattern" ||
                errors.email?.type === "onUse"
                  ? "error_message visible"
                  : "error_message"
              }
            >
              {errors.email?.message}
            </p>
          </div>

          <div className="input_container">
            <input
              className="input_form_register"
              ref={register({
                required: {
                  value: true,
                  message: "Enter a phone number",
                },
                pattern: {
                  value: pattern_number,
                  message: "Just numbers",
                },
              })}
              name="phone"
              type="text"
              autoComplete="off"
              placeholder="Phone"
            />
            <p
              className={
                errors.phone?.type === "required" ||
                errors.phone?.type === "pattern"
                  ? "error_message visible"
                  : "error_message"
              }
            >
              {errors.phone?.message}
            </p>
          </div>

          <div className="input_container">
            <input
              className="input_form_register"
              ref={register({
                required: {
                  value: true,
                  message: "Enter your password",
                },
                minLength: {
                  value: 9,
                  message: "At least 9 characters",
                },
              })}
              name="password"
              autoComplete="off"
              type="password"
              placeholder="Password"
            />
            <p
              className={
                errors.password?.type === "required" ||
                errors.password?.type === "minLength"
                  ? "error_message visible"
                  : "error_message"
              }
            >
              {errors.password?.message}
            </p>
          </div>

          <div className="input_container">
            <input
              className="input_form_register"
              ref={register({
                required: {
                  value: true,
                  message: "Confirm your password",
                },
                validate: {
                  noEqual: (value) => {
                    if (value !== password.current) {
                      return "Passwords doesnt match";
                    }
                    return true;
                  },
                },
              })}
              autoComplete="off"
              name="confirm_password"
              type="password"
              placeholder="Confirm Password"
            />
            <p
              className={
                errors.confirm_password?.type
                  ? "error_message visible"
                  : "error_message"
              }
            >
              {errors.confirm_password?.message}
            </p>
          </div>

          <button type="submit" className="btn_register">
            Register
          </button>
        </form>

        <p className="question_register">
          You have an account ?{" "}
          <Link className="link_question" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FormComponent;
