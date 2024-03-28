/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */
import Cookies from "js-cookie";
import { api } from "../config/api";
import { IUser } from "../interfaces/IUser";

export function useUsers() {
  const token = Cookies.get("refreshToken");
  async function get() {
    try {
      const payload = (await api(token).get("/users")).data.payload;

      return payload;
    } catch (error: any) {
      throw error.response.data.error;
    }
  }
  async function getOne(cpf: string): Promise<IUser> {
    try {
      const payload = (await api().get("/users/one/" + cpf)).data.payload;

      return payload;
    } catch (error: any) {
      throw error.response.data.error;
    }
  }
  async function getAll() {
    try {
      const payload = (await api(token).get("/users/all")).data.payload;

      return payload;
    } catch (error: any) {
      throw error.response.data.error;
    }
  }
  async function editOne({
    id,
    credentials,
  }: {
    id: string;
    credentials: FormData;
  }) {
    try {
      const payload = (await api(token).put("/users/" + id, credentials)).data
        .payload;
      return payload;
    } catch (error: any) {
      throw error.response.data.error;
    }
  }
  async function deleteOne(id: string): Promise<string> {
    try {
      const payload = (await api(token).delete("/users/" + id)).data.payload;
      return payload;
    } catch (error: any) {
      throw error.response.data.error;
    }
  }
  async function register(credentials: FormData): Promise<string> {
    try {
      const payload = (await api(token).post("/auth/register", credentials))
        .data.payload;
      return payload;
    } catch (error: any) {
      throw error.response.data.error;
    }
  }

  return { get, getAll, getOne, editOne, register, deleteOne };
}
