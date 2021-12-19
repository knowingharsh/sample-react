import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ChangePassword, Login } from '../components';
import { RoutesConfig } from '../configurations';
import PrivateApp from './private-app.page';
import PublicApp from './public-app.page';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={RoutesConfig.Application}>
            <Navigate to={RoutesConfig.Login} />
          </Route>
          <Route path={RoutesConfig.Application} element={<PublicApp />} >
            <Route path={RoutesConfig.Login} element={<Login />} />
            <Route path={RoutesConfig.Login} element={<ChangePassword />} />
          </Route>
          <Route path={RoutesConfig.Application} element={<PrivateApp />} >
          </Route>
          {/* we can scope different types of layout outlets + their behavior, 
          all the routes across application must be specified here only  */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
