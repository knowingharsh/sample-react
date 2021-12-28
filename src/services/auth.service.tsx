import { publicAxios, privateAxios } from "../lib/axios";
import { Mutation } from "./mutation";
import { Query } from "./query";

export const AuthApi = {
  login: async ({ userName, password }: { userName: string, password: string }) => {
    const response = await publicAxios.request({
      data: {
        query: Mutation.login,
        variables: {
          "email": userName,
          "password": password
        }
      }
    })
    return response.data.data.login;
  },
  getAccessTokenFromRefreshToken: async ({ renewToken }: { renewToken: string | null }) => {
    const response = await privateAxios.request({
      data: {
        query: Query.get_access_token,
        variables: { renewToken }
      },
    });
    return response.data.data.getInfo;
  },
  authenticateToken: async () => {
    const response = await privateAxios.request({
      data: {
        query: Query.getInfo,
      }
    });
    return response.data.data.getInfo;
  }
}