import React from "react";
import { SnackbarProps } from "../../../../models/SnackbarProps.model";

const Snackbar = ({ message, setMessage, timer }: SnackbarProps) => {
  const closeSnack = () => {
    clearTimeout(timer);
    setMessage("");
  };
  return (
    <div className={message ? "snackbar on" : "snackbar"}>
      <span className="snack_message">{message}</span>
      <button className="btn_close_snack" onClick={closeSnack}>
        Close
      </button>
    </div>
  );
};

export default Snackbar;