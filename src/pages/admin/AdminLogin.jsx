import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCar } from 'react-icons/fa';
import { FiLock } from 'react-icons/fi';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const { adminLogin, isAdminLoggedIn } = useAppContext();
  const navigate = useNavigate();

  if (isAdminLoggedIn) { navigate('/admin/dashboard'); return null; }

  const handleLogin = (e) => {
    e.preventDefault();
    if (adminLogin(password)) { toast.success('Welcome to Admin Panel!'); navigate('/admin/dashboard'); }
    else { toast.error('Invalid password. Try "admin123"'); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark to-primary flex items-center justify-center p-5">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-md:p-6 w-full max-w-md">
        <div className="text-center mb-8">
          <FaCar className="text-5xl text-primary mx-auto mb-3" />
          <h2 className="font-display text-2xl font-bold">Sri Dharsan Admin</h2>
          <p className="text-gray-500 text-sm mt-1">Enter password to access admin panel</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2"><FiLock /> Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter admin password" autoFocus className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-primary transition-colors" />
          </div>
          <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors">Login to Admin Panel</button>
        </form>
      </div>
    </div>
  );
}
