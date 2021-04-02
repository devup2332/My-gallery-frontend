import axios from "axios";
import { useEffect, useState } from "react";
import { environments } from "../environments";
import { UserProfile } from "../models/user-profile";

export const useUserLogged = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const token = localStorage.getItem("t1ks1ehn");

  const getUser = async () => {
    try {
      if (token) {
        const { data } = await axios.get(
          `${environments.api_uri}/user_logged_profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(data.user);
      }
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    return () => {};
  }, []);

  return { user, getUser };
};

export default useUserLogged;
