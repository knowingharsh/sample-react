import { publicAxios } from "../lib/axios";
import { PublicEndPoints } from "./endpoints";

export const AuthApi = {
  login: async ({ userName, password }: { userName:string, password:string }) => {
    const response = await publicAxios.post(PublicEndPoints.Login, { userName, password });
    return response.data;
  },
  getAccessTokenFromRefreshToken: async ({ renewToken }: { renewToken: string | null }) => {
    const response = await publicAxios.post(PublicEndPoints.RenewToken, { renewToken });
    const { accessToken } = response.data;
    return { accessToken };
  },
  authenticateToken: async ({ accessToken }: { accessToken: string | null }) => {
    const response = await publicAxios.post(PublicEndPoints.VerifyToken, { accessToken });
    return response.data;
  }
}