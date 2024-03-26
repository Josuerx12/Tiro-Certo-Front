/* eslint-disable no-useless-catch */
import { api } from "../config/api";
import Cookies from "js-cookie";
import { IWeapon } from "../interfaces/IWeapon";
/* eslint-disable @typescript-eslint/no-explicit-any */
function useAcervo() {
  const token = Cookies.get("refreshToken");

  async function get(): Promise<IWeapon[]> {
    try {
      const payload = (await api(token).get("/acervo")).data.payload;
      return payload;
    } catch (error: any) {
      throw error;
    }
  }

  async function getById(id: string): Promise<IWeapon[]> {
    try {
      const payload = (await api().get("/acervo/" + id)).data.payload;
      return payload;
    } catch (error: any) {
      throw error;
    }
  }
  return { get, getById };
}

export { useAcervo };
