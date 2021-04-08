import React, { useEffect, useState } from "react";
import HeaderComponent from "../../components/Header/Header";
import Wave from "../../assets/images/wave-image.png";
import GalleryComponent from "../home/components/Gallery/Gallery";
import { Link } from "react-router-dom";
import useUser from "../../hooks/UseUser";
import { ReactComponent as LoadingSVG } from "../../assets/icons/loading.svg";
import NoPhotos from "../../components/NoPhoto/NoPhoto";
import SliderImage from "../../components/SliderImages/SliderImage";
import DeletePropmt from "../../components/DeletePropmt/DeletePropmt";
import { channel } from "../../app";

const ProfilePage = () => {
  const { user, photos, getUser } = useUser();
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    channel.bind("photo-deleted", async ({ message }: any) => {
      await getUser();
      console.log(message);
    });
    return () => {
      channel.unbind("photo-deleted");
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="profile_page_container fadeIn">
      {user ? <HeaderComponent user={user} /> : null}
      <div className="information_container">
        <img className="wave_image" src={Wave} alt="" />

        {user?.id ? (
          <div className="body_information_container">
            <div className="profile_image_container">
              <img
                className="user_image"
                src={user?.avatar?.secure_url}
                alt=""
              />
            </div>
            <div className="information_text_container">
              <h1 className="user_fullName">{user?.fullName}</h1>
              <p className="user_email">{user?.email}</p>
              <Link
                to={`/edit-profile/${user?.id}`}
                className="btn_edit_user_profile"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        ) : (
          <LoadingSVG className="loading_container loading" />
        )}
      </div>
      {photos?.length > 0 ? (
        <GalleryComponent
          photos={photos}
          setIndex={setIndex}
          setOpen={setOpen}
        />
      ) : (
        <NoPhotos text="You dont have any photo" />
      )}

      <SliderImage photos={photos} index={index} setIndex={setIndex} />
      <DeletePropmt open={open} setOpen={setOpen} photo={photos[index]} />
    </div>
  );
};

export default ProfilePage;
