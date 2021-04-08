import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { environments } from "../environments";
import { Photo } from "../models/Interfaces/Photo";
import { UserProfile } from "../models/Interfaces/UserProfile";

export const useUser = () => {
  const [user, setUser] = useState<UserProfile>();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const token = localStorage.getItem("t1ks1ehn");

  const { location } = useHistory();

  const getUserPhotos = async (user?: UserProfile) => {
    const r = await axios.get(`${environments.api_uri}/photos/${user?.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (r.data.photos.length > 0) {
      return setPhotos(r.data.photos);
    }

    return setPhotos([]);
  };

  const getUser = async () => {
    const token = localStorage.getItem("t1ks1ehn");
    try {
      if (token) {
        const { data } = await axios.get(
          `${environments.api_uri}/user/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (location.pathname === "/profile") {
          await getUserPhotos(data.user);
        }
        setUser(data.user);

        return data.user as UserProfile;
      }
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  return { user, photos, getUser };
};

export default useUser;
