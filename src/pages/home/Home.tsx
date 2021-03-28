import axios from "axios";
import React, { useEffect, useState } from "react";
import { environments } from "../../environments";
import BannerComponent from "./components/Banner/Banner";
import GalleryComponent from "./components/Gallery/Gallery";
import HeaderComponent from "./components/Header/Header";
import "./Home.scss";

const HomePage = () => {
  const [user, setUser] = useState();

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

      setUser(data.user);
      return;
    }

    return;
  };

  useEffect(() => {
    getUserData();
    return;
  }, []);

  return (
    <div className="home_page_container">
      <HeaderComponent user={user} />
      <BannerComponent user={user} />
      <GalleryComponent />
    </div>
  );
};

export default HomePage;
