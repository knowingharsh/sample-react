import React from 'react'
import { LocalStorage, LocalStorageEnum } from '../../lib/local-storage';
import { Services } from '../../service';


export const AuthContext = React.createContext<{
  retriggerAuth: () => void,
  logout: () => void
}>({ retriggerAuth: () => { }, logout: () => { } });


interface IProps {
  onAuthSuccess: (data: any) => any;
  onAuthFailure: () => any;
  onLogout: () => any;
}
export const AuthHOC: React.FC<IProps> = ({ onAuthSuccess, onAuthFailure, onLogout, children, }) => {

  const [loading, setLoading] = React.useState<boolean>(false);
  const [mounting, setMounting] = React.useState<boolean>(false);

  const retriggerAuth = () => { /* can be called after login */
    const accessToken = LocalStorage.getItem(LocalStorageEnum.ACCESS_TOKEN);
    if (accessToken) {
      setLoading(true);
      (async () => {
        const authResponse = await Services.AuthApi.authenticateToken({ accessToken });
        onAuthSuccess(authResponse);
      })().catch((error) => {
        console.error(error);
        LocalStorage.removeItem(LocalStorageEnum.ACCESS_TOKEN);
        LocalStorage.removeItem(LocalStorageEnum.RENEW_TOKEN);
        onAuthFailure();
      }).finally(() => {
        setLoading(false);
        setMounting(true);
      });
    } else {
      onAuthFailure();
      setMounting(true);
    }
  }

  React.useEffect(() => {
    retriggerAuth();
  }, []);

  const logout = () => {
    LocalStorage.removeItem(LocalStorageEnum.ACCESS_TOKEN);
    LocalStorage.removeItem(LocalStorageEnum.RENEW_TOKEN);
    onLogout();
  }

  return (
    <>
      <AuthContext.Provider value={{ retriggerAuth, logout }}>
        {loading ? 'loading...' : null}
        {mounting ? children : null}
      </AuthContext.Provider>
    </>
  )
}
