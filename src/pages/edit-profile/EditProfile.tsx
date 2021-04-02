import React, { useEffect, useRef, useState } from "react";
import UseUser from "../../hooks/User-hook";
import HeaderComponent from "../home/components/Header/Header";
import { ReactComponent as CameraSvg } from "../../assets/icons/logo_movile.svg";
import Form from "./components/Form/Form";
import Snackbar from "../login/components/Snackbar/Snackbar";
import { channel } from "../../app";
import useUpdateUser from "../../hooks/Update-profile-hook";
import usePhoto from "../../hooks/Photo-update-hook";

let timer: NodeJS.Timer;

const EditProfilePage = () => {
  const { user, getUser } = UseUser();
  const { update } = useUpdateUser();
  const { progress, updatePhoto, progressRef } = usePhoto();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const inputFile = useRef<HTMLInputElement>(null);

  const updateUser = async (body: any) => {
    setLoading(true);
    if (timer) {
      clearTimeout(timer);
    }
    await update(body);

    setLoading(false);

    timer = setTimeout(() => {
      setMessage("");
      clearTimeout(timer);
    }, 3000);
  };

  const handleFile = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    await updatePhoto(file);
    progressRef.current?.classList.remove("on");
  };

  useEffect(() => {
    channel.bind("user-photo-updated", ({ message }: any) => {
      getUser();
      setMessage(message);
      timer = setTimeout(() => {
        setMessage("");
        clearTimeout(timer);
      }, 3000);
    });

    channel.bind("user-updated", ({ message }: any) => {
      setMessage(message);
    });

    getUser();

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
      channel.unbind();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="edit_profile_page fadeIn">
      <HeaderComponent user={user} />
      <div className="subcontainer_edit_profile">
        <h1 className="title_edit_profile">EDIT PROFILE</h1>
        <div className="form_container">
          <div
            className="image_profile_container"
            onClick={() => inputFile.current?.click()}
          >
            <img src={user?.avatar.secure_url} alt="" />
            <div className="hover_content">
              <CameraSvg />
              <p className="hover_text">CHANGE PHOTO</p>
            </div>
          </div>
          <input
            type="file"
            name=""
            id=""
            style={{ display: "none" }}
            ref={inputFile}
            onChange={handleFile}
          />
          <Form user={user} updateUser={updateUser} loading={loading} />
        </div>
      </div>
      <Snackbar message={message} timer={timer} setMessage={setMessage} />
      <div className="progress_container" ref={progressRef}>
        <div className="progress_bar_container">
          <h1 className="progress_title">Uploading</h1>
          <div className="bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
