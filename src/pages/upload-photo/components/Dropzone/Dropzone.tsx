import React, { Fragment } from "react";
import UseDropzone from "../../../../hooks/UseDropZone";
import { DropzneProps } from "../../../../models/Props/DropzoneProps";
import { ReactComponent as CameraSVG } from "../../../../assets/icons/logo_movile.svg";

const Dropzone = ({ register }: DropzneProps) => {
  const { dropSection, url, handleChange } = UseDropzone();
  const inputFile = document.querySelector<HTMLInputElement>(".inputFIle");
  return (
    <Fragment>
      <div
        className="dropzone"
        ref={dropSection}
        style={{
          minHeight: inputFile?.value ? "fit-content" : "300px",
        }}
      >
        {!inputFile?.value ? (
          <div className="body-dropzone">
            <CameraSVG />
            <p className="text-dropzone">Drop here your photo</p>
          </div>
        ) : (
          <img src={url?.toString()} alt="" />
        )}
      </div>
      <input
        ref={register({
          required: {
            value: true,
            message: "Please enter your image",
          },
        })}
        type="file"
        name="image"
        className="inputFIle"
        onChange={handleChange}
      />
    </Fragment>
  );
};

export default Dropzone;
