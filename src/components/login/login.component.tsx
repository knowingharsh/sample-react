import React from "react";
import { LocalStorage, LocalStorageEnum } from "../../lib/local-storage";
import { Services } from "../../service";
import { AuthContext } from "../auth/auth.hoc";

interface IProps {

}

export const Login: React.FC<IProps> = () => {

  const [loading, setLoading] = React.useState<boolean>(false);
  const [form, setForm] = React.useState<{ userName: string, password: string }>({ userName: '', password: '' });
  const { retriggerAuth } = React.useContext(AuthContext);

  const onLogin = () => {
    setLoading(true);
    (async () => {
      const authResponse = await Services.AuthApi.login({ userName: form.userName, password: form.password });
      const { accessToken, renewToken } = authResponse;
      // if you want to have otp screen, then don't set in localStorage & retrigger, 
      // instead pass-on this token to OTP component, and then handel the localStorage & retrigger from there
      LocalStorage.setItem(LocalStorageEnum.ACCESS_TOKEN, accessToken);
      LocalStorage.setItem(LocalStorageEnum.RENEW_TOKEN, renewToken);
      retriggerAuth();
    })().catch((error) => {
      console.error(error);
      LocalStorage.removeItem(LocalStorageEnum.ACCESS_TOKEN);
      LocalStorage.removeItem(LocalStorageEnum.RENEW_TOKEN);
    }).finally(() => {
      setLoading(false);
    });
  }

  return (
    <div className='Login_container'>
      {loading ? 'loading...' : null}
      Login Form Component
    </div>
  );
}
