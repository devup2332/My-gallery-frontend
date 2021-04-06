import axios from "axios";
import { useRef, useState } from "react";
import { environments } from "../environments";
import { NewPhoto } from "../models/Interfaces/NewPhoto";

const useUploadPhoto = () => {
  const [progress, setProgress] = useState(0);
  const token = localStorage.getItem("t1ks1ehn");
  const progressRef = useRef<HTMLDivElement>(null);

  const handleProgress = (e: any) => {
    const p = (e.loaded * 100) / e.total;
    setProgress(p);
  };
  const uploadNewPhoto = async (p: NewPhoto) => {
    progressRef.current?.classList.add("on");
    setProgress(0);
    const fd = new FormData();

    const r = await axios.get(`${environments.api_uri}/photos/signature`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fd.append("file", p.image?.[0] as Blob);
    fd.append("signature", r.data.signature);
    fd.append("api_key", r.data.api_key);
    fd.append("timestamp", r.data.timestamp);

    const r2 = await axios.post(
      "https://api.cloudinary.com/v1_1/dder8kjda/image/upload",
      fd,
      {
        onUploadProgress: handleProgress,
      }
    );

    const photo = {
      description: p.description,
      name: p.name,
      tags: p.tags,
      image: {
        secure_url: r2.data.secure_url,
        public_id: r2.data.public_id,
      },
    };

    await axios.post(`${environments.api_uri}/photos/upload-photo/`, photo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    progressRef.current?.classList.remove("on");
  };

  return { uploadNewPhoto, progress, progressRef };
};

export default useUploadPhoto;
