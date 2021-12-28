import React from "react";
import { useAppSelector } from "../../redux/hooks";

interface IProps {

}

export const Dashboard: React.FC<IProps> = () => {
  const { users } = useAppSelector(state => state);
  return (
    <div className='Dashboard_container'>Dashboard {JSON.stringify(users)}</div>
  );
}
