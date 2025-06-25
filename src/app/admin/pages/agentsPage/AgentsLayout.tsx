import { Outlet } from 'react-router-dom';

export const AgentsLayout = () => {
  return (
    <div>
      <h2>Агенты</h2>
      <Outlet />
    </div>
  );
};
