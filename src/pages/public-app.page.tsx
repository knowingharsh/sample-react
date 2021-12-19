import React from "react";
import { Outlet } from "react-router-dom";

interface IProps {

}

const PublicApp: React.FC<IProps> = () => {

  return (
    <div className="PublicApp">
      <Outlet />
    </div>
  );
}

export default PublicApp;