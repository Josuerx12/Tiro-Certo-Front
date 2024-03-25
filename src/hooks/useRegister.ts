/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewRegisterCredentials } from "../components/Modals/registro/new";
import { api } from "../config/api";
import Cookies from "js-cookie";
import { IRegister } from "../interfaces/IRegister";

function useRegister() {
  const token = Cookies.get("refreshToken");

  async function create(credentials: NewRegisterCredentials) {
    try {
      const payload = (
        await api(token).post("/activityRegisters/", credentials)
      ).data.payload;

      return payload;
    } catch (error: any) {
      throw error.response.data.error;
    }
  }

  async function userRegisters(): Promise<IRegister[]> {
    try {
      const payload = (await api(token).get("/activityRegisters/")).data
        .payload;

      return payload;
    } catch (error: any) {
      throw error;
    }
  }
  async function allRegisters(): Promise<IRegister[]> {
    try {
      const payload = (await api(token).get("/activityRegisters/all")).data
        .payload;

      return payload;
    } catch (error: any) {
      throw error;
    }
  }
  async function oneRegister(id: string): Promise<IRegister> {
    try {
      const payload = (await api(token).get("/activityRegisters/" + id)).data
        .payload;

      return payload;
    } catch (error: any) {
      throw error;
    }
  }

  return { create, userRegisters, oneRegister, allRegisters };
}

export { useRegister };
