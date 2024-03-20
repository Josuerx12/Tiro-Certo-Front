import { api } from "../config/api";
import Cookies from "js-cookie";
/* eslint-disable @typescript-eslint/no-explicit-any */
function useAcervo() {
  const token = Cookies.get("refreshToken");

  async function get() {
    // eslint-disable-next-line no-useless-catch
    try {
      const payload = (await api(token).get("/acervo")).data.payload;
      return payload;
    } catch (error: any) {
      throw error;
    }
  }
  return { get };
}

export { useAcervo };
