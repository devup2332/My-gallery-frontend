import React, { useEffect, useState } from "react";
import { images } from "../../../../data";
import { Image } from "../../../../models/image";
import ColumnGalleryComponent from "../ColumnGallery/ColumnGallery";
import "./Gallery.scss";

let imagesArray: Image[][] = [];
let col = 0;


const GalleryComponent = () => {
  const [columns, setColumns] = useState<Image[][]>([]);
  
  const defineGridLayaout = () => {
    const setImages = (columns: number) => {
      imagesArray=[];
      setColumns([]);
      col=0;
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

    const movilGrid = () => {
      const mql = window.matchMedia('screen and (min-width: 360px)');
      const evalQueriMovil = (queri: MediaQueryListEvent | MediaQueryList ) => {
        if (queri.matches) {
          setImages(1);
        }else {
          setImages(1);
        }
      };
      mql.addEventListener("change", evalQueriMovil);
      evalQueriMovil(mql)
    }

    const tabletGrid = () => {
      const mql = window.matchMedia("screen and (min-width: 600px)");
      const evalQueriMovil = (queri: MediaQueryListEvent | MediaQueryList ) => {
        if (queri.matches) {
          setImages(2);
        }else {
          setImages(1);
        }
      };
      mql.addEventListener("change", evalQueriMovil);
      evalQueriMovil(mql)
    }


    const desktopGrid = () => {
      const mql = window.matchMedia("screen and (min-width: 1200px)");
      const evalQueriMovil = (queri: MediaQueryListEvent | MediaQueryList ) => {
        if (queri.matches) {
          setImages(3);
        }else if(document.documentElement.clientWidth > 600) {
          setImages(2);

        }
      };
      mql.addEventListener("change", evalQueriMovil);
      evalQueriMovil(mql)
    }
    tabletGrid();
    movilGrid();
    desktopGrid();
    
  }
  

  useEffect(()=> {

    defineGridLayaout();

    return
  },[]);
  return (
    <div className="gallery_component_container">
      <div className="subcontainer_gallery">
        {
          columns.map(images => {
            return <ColumnGalleryComponent images={images} key={images[0].id}/>
          })
        }
      </div>
    </div>
  );
};

export default GalleryComponent;
