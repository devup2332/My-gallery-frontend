import React, { useEffect, useRef, useState } from "react";
import useUserLogged from "../../hooks/User-hook";
import HeaderComponent from "../home/components/Header/Header";
import { ReactComponent as DownloadSvg } from "../../assets/icons/download.svg";
import { ReactComponent as CloseSvg } from "../../assets/icons/close.svg";
import { useForm } from "react-hook-form";
import UseDropzone from "../../hooks/Drop-zone.hook";
import UseTags from "../../hooks/Tag-hook";
import axios from "axios";
import { environments } from "../../environments";
import Progress from "../edit-profile/components/Progress/Progress";

const UploadPhotoPage = () => {
  const { user, getUser } = useUserLogged();
  const [progress, setProgress] = useState(0);
  const { register, handleSubmit, errors, setValue, reset } = useForm();
  const progressRef = useRef<HTMLDivElement>(null);
  const {
    deletTag,
    handleInputChange,
    handleOption,
    tags,
    autocompleteOptions,
    openContainerOptions,
    containerOptions,
    setTags,
  } = UseTags();

  const {
    dropSection,
    file,
    handleChange,
    url,
    setUrl,
    setFile,
  } = UseDropzone();

  const handleProgress = (e: any) => {
    const p = (e.loaded * 100) / e.total;
    setProgress(p);
  };

  const uploadPhoto = async (fields: any) => {
    progressRef.current?.classList.add("on");
    fields.tags = tags;
    setProgress(0);
    const fd = new FormData();
    const token = localStorage.getItem("t1ks1ehn");
    const { data } = await axios.get(`${environments.api_uri}/signature`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fd.append("file", fields.image[0]);
    fd.append("signature", data.signature);
    fd.append("api_key", data.api_key);
    fd.append("timestamp", data.timestamp);

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dder8kjda/image/upload",
      fd,
      {
        onUploadProgress: handleProgress,
      }
    );

    fields.image = {
      public_id: res.data.public_id,
      secure_url: res.data.secure_url,
    };

    await axios.post(
      `${environments.api_uri}/photos/upload-photo/${user?.id}`,
      fields,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    reset();
    setTags([]);
    setFile(null);
    setUrl("");
    progressRef.current?.classList.remove("on");
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="upload_photo_page">
      <HeaderComponent user={user} />
      <div className="upload_photo_page_body">
        <div
          className="drop_section_controller_container"
          style={{
            minHeight: !file ? "" : "unset",
          }}
        >
          <div
            className="drop_section_container"
            ref={dropSection}
            style={{ minHeight: !file ? "" : "unset" }}
            onClick={() =>
              document.querySelector<HTMLInputElement>(".inputFIle")?.click()
            }
          >
            {!file ? (
              <div className="body_drop_section">
                <DownloadSvg />
                <p className="drop_section_text">DROP HERE YOUR PHOTO</p>
              </div>
            ) : (
              <img src={url as string} alt="" />
            )}
            <input
              className="inputFIle"
              type="file"
              onChange={handleChange}
              style={{ display: "none" }}
              name="image"
              ref={register({
                required: {
                  value: true,
                  message: "PLease insert a image",
                },
              })}
            />
          </div>

          <div className="message_error">{errors.image?.message}</div>
        </div>

        <form className="form" onSubmit={handleSubmit(uploadPhoto)}>
          <div className="controller_upload">
            <input
              type="text"
              placeholder="Photo Name"
              autoComplete="off"
              name="name"
              className="input"
              ref={register({
                required: {
                  value: true,
                  message: "Enter a photo name",
                },
              })}
            />

            <p className="message_error">{errors.name?.message}</p>
          </div>

          <div className="tag_controller_container">
            <div className="tags_controller_subcontainer">
              {tags.map((tag) => {
                return (
                  <span key={tag.id}>
                    {tag.name} <CloseSvg onClick={() => deletTag(tag)} />
                  </span>
                );
              })}
              <input
                onClick={openContainerOptions}
                type="text"
                onChange={handleInputChange}
                placeholder="Tags"
                className="inputTags"
                name="tags"
                autoComplete="off"
                ref={register({
                  validate: {
                    noVoid: () => {
                      if (tags.length > 0) {
                        return true;
                      }
                      return "Enter at least 1 tag";
                    },
                  },
                })}
              />
              <div className="options_container" ref={containerOptions}>
                {autocompleteOptions.slice(0, 5).map((option) => {
                  return (
                    <p
                      className="option"
                      key={option.id}
                      onClick={() => handleOption(option, setValue)}
                    >
                      {option.name}
                    </p>
                  );
                })}
              </div>
            </div>

            <p className="message_error">
              {tags.length < 1 ? errors.tags?.message : ""}
            </p>
          </div>

          <div className="textarea_controller_upload">
            <textarea
              placeholder="Description"
              name="description"
              autoComplete="off"
              ref={register({
                required: {
                  value: true,
                  message: "Enter a description",
                },
              })}
            />

            <p className="message_error">{errors.description?.message}</p>
          </div>

          <button className="btn_upload_photo" type="submit">
            Upload
          </button>
        </form>
      </div>
      <Progress progress={progress} progressRef={progressRef} />
    </div>
  );
};

export default UploadPhotoPage;
