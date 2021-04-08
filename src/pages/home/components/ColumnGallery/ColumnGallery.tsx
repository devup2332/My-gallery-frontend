import React from "react";
import { ColumnGalleryProps } from "../../../../models/Props/ColumnsProps";
import { ReactComponent as DownloadSVG } from "../../../../assets/icons/download.svg";
import { ReactComponent as TrashSVG } from "../../../../assets/icons/trash.svg";
import { useHistory } from "react-router";

const ColumnGalleryComponent = ({ photos }: ColumnGalleryProps) => {
  const { location } = useHistory();
  return (
    <div className="column_gallery">
      {photos?.map((photo) => {
        return (
          <div className="image_container" key={photo?.id}>
            <img src={photo.secure_url} alt="" />
            <div className="hover_container">
              {location.pathname === "/profile" ? (
                <button className="btn_delete_photo">
                  <TrashSVG />
                </button>
              ) : null}
              <button className="download_image_btn">
                <DownloadSVG />
              </button>
              <div className="username_information">
                <div className="image_avatar_container">
                  <img src={photo.user.avatar.secure_url} alt="" />
                </div>
                <span className="username_name">{`${photo?.user?.fullName}`}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ColumnGalleryComponent;
