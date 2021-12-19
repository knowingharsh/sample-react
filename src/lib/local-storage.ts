export const LocalStorage = {
  getItem : (key:string) => localStorage.getItem(key),
  setItem : (key:string, item : string) => localStorage.setItem(key,item),
  removeItem : (key:string) => localStorage.removeItem(key),
}

export enum LocalStorageEnum {
  'ACCESS_TOKEN' = 'access_token',
  'RENEW_TOKEN' = 'renew_token',
}