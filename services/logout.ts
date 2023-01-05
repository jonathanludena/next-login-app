import axios from "axios";

export const logout = async () => {
  return await axios.post("/api/auth/logout");
};
