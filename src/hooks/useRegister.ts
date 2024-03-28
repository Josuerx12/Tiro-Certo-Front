/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../config/api";
import Cookies from "js-cookie";
import { IRegister } from "../interfaces/IRegister";
import { NewRegisterCredentials } from "../components/Modals/Registro/New";

function useRegister() {
  const token = Cookies.get("refreshToken");

  async function create(credentials: NewRegisterCredentials): Promise<string> {
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
  async function userRegistersById(userId: string): Promise<IRegister[]> {
    try {
      const payload = (
        await api(token).get("/activityRegisters/user/" + userId)
      ).data.payload;

      return payload;
    } catch (error: any) {
      throw error.data.response.error;
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

  return {
    create,
    userRegisters,
    oneRegister,
    allRegisters,
    userRegistersById,
  };
}

export { useRegister };
