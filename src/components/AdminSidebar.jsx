import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiHome, FiMapPin, FiTag, FiInbox, FiLogOut } from 'react-icons/fi';
import { FaCar } from 'react-icons/fa';
import { useAppContext } from '../context/AppContext';

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { adminLogout, unreadCount } = useAppContext();

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: <FiHome /> },
    { path: '/admin/trips', label: 'Manage Trips', icon: <FiMapPin /> },
    { path: '/admin/offers', label: 'Manage Offers', icon: <FiTag /> },
    { path: '/admin/enquiries', label: 'Enquiries', icon: <FiInbox />, badge: unreadCount },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => { adminLogout(); navigate('/admin'); };

  return (
    <>
      <button className="hidden max-md:flex fixed top-4 left-4 z-[1001] bg-primary text-white border-none rounded-lg w-11 h-11 text-xl cursor-pointer shadow-md items-center justify-center" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FiX /> : <FiMenu />}
      </button>

      <aside className={`w-[260px] bg-dark text-white flex flex-col fixed top-0 bottom-0 left-0 z-[1000] transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="flex items-center gap-2.5 px-6 py-5 border-b border-white/10 text-lg font-bold max-md:hidden">
          <FaCar className="text-accent text-xl" />
          <span>Admin Panel</span>
        </div>
        <div className="flex items-center gap-2.5 px-6 py-5 border-b border-white/10 text-lg font-bold md:hidden">
          <FaCar className="text-accent text-xl" />
          <span>Admin Panel</span>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-[0.92rem] font-medium transition-all ${isActive(item.path) ? 'bg-primary text-white' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}
              onClick={() => setIsOpen(false)}>
              {item.icon}
              <span>{item.label}</span>
              {item.badge > 0 && <span className="ml-auto bg-danger text-white text-[0.72rem] px-2 py-0.5 rounded-full font-bold">{item.badge}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-white/10 space-y-1">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/10 hover:text-white rounded-lg text-[0.92rem] font-medium transition-all" onClick={() => setIsOpen(false)}>
            <FiHome /><span>View Website</span>
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-danger hover:bg-danger/15 rounded-lg text-[0.92rem] font-medium transition-all w-full border-none bg-transparent cursor-pointer font-[inherit]">
            <FiLogOut /><span>Logout</span>
          </button>
        </div>
      </aside>

      {isOpen && <div className="fixed inset-0 bg-black/50 z-[999] md:hidden" onClick={() => setIsOpen(false)} />}
    </>
  );
}
