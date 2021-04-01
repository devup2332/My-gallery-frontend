import { useEffect, useState } from "react";
import { Image } from "../models/image";

let array: Image[][] = [];
let col: number;

const UseColumns = (images: Image[]) => {
  const [columns, setColumns] = useState<Image[][]>([]);

  useEffect(() => {
    const setImages = (columns: number) => {
      array = [];
      col = 0;
      setColumns([]);
      for (let i = 0; i < columns; i++) {
        array.push([]);
      }

      images.forEach((image) => {
        if (col < columns) {
          array[col].push(image);
          col++;
          return;
        }
        col = 0;
        array[col].push(image);
        col++;
      });
      setColumns(array);
    };

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
  }, [images]);

  return { columns };
};

export default UseColumns;
