import React from "react";
import { images } from "../../../../data";
import UseColumns from "../../../../hooks/Columns-hook";
import ColumnGalleryComponent from "../ColumnGallery/ColumnGallery";

const GalleryComponent = () => {
  const { columns } = UseColumns(images);
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
