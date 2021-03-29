import React, { useEffect, useState } from "react";
import { images } from "../../../../data";
import { Image } from "../../../../models/image";
import ColumnGalleryComponent from "../ColumnGallery/ColumnGallery";

let imagesArray: Image[][] = [];
let col = 0;

const GalleryComponent = () => {
  const [columns, setColumns] = useState<Image[][]>([]);

  const setImages = (columns: number) => {
    imagesArray = [];
    setColumns([]);
    col = 0;
    for (let i = 0; i < columns; i++) {
      imagesArray.push([]);
    }

    images.forEach((image) => {
      if (col < columns) {
        imagesArray[col].push(image);
        col++;
        return;
      }
      col = 0;
      imagesArray[col].push(image);
      col++;
    });
    setColumns(imagesArray);
  };

  useEffect(() => {
    const ResizeHandler = () => {
      const width = document.documentElement.clientWidth + 15;
      if (width >= 360 && width < 600) {
        setImages(1);
      }

      if (width >= 600 && width < 1200) {
        setImages(2);
      }

      if (width >= 1200) {
        setImages(3);
      }
    };

    window.addEventListener("resize", ResizeHandler);
    ResizeHandler();

    return () => {
      window.removeEventListener("resize", ResizeHandler);
    };
  }, []);
  return (
    <div className="gallery_component_container">
      <div className="subcontainer_gallery">
        {columns.map((images) => {
          return <ColumnGalleryComponent images={images} key={images[0].id} />;
        })}
      </div>
    </div>
  );
};

export default GalleryComponent;
