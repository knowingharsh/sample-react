import React from "react";
import { Outlet } from "react-router-dom";

interface IProps {

}

const PrivateApp: React.FC<IProps> = () => {

  return (
    <div className="PrivateApp">
      <Outlet />
    </div>
  );
}

export default PrivateApp;