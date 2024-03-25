import axios from "axios";

export const api = (token?: string) => {
  let connection;

  if (token) {
    return (connection = axios.create({
      baseURL: "https://tiro-facil.vercel.app/",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }));
  }

  connection = axios.create({
    baseURL: "https://tiro-facil.vercel.app/",
  });

  return connection;
};
