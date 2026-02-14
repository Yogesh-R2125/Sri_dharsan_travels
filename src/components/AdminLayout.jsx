import { Outlet, Navigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { useAppContext } from '../context/AppContext';

export default function AdminLayout() {
  const { isAdminLoggedIn } = useAppContext();

  if (!isAdminLoggedIn) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="ml-[260px] max-md:ml-0 flex-1 p-8 max-md:pt-[72px] max-md:px-4 bg-gray-100 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
