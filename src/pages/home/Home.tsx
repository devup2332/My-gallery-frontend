import React, { useEffect } from "react";
import useUserLogged from "../../hooks/User-hook";
import BannerComponent from "./components/Banner/Banner";
import GalleryComponent from "./components/Gallery/Gallery";
import HeaderComponent from "./components/Header/Header";
import "./Home.scss";

const HomePage = () => {
  const { user, getUser } = useUserLogged();
  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="home_page_container fadeIn">
      <HeaderComponent user={user} />
      <BannerComponent user={user} />
      <GalleryComponent />
    </div>
  );
};

export default HomePage;
