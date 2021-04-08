import React from "react";
import UseColumns from "../../../../hooks/UseColumns";
import { GalleryProps } from "../../../../models/Props/GalleryProps";
import { ReactComponent as DownloadSVG } from "../../../../assets/icons/download.svg";
import { ReactComponent as TrashSVG } from "../../../../assets/icons/trash.svg";
import { useHistory } from "react-router";
import disbleScroll from "disable-scroll";

const GalleryComponent = ({ photos, setIndex }: GalleryProps) => {
  const { columns } = UseColumns(photos);
  const { location } = useHistory();

  const openViewPhoto = (
    index: number,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const hoverContainer = document.querySelectorAll(".hover_container");
    const gallery = document.querySelector(".slider_image_component");
    console.log(hoverContainer);
    if (e.target === hoverContainer[index]) {
      gallery?.classList.add("visible");
      setIndex(index);
      disbleScroll.on();
    }
  };

  return (
    <div className="gallery_component_container">
      <div className="subcontainer_gallery">
        {columns.map((column) => {
          return (
            <div className="column_gallery" key={column.id}>
              {column.photos?.map((photo) => {
                return (
                  <div
                    className="image_container"
                    key={photo?.id}
                    onClick={(e) => openViewPhoto(photos.indexOf(photo), e)}
                  >
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
        })}
      </div>
    </div>
  );
};

export default GalleryComponent;
