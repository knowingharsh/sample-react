import React from "react";
import { LocalStorage, LocalStorageEnum } from "../../lib/local-storage";
import { Services } from "../../services";
import { AuthContext } from "../auth/auth.hoc";
import { LoginForm } from "./login.form";

interface IProps {

}

export const Login: React.FC<IProps> = () => {

  const [loading, setLoading] = React.useState<boolean>(false);
  const { retriggerAuth } = React.useContext(AuthContext);

  const onLogin = ({ userName, password }: { userName:string, password:string }) => {
    setLoading(true);
    (async () => {
      const authResponse = await Services.AuthApi.login({ userName, password });
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
      <LoginForm onSubmit={onLogin} />
    </div>
  );
}
