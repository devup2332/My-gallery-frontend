import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import HeaderComponent from "../../components/Header/Header";
import SliderImage from "../../components/SliderImages/SliderImage";
import { environments } from "../../environments";
import useUser from "../../hooks/UseUser";
import { Photo } from "../../models/Interfaces/Photo";
import GalleryComponent from "../home/components/Gallery/Gallery";

const SearchPage = () => {
  const { user } = useUser();
  const { text } = useParams() as any;
  const [index, setIndex] = useState(0);
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const getPhotos = async () => {
      const r = await axios.get(
        `${environments.api_uri}/photos/search/${text}`
      );
      setPhotos(r.data.photos);
    };
    getPhotos();
  }, [text]);
  return (
    <div className="search-page fadeIn">
      {user ? <HeaderComponent user={user} /> : <HeaderComponent />}
      {photos ? <GalleryComponent photos={photos} setIndex={setIndex} /> : null}

      <SliderImage photos={photos} index={index} setIndex={setIndex} />
    </div>
  );
};

export default SearchPage;
