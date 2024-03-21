/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from "js-cookie";
import { api } from "../config/api";

type TWCredentials = {
  name: string;
  categoryId: string;
  modelo: string;
  registro: number;
  validade: string;
};

function useWeapons() {
  const token = Cookies.get("refreshToken");

  async function create(WCredentials: TWCredentials) {
    try {
      const payload = (await api(token).post("/weapons/", WCredentials)).data
        .payload;
      return payload;
    } catch (error: any) {
      throw error.response.data.error;
    }
  }

  return { create };
}

export { useWeapons };
