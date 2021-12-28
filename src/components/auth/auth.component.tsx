import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutesConfig } from '../../configurations';
import { useAppDispatch } from '../../redux/hooks';
import { resetUser, setUser } from '../../redux/user.slice';
import { AuthHOC } from './auth.hoc';

/* this AuthProvider component is the layer between auth and application */
/* this is basically how you want to handel the auth data, reset it */
const AuthProvider: React.FC<any> = ({ children }) => {

  /* wait for application to mount properly to avoid sideEffects */
  const [mounted, setMounted] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const onAuthSuccess = (authData: any) => {
    // store data to reducer
    dispatch(setUser(authData));
    // navigate to dashboard
    navigate(RoutesConfig.Dashboard, { replace: true });
  }

  const onAuthFailure = () => {
    console.log('auth failure');
    navigate(RoutesConfig.Login, { replace: true });
  }
  const onLogout = () => {
    dispatch(resetUser()); // this will change to reset whole reducer
    navigate(RoutesConfig.Login, { replace: true });
  }

  return (
    mounted ? <AuthHOC
      onAuthFailure={onAuthFailure}
      onAuthSuccess={onAuthSuccess}
      onLogout={onLogout}>
      {children}
    </AuthHOC > : null
  );
}

export default AuthProvider;
