import axios from "axios";
import { useParams } from "react-router";
import { environments } from "../environments";
import { UserProfile } from "../models/user-profile";

const useUpdateUser = () => {
  const token = localStorage.getItem("t1ks1ehn");
  const { id } = useParams() as any;

  const updateProfile = async (body: UserProfile) => {
    const { data } = await axios.put(
      `${environments.api_uri}/update/${id}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  };

  return { update: updateProfile };
};

export default useUpdateUser;
