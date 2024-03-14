/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { IUser } from "../interfaces/IUser";
import Cookies from "js-cookie";
import { api } from "../config/api";

type States = {
  user?: IUser;
};

type Actions = {
  logout: () => void;
  getUser: () => Promise<void>;
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
  logout: () => {
    Cookies.remove("refreshToken");
    set(() => ({ user: undefined }));
  },
}));

export { useAuth };
