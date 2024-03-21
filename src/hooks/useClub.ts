/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */
import Cookies from "js-cookie";
import { api } from "../config/api";

function useClub() {
  const token = Cookies.get("refreshToken");
  async function get() {
    try {
      const payload = (await api(token).get("/clubs")).data.payload;

      return payload;
    } catch (error: any) {
      throw error;
    }
  }

  async function getOne(id: string) {
    try {
      const payload = (await api(token).get("/clubs/" + id)).data.payload;

      return payload;
    } catch (error: any) {
      throw error;
    }
  }

  async function create(credentials: FormData) {
    try {
      const payload = (await api(token).post("/clubs", credentials)).data
        .payload;

      return payload;
    } catch (error: any) {
      throw error.response.data.error;
    }
  }

  async function edit(id: string, credentials: FormData) {
    try {
      const payload = (await api(token).put("/clubs/" + id, credentials)).data
        .payload;

      return payload;
    } catch (error: any) {
      throw error.response.data.error;
    }
  }

  async function deleteOne(id: string) {
    try {
      const payload = (await api(token).delete("/clubs/" + id)).data.payload;

      return payload;
    } catch (error: any) {
      throw error;
    }
  }

  return { get, getOne, create, edit, deleteOne };
}

export { useClub };
