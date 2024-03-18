import axios from "axios";

export const api = (token?: string) => {
  let connection;

  if (token) {
    return (connection = axios.create({
      baseURL: "http://localhost:3333/",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }));
  }

  connection = axios.create({
    baseURL: "http://localhost:3333/",
  });

  return connection;
};
