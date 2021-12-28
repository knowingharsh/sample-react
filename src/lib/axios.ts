import axios from 'axios';
import { EnvConfig, EndPointsConfig } from '../configurations';
import { Services } from '../services';
import { LocalStorage, LocalStorageEnum } from './local-storage';

const publicAxios = axios.create({
  baseURL: EnvConfig.API_URL + EndPointsConfig.open,
  method: 'POST'
});

const privateAxios = axios.create({
  baseURL: EnvConfig.API_URL + EndPointsConfig.private,
  method: 'POST'
});


privateAxios.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: `${LocalStorage.getItem(LocalStorageEnum.ACCESS_TOKEN)}`,
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
        error.config.headers.Authorization = `${LocalStorage.getItem(LocalStorageEnum.ACCESS_TOKEN)}`;
        return publicAxios.request(error.config);
      }
    })().catch(() => Promise.reject(error));
  } else {
    console.error(error);
  }
  return Promise.reject(error);
});


export { privateAxios, publicAxios };
