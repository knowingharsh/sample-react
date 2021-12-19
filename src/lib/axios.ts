import axios from 'axios';
import { EnvConfig } from '../configurations';
import { Services } from '../service';
import { LocalStorage, LocalStorageEnum } from './local-storage';

const publicAxios = axios.create({
  baseURL: EnvConfig.API_URL,
});

const privateAxios = axios.create({
  baseURL: EnvConfig.API_URL,
});


privateAxios.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${LocalStorage.getItem(LocalStorageEnum.ACCESS_TOKEN)}`,
  };
  return config;
}, (error) => {
  return Promise.reject(error);
});

let isAlreadyFetchingAccessToken = false;
privateAxios.interceptors.response.use((config) => config, async (error) => {
  const old_access_token = localStorage.getItem(LocalStorageEnum.ACCESS_TOKEN);
  if (error.response.status === 401 && old_access_token && !isAlreadyFetchingAccessToken) {
    isAlreadyFetchingAccessToken = true;
    return (async () => { /* retry */
      const { accessToken } = await Services.AuthApi.getAccessTokenFromRefreshToken({ renewToken: LocalStorage.getItem(LocalStorageEnum.RENEW_TOKEN) });
      isAlreadyFetchingAccessToken = false;
      if (accessToken) {
        error.config.headers.Authorization = `Bearer ${LocalStorage.getItem(LocalStorageEnum.ACCESS_TOKEN)}`;
        return publicAxios.request(error.config);
      }
    })().catch(() => Promise.reject(error));
  } else {
    console.error(error);
  }
  return Promise.reject(error);
});


export { privateAxios, publicAxios };
