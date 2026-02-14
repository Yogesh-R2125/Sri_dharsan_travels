import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiPhone, FiMapPin, FiMail } from 'react-icons/fi';
import { FaCar } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/trips', label: 'Trips & Pricing' },
    { path: '/offers', label: 'Offers' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Top Bar */}
      <div className="bg-dark text-gray-300 text-[0.82rem] py-2">
        <div className="max-w-7xl mx-auto px-5 flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5"><FiPhone /> +91 98765 43210</span>
            <span className="flex items-center gap-1.5"><FiMail /> info@sridharsan.com</span>
          </div>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5"><FiMapPin /> Coimbatore, Tamil Nadu</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-5 flex justify-between items-center h-[72px]">
          <Link to="/" className="flex items-center gap-2.5 no-underline">
            <FaCar className="text-3xl text-primary" />
            <div className="flex flex-col leading-tight">
              <span className="font-display text-xl font-bold text-primary">Sri Dharsan</span>
              <span className="text-[0.72rem] text-gray-500 font-medium uppercase tracking-wider">Tour & Travels</span>
            </div>
          </Link>

          <div className={`flex items-center gap-1 max-md:fixed max-md:top-16 max-md:left-0 max-md:right-0 max-md:bg-white max-md:flex-col max-md:p-4 max-md:shadow-lg max-md:z-[999] max-md:transition-transform max-md:duration-300 ${isOpen ? 'max-md:translate-y-0' : 'max-md:-translate-y-[200%]'}`}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 text-[0.9rem] font-medium rounded-md transition-all max-md:w-full max-md:py-3 ${isActive(link.path) ? 'text-primary bg-primary/5' : 'text-gray-600 hover:text-primary hover:bg-primary/5'}`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {/* <Link
              to="/admin"
              className="px-4 py-2 text-[0.9rem] font-medium rounded-md bg-primary text-white ml-2 hover:bg-primary-dark transition-all max-md:ml-0 max-md:text-center max-md:justify-center max-md:flex"
              onClick={() => setIsOpen(false)}
            >
              Admin
            </Link> */}
          </div>

          <button className="hidden max-md:block bg-transparent border-none text-2xl cursor-pointer text-gray-700 p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>
    </>
  );
}
