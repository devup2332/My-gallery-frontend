import axios from "axios";
import { environments } from "../environments";

export const UseHttp = async (path: string, petition: string, data?: any) => {
  if (petition === "get") {
    const res = await axios.get(`${environments.api_uri}${path}`);
    return res;
  }

  if (petition === "post") {
    const res = await axios.post(`${environments.api_uri}${path}`, data);
    return res;
  }

  if (petition === "put") {
    const res = await axios.put(`${environments.api_uri}${path}`, data);
    return res;
  }

  if (petition === "delete") {
    const res = await axios.delete(`${environments.api_uri}${path}`);
    return res;
  }
};
