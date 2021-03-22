import React from "react";
import BannerComponent from "./components/Banner/Banner";
import GalleryComponent from "./components/Gallery/Gallery";
import HeaderComponent from "./components/Header/Header";
import "./Home.scss";

const HomePage = () => {
  return (
    <div className="home_page_container">
      <HeaderComponent />
      <BannerComponent />
      <GalleryComponent />
    </div>
  );
};

export default HomePage;
