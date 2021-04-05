import axios from "axios";
import { useRef, useState } from "react";
import { environments } from "../environments";
import useUpdateUser from "./Update-profile-hook";

const usePhoto = () => {
  const { update } = useUpdateUser();
  const progressRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const handleProgress = (e: any) => {
    const p = (e.loaded * 100) / e.total;
    setProgress(p);
  };

  const updatePhoto = async (file: any) => {
    setProgress(0);

    const formData = new FormData();
    const token = localStorage.getItem("t1ks1ehn");
    try {
      const { data } = await axios.get(`${environments.api_uri}/signature`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      formData.append("file", file);
      formData.append("signature", data.signature);
      formData.append("api_key", data.api_key);
      formData.append("timestamp", data.timestamp);
      progressRef.current?.classList.add("on");

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dder8kjda/image/upload",
        formData,
        {
          onUploadProgress: handleProgress,
        }
      );

      const { secure_url, public_id } = res.data;
      update({
        avatar: {
          secure_url,
          public_id,
        },
      });
    } catch (err) {
      throw err.message;
    }
  };

  return { progress, updatePhoto, progressRef };
};

export default usePhoto;
