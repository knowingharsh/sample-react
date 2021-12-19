import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutesConfig } from '../../configurations';
import { AuthHOC } from './auth.hoc';

/* this AuthProvider component is the layer between auth and application */
/* this is basically how you want to handel the auth data, reset it */
const AuthProvider: React.FC<any> = ({ children }) => {

  const navigate = useNavigate();

  const onAuthSuccess = (authData: any) => {
    // store data to reducer
  }
  const onAuthFailure = () =>{
    console.log('auth failure');
    navigate(RoutesConfig.Login)
  }
  const onLogout = () => {

  }

  return (
    <AuthHOC
      onAuthFailure={onAuthFailure}
      onAuthSuccess={onAuthSuccess}
      onLogout={onLogout}>
      {children}
    </AuthHOC>
  );
}

export default AuthProvider;
