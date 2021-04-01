import React from "react";
import { useForm } from "react-hook-form";
import { FormLoginProps } from "../../../../models/FormLogin";
import { ReactComponent as LoadingSVG } from "../../../../assets/icons/loading.svg";

const Form = ({ loginUser, pattern_email, loading }: FormLoginProps) => {
  const { handleSubmit, register, errors } = useForm();

  return (
    <form className="form" onSubmit={handleSubmit(loginUser)}>
      <div className="controller">
        <input
          type="text"
          name="email"
          ref={register({
            required: {
              value: true,
              message: "Enter you email",
            },
            pattern: {
              message: "Invalid Email",
              value: pattern_email,
            },
          })}
          placeholder="Email"
          autoComplete="off"
        />
        <p className="message_error">{errors.email?.message}</p>
      </div>

      <div className="controller">
        <input
          type="password"
          name="password"
          ref={register({
            required: {
              value: true,
              message: "Enter your password",
            },
          })}
          placeholder="Password"
          autoComplete="off"
        />
        <p className="message_error">{errors.password?.message}</p>
      </div>

      <button className="btn_login" type="submit">
        {loading ? <LoadingSVG className="loading" /> : null}
        Login
      </button>
    </form>
  );
};

export default Form;
