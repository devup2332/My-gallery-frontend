import React, { MouseEvent } from "react";
import "./DeletePropmt.scss";
import { ReactComponent as AlertSvg } from "../../assets/icons/alert.svg";
import { DeletePromptProps } from "../../models/Props/DeletePromptProps";
import axios from "axios";
import { environments } from "../../environments";

const DeletePropmt = ({ open, setOpen, photo }: DeletePromptProps) => {
  const closePrompt = (e: MouseEvent<HTMLDivElement>) => {
    const container = document.querySelector<HTMLDivElement>(
      ".deletepropmt-container"
    );
    if (e.target === container) {
      setOpen(false);
    }
  };

  const deletePhoto = async () => {
    await axios.delete(`${environments.api_uri}/photos/${photo.id}`);
    setOpen(false);
  };

  return (
    <div
      className={
        open ? "deletepropmt-container visible" : "deletepropmt-container"
      }
      onClick={closePrompt}
    >
      <div className="modal">
        <h1>Are you sure ?</h1>
        <p>This action wont be abble to reject</p>
        <AlertSvg />
        <div className="btns">
          <button type="button" onClick={deletePhoto}>
            Delete
          </button>
          <button type="button" onClick={() => setOpen(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePropmt;
