import React, { useEffect, useState } from "react";
import HeaderComponent from "../../components/Header/Header";
import Wave from "../../assets/images/wave-image.png";
import GalleryComponent from "../home/components/Gallery/Gallery";
import { Link } from "react-router-dom";
import useUser from "../../hooks/UseUser";
import { ReactComponent as LoadingSVG } from "../../assets/icons/loading.svg";
import NoPhotos from "../../components/NoPhoto/NoPhoto";
import SliderImage from "../../components/SliderImages/SliderImage";

const ProfilePage = () => {
  const { user, photos } = useUser();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    return () => {};
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
        <GalleryComponent photos={photos} setIndex={setIndex} />
      ) : (
        <NoPhotos text="You dont have any photo" />
      )}

      <SliderImage photos={photos} index={index} setIndex={setIndex} />
    </div>
  );
};

export default ProfilePage;
