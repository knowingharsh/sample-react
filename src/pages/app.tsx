import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChangePassword, Login } from '../components';
import Dashboard from '../components/dashboard';
import AuthProvider from '../components/auth/auth.component';
import { RoutesConfig } from '../configurations';
import PrivateApp from './private-app.page';
import PublicApp from './public-app.page';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path={RoutesConfig.Application} element={<PublicApp />} >
              <Route path={RoutesConfig.Login} element={<Login />} />
              <Route path={RoutesConfig.ChangePassword} element={<ChangePassword />} />
            </Route>
            <Route path={RoutesConfig.Application} element={<PrivateApp />} >
              <Route path={RoutesConfig.Dashboard} element={<Dashboard />} />
            </Route>
            {/* we can scope different types of layout outlets + their behavior, 
          all the routes across application must be specified here only  */}
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
