/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { IUser } from "../interfaces/IUser";
import Cookies from "js-cookie";
import { api } from "../config/api";
import { ILoginCredentials } from "../interfaces/ILoginCredentials";

type States = {
  user?: IUser;
};

type Actions = {
  logout: () => void;
  getUser: () => Promise<void>;
  login: (credentials: ILoginCredentials) => Promise<string>;
};

const useAuth = create<States & Actions>((set) => ({
  user: undefined,
  getUser: async () => {
    const token = Cookies.get("refreshToken");

    try {
      const res = await api(token).get("/users");

      set(() => ({ user: res.data.payload as IUser }));
    } catch (error: any) {
      console.log(error.message);
      set(() => ({ user: undefined }));
      Cookies.remove("refreshToken");
    }
  },
  login: async (credentials: ILoginCredentials) => {
    try {
      const res = await api().post("auth/login", credentials);
      Cookies.set("refreshToken", res.data.payload);
      return res.data.payload as string;
    } catch (e: any) {
      throw e.response.data.error;
    }
  },
  logout: () => {
    Cookies.remove("refreshToken");
    set(() => ({ user: undefined }));
  },
}));

export { useAuth };
