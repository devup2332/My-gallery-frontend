import React, { useEffect, useState } from "react";
import HeaderComponent from "../../components/Header/Header";
import useUser from "../../hooks/UseUser";
import { useForm } from "react-hook-form";
import Dropzone from "./components/Dropzone/Dropzone";
import InputTags from "../../components/InputTags/InputTags";
import { Tag } from "../../models/Interfaces/Tag";
import Progress from "../../components/Progress/Progress";
import useUploadPhoto from "../../hooks/UseUploadPhoto";
import { NewPhoto } from "../../models/Interfaces/NewPhoto";
import Snackbar from "../../components/Snackbar/Snackbar";

let timer: NodeJS.Timer;

const UploadPhotoPage = () => {
  const { user } = useUser();
  const [tags, setTags] = useState<Tag[]>([]);
  const [open, setOpen] = useState(false);

  const { handleSubmit, errors, register, reset } = useForm();
  const { progress, uploadNewPhoto, progressRef } = useUploadPhoto();

  const uploadImage = async (form: NewPhoto) => {
    for (const tag of tags) {
      tag.name = tag.name.toLowerCase();
    }
    console.log(tags);
    form.tags = tags;
    clearTimeout(timer);
    setOpen(false);
    await uploadNewPhoto(form);
    reset({
      image: "",
    });
    setTags([]);
    setOpen(true);
    timer = setTimeout(() => {
      setOpen(false);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div className="upload_photo_page fadeIn">
      <HeaderComponent user={user} />

      <div className="container">
        <h1 className="title_page">Upload Photo</h1>
        <div className="dropzone-container">
          <Dropzone register={register} />
          <div className="message_error">{errors.image?.message}</div>
        </div>

        <form className="form">
          <div className="controller_container">
            <input
              type="text"
              placeholder="Photo Name"
              name="name"
              autoComplete="off"
              ref={register({
                required: {
                  value: true,
                  message: "Please enter a photo name",
                },
              })}
            />

            <p className="message_error">{errors.name?.message}</p>
          </div>

          <div className="special-container">
            <InputTags register={register} setTags={setTags} tags={tags} />
            <p className="message_error">
              {tags.length < 1 ? errors.tags?.message : ""}
            </p>
          </div>

          <div className="controller-textarea-container">
            <textarea
              placeholder="Photo Name"
              name="description"
              autoComplete="off"
              ref={register({
                required: {
                  value: true,
                  message: "Please enter a description",
                },
              })}
            />

            <p className="message_error">{errors.description?.message}</p>
          </div>

          <button
            className="btn-upload-image"
            type="button"
            onClick={handleSubmit(uploadImage)}
          >
            Upload
          </button>
        </form>
      </div>

      <Progress progress={progress} progressRef={progressRef} />
      <Snackbar message="Photo upload" open={open} />
    </div>
  );
};

export default UploadPhotoPage;
