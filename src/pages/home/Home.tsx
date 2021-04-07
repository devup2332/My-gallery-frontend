import axios from "axios";
import React, { useEffect, useState } from "react";
import NoPhoto from "../../components/NoPhoto/NoPhoto";
import { environments } from "../../environments";
import useUser from "../../hooks/UseUser";
import BannerComponent from "./components/Banner/Banner";
import GalleryComponent from "./components/Gallery/Gallery";
import HeaderComponent from "../../components/Header/Header";
import "./Home.scss";
import { useParams } from "react-router";

const HomePage = () => {
  const { user } = useUser();
  const [photos, setPhotos] = useState([]);
  const { text } = useParams() as any;

  const getPhotos = async () => {
    const r = await axios.get(`${environments.api_uri}/photos`);
    setPhotos(r.data.photos);
  };

  useEffect(() => {
    getPhotos();
    // eslint-disable-next-line
  }, [text]);

  return (
    <div className="home_page_container fadeIn">
      <HeaderComponent user={user} />
      <BannerComponent user={user} />
      {photos.length > 0 ? (
        <GalleryComponent photos={photos} />
      ) : (
        <NoPhoto text="Database is void" />
      )}
    </div>
  );
};

export default HomePage;
