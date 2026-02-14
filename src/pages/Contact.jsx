import { useState } from 'react';
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

export default function Contact() {
  const { addEnquiry } = useAppContext();
  const [form, setForm] = useState({ name: '', phone: '', email: '', travelDate: '', passengers: 1, message: '', tripTitle: 'General Enquiry', tripId: null });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) { toast.error('Please fill in required fields'); return; }
    addEnquiry(form);
    toast.success("Your enquiry has been submitted. We'll get back to you shortly!");
    setForm({ name: '', phone: '', email: '', travelDate: '', passengers: 1, message: '', tripTitle: 'General Enquiry', tripId: null });
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-dark to-primary py-16 text-center text-white">
        <div className="max-w-7xl mx-auto px-5">
          <h1 className="font-display text-4xl max-md:text-2xl font-bold mb-2">Contact <span className="text-accent">Us</span></h1>
          <p className="text-white/80 text-lg">Get in touch with us for bookings and enquiries</p>
        </div>
      </section>

      <section className="py-20 max-md:py-12">
        <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="font-display text-3xl max-md:text-2xl font-bold mb-3">Get In Touch</h2>
            <p className="text-gray-500 mb-8">We would love to hear from you. Reach out through any of these channels.</p>
            <div className="space-y-4">
              {[
                [FiPhone, 'Phone', ['+91 98765 43210', '+91 87654 32109']],
                [FaWhatsapp, 'WhatsApp', ['+91 98765 43210'], 'https://wa.me/919876543210'],
                [FiMail, 'Email', ['info@sridharsan.com', 'bookings@sridharsan.com']],
                [FiMapPin, 'Address', ['No. 45, Avinashi Road,', 'Coimbatore - 641018,', 'Tamil Nadu, India']],
                [FiClock, 'Working Hours', ['24/7 Available', 'Office: 8 AM - 10 PM']],
              ].map(([Icon, title, lines, link]) => (
                <div key={title} className="flex gap-4 bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                  <Icon className={`text-2xl shrink-0 mt-1 ${title === 'WhatsApp' ? 'text-green-500' : 'text-primary'}`} />
                  <div>
                    <h4 className="font-semibold mb-1">{title}</h4>
                    {lines.map((l, i) => <p key={i} className="text-sm text-gray-500">{l}</p>)}
                    {link && <a href={link} target="_blank" rel="noreferrer" className="text-sm text-primary hover:text-accent">Chat with us</a>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 max-md:p-5 shadow-sm border border-gray-200">
            <h2 className="font-display text-2xl font-bold mb-2">Send an Enquiry</h2>
            <p className="text-gray-500 text-sm mb-6">Fill out the form and we will get back to you within 30 minutes.</p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div><label className="block text-sm font-medium mb-1">Full Name *</label><input type="text" required value={form.name} onChange={e => setForm({...form,name:e.target.value})} placeholder="Enter your full name" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors" /></div>
              <div><label className="block text-sm font-medium mb-1">Phone Number *</label><input type="tel" required value={form.phone} onChange={e => setForm({...form,phone:e.target.value})} placeholder="Enter your phone number" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors" /></div>
              <div><label className="block text-sm font-medium mb-1">Email Address</label><input type="email" value={form.email} onChange={e => setForm({...form,email:e.target.value})} placeholder="Enter your email address" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium mb-1">Travel Date</label><input type="date" value={form.travelDate} onChange={e => setForm({...form,travelDate:e.target.value})} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors" /></div>
                <div><label className="block text-sm font-medium mb-1">Passengers</label><input type="number" min="1" max="20" value={form.passengers} onChange={e => setForm({...form,passengers:parseInt(e.target.value)})} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors" /></div>
              </div>
              <div><label className="block text-sm font-medium mb-1">Your Message</label><textarea rows="4" value={form.message} onChange={e => setForm({...form,message:e.target.value})} placeholder="Tell us about your travel requirements..." className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors resize-none" /></div>
              <button type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"><FiSend /> Submit Enquiry</button>
            </form>
          </div>
        </div>
      </section>

      <section className="py-16 max-md:py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl max-md:text-2xl font-bold mb-2">Find <span className="text-accent">Us</span></h2>
            <p className="text-gray-500">Visit our office in Coimbatore</p>
          </div>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125323.41088285878!2d76.88609867812502!3d11.01683805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859af2f461b59%3A0x895e4400c6e04ecc!2sCoimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1697100000000!5m2!1sen!2sin" width="100%" height="400" style={{border:0,borderRadius:'12px'}} allowFullScreen="" loading="lazy" title="Sri Dharsan Location" />
        </div>
      </section>
    </div>
  );
}
