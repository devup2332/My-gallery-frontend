import { Photo } from "../Interfaces/Photo";

export interface GalleryProps {
  photos: Photo[];
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}
