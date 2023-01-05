import axios from "axios";

export const getProfile = async () => {
  const { data } = await axios.post("/api/profile");
  return data;
};
