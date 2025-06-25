import { Outlet } from 'react-router-dom';
import { AdminNav } from './components/AdminNav/AdminNav';

export const AdminLayout = () => {
  return (
    <>
      <Outlet />
      <AdminNav />
    </>
  );
};
