import React from "react";
import UseColumns from "../../../../hooks/UseColumns";
import { GalleryProps } from "../../../../models/Props/GalleryProps";
import ColumnGalleryComponent from "../ColumnGallery/ColumnGallery";

const GalleryComponent = ({ photos }: GalleryProps) => {
  const { columns } = UseColumns(photos);

  return (
    <div className="gallery_component_container">
      <div className="subcontainer_gallery">
        {columns.map((column) => {
          return (
            <ColumnGalleryComponent photos={column.photos} key={column.id} />
          );
        })}
      </div>
    </div>
  );
};

export default GalleryComponent;
