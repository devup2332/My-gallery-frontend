import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { environments } from "../../../../environments";
import { FormUpdateProfileProps } from "../../../../models/form-update-profile";
import { ReactComponent as LoadingSVG } from "../../../../assets/icons/loading.svg";

const FormComponent = ({
  user,
  updateUser,
  loading,
}: FormUpdateProfileProps) => {
  const { register, handleSubmit, errors, reset } = useForm();

  useEffect(() => {
    reset({
      fullName: user?.fullName,
      phone: user?.phone,
      description: user?.description,
      email: user?.email,
    });

    return () => {};
  }, [user, reset]);

  return (
    <form className="form_update_profile" onSubmit={handleSubmit(updateUser)}>
      <div className="controller_update_profile">
        <input
          type="text"
          placeholder="Full Name"
          name="fullName"
          disabled={user?.provider !== "form" ? true : false}
          className={user?.provider !== "form" ? "disabled" : ""}
          ref={register({
            required: {
              value: true,
              message: "Please enter your full name",
            },
          })}
        />
        <p className="message_error">{errors.fullName?.message}</p>
      </div>

      <div className="controller_update_profile">
        <input
          type="text"
          placeholder="Email"
          name="email"
          disabled={user?.provider !== "form" ? true : false}
          className={user?.provider !== "form" ? "disabled" : ""}
          ref={register({
            required: {
              value: true,
              message: "Please enter your email",
            },
            pattern: {
              value: environments.email_pattern,
              message: "Email invalid",
            },
          })}
        />
        <p className="message_error">{errors.email?.message}</p>
      </div>

      <div className="controller_update_profile">
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          ref={register({
            required: {
              value: true,
              message: "Please enter your phone",
            },
            pattern: {
              value: environments.number_pattern,
              message: "Just Numbers",
            },
          })}
        />
        <p className="message_error">{errors.phone?.message}</p>
      </div>

      <div className="controller_area_update_profile">
        <textarea
          placeholder="About You"
          name="description"
          ref={register({
            required: {
              value: true,
              message: "Please enter your description",
            },
          })}
        />
        <p className="message_error">{errors.description?.message}</p>
      </div>

      <button className="btn_update_user" type="submit">
        {loading ? <LoadingSVG /> : null}
        Update
      </button>
    </form>
  );
};

export default FormComponent;
