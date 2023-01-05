import axios from "axios";

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { data } = await axios.post("/api/auth/login", {
    email: email,
    password: password,
  });

  return data;
};
