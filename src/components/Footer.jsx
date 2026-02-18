import { Link } from 'react-router-dom';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube, FaCar } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-dark text-gray-400 pt-16">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <FaCar className="text-2xl text-accent" />
              <h3 className="text-white font-display text-lg">Sri Dharsan Tour & Travels</h3>
            </div>
            <p className="text-sm leading-7 mb-4">Your reliable travel partner in Coimbatore since 2010. We provide reliable, comfortable, and affordable taxi services for all your travel needs.</p>
            <div className="flex gap-3">
              {[FaFacebook, FaInstagram, FaWhatsapp, FaYoutube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-lg hover:bg-accent hover:text-white hover:-translate-y-0.5 transition-all">
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white text-base font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[['/', 'Home'], ['/about', 'About Us'], ['/services', 'Services'], ['/trips', 'Trips & Pricing'], ['/offers', 'Special Offers'], ['/contact', 'Contact Us']].map(([to, label]) => (
                <li key={to}><Link to={to} className="text-sm hover:text-accent hover:pl-1 transition-all">{label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-base font-bold mb-4">Popular Routes</h4>
            <ul className="space-y-2">
              {['Chennai', 'Bangalore', 'Ooty', 'Madurai', 'Kodaikanal', 'Munnar'].map(city => (
                <li key={city}><Link to="/trips" className="text-sm hover:text-accent hover:pl-1 transition-all">Coimbatore to {city}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-base font-bold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <p className="flex items-start gap-2.5 text-sm"><FiMapPin className="shrink-0 mt-0.5 text-accent" /> Kottaipalayam, Kovilpalayam, Coimbatore - 641110 </p>
              <p className="flex items-start gap-2.5 text-sm"><FiPhone className="shrink-0 mt-0.5 text-accent" /> +91 89734 880889</p>
              <p className="flex items-start gap-2.5 text-sm"><FiPhone className="shrink-0 mt-0.5 text-accent" /> +91 99528 80074</p>
              <p className="flex items-start gap-2.5 text-sm"><FiMail className="shrink-0 mt-0.5 text-accent" /> dharsansiva335@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 text-center py-5">
          <p className="text-sm text-gray-500">&copy; 2026 Sri Dharsan Tour & Travels. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
