import React from "react";
import "./ColumnGallery.scss";
import { ColumGallery } from "../../../../models/column";
import { ReactComponent as DownloadSVG } from "../../../../assets/icons/download.svg";

const ColumnGalleryComponent = ({ images }: ColumGallery) => {
  return (
    <div className="column_gallery">
      {images.map((image) => {
        return (
          <div className="image_container" key={image.id}>
            <img src={image.url} alt="" />
            <div className="hover_container">
              <button className="download_image_btn">
                <DownloadSVG />
              </button>
              <div className="username_information">
                <div className="image_avatar_container">
                  <img src={image.user.avatar} alt="" />
                </div>
                <span className="username_name">{`${image.user.name} ${image.user.lastName}`}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ColumnGalleryComponent;
