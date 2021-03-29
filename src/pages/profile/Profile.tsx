import axios from "axios";
import React, { useEffect, useState } from "react";
import { environments } from "../../environments";
import HeaderComponent from "../home/components/Header/Header";
import Wave from "../../assets/images/wave-image.png";
import { UserProfile } from "../../models/user-profile";
import GalleryComponent from "../home/components/Gallery/Gallery";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState<UserProfile>({});

  const getUserData = async () => {
    const token = localStorage.getItem("t1ks1ehn");
    if (token) {
      const { data } = await axios.get(
        `${environments.api_uri}/user_logged_profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return setUser(data.user);
    }

    return;
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div className="profile_page_container">
      <HeaderComponent user={user} />

      <div className="information_container">
        <img className="wave_image" src={Wave} alt="" />

        <div className="body_information_container">
          <div className="profile_image_container">
            <img className="user_image" src={user.avatar} alt="" />
          </div>
          <div className="information_text_container">
            <h1 className="user_fullName">{user?.fullName}</h1>
            <p className="user_email">{user?.email}</p>
            <Link
              to={`edit-profile${user.id}`}
              className="btn_edit_user_profile"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
      <GalleryComponent />
    </div>
  );
};

export default ProfilePage;
