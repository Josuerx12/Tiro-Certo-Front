/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */
import { api } from "../config/api";
import Cookies from "js-cookie";

export function useWeaponCategory() {
  const token = Cookies.get("refreshToken");
  async function Fetch() {
    try {
      const categories = (await api(token).get("/weaponsCategories/")).data
        .payload;

      return categories;
    } catch (error: any) {
      throw error;
    }
  }
  async function Create(credentials: FormData) {
    try {
      const payload = (
        await api(token).post("/weaponsCategories/", credentials)
      ).data.payload;

      return payload;
    } catch (error: any) {
      throw error;
    }
  }

  async function Delete(id: string) {
    try {
      const payload = (await api(token).delete(`/weaponsCategories/${id}`)).data
        .payload;

      return payload;
    } catch (error: any) {
      throw error;
    }
  }
  async function Edit(id: string, credentials: FormData) {
    try {
      const payload = (
        await api(token).put(`/weaponsCategories/${id}`, credentials, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      ).data.payload;

      return payload;
    } catch (error: any) {
      throw error;
    }
  }

  return { Fetch, Delete, Edit, Create };
}
