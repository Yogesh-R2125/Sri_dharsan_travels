import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FiArrowLeft, FiMapPin, FiClock, FiTruck, FiCheckCircle, FiPhone } from 'react-icons/fi';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

export default function TripDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { trips, addEnquiry } = useAppContext();
  const trip = trips.find(t => t.id === parseInt(id));

  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', travelDate: '', passengers: 1, message: '' });

  if (!trip) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-5">
        <h2 className="text-2xl font-bold mb-3">Trip Not Found</h2>
        <p className="text-gray-500 mb-5">The trip you are looking for does not exist.</p>
        <Link to="/trips" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"><FiArrowLeft /> Back to Trips</Link>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) { toast.error('Please fill in required fields'); return; }
    addEnquiry({ ...form, tripId: trip.id, tripTitle: trip.title });
    toast.success("Enquiry submitted successfully! We'll contact you soon.");
    setShowEnquiryForm(false);
    setForm({ name: '', phone: '', email: '', travelDate: '', passengers: 1, message: '' });
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-dark to-primary py-10 text-white">
        <div className="max-w-7xl mx-auto px-5">
          <Link to="/trips" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-3 text-sm"><FiArrowLeft /> Back to Trips</Link>
          <h1 className="font-display text-3xl max-md:text-xl font-bold">{trip.title}</h1>
        </div>
      </section>

      <section className="py-16 max-md:py-10">
        <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="relative rounded-2xl overflow-hidden mb-8">
              <img src={trip.image} alt={trip.title} className="w-full h-80 max-md:h-52 object-cover" />
              {trip.isOffer && <span className="absolute top-4 left-4 bg-accent text-white text-sm font-bold px-4 py-1.5 rounded-full">{trip.offerLabel}</span>}
            </div>

            <div className="bg-white rounded-2xl p-8 max-md:p-5 shadow-sm border border-gray-200 mb-8">
              <h2 className="font-display text-2xl font-bold mb-4">Trip Details</h2>
              <p className="text-gray-600 leading-7 mb-6">{trip.description}</p>
              <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4 mb-6">
                {[[FiMapPin,'From',trip.from],[FiMapPin,'To',trip.to],[FiClock,'Duration',trip.duration],[FiTruck,'Vehicle',trip.vehicleType]].map(([Icon,label,val])=>(
                  <div key={label+val} className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                    <Icon className="text-xl text-primary" />
                    <div><span className="text-xs text-gray-400 block">{label}</span><span className="font-semibold text-sm">{val}</span></div>
                  </div>
                ))}
              </div>
              <h3 className="text-lg font-bold mb-3">Trip Highlights</h3>
              <div className="space-y-2">
                {trip.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-600"><FiCheckCircle className="text-success shrink-0" /> {h}</div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 sticky top-24">
              <h3 className="font-display text-xl font-bold mb-4">Pricing</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm py-2 border-b border-gray-100"><span className="text-gray-500">Distance</span><span className="font-semibold">{trip.distance}</span></div>
                <div className="flex justify-between text-sm py-2 border-b border-gray-100"><span className="text-gray-500">Vehicle Type</span><span className="font-semibold">{trip.vehicleType}</span></div>
                <div className="flex justify-between text-sm py-2 border-b border-gray-100"><span className="text-gray-500">Base Price</span><span className={trip.offerPrice ? 'line-through text-gray-400' : 'font-semibold'}>&#8377;{trip.price}</span></div>
                {trip.offerPrice && <div className="flex justify-between text-sm py-2 border-b border-gray-100"><span className="text-gray-500">Offer Price</span><span className="font-bold text-accent text-lg">&#8377;{trip.offerPrice}</span></div>}
                {trip.offerPrice && <div className="flex justify-between text-sm py-2 bg-green-50 px-3 rounded-lg"><span className="text-success font-medium">You Save</span><span className="font-bold text-success">&#8377;{trip.price - trip.offerPrice}</span></div>}
              </div>
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <p className="text-sm font-semibold mb-2">Price Includes:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  {['Driver charges','Fuel cost','Toll charges','Parking charges'].map(i=><li key={i} className="flex items-center gap-2"><FiCheckCircle className="text-success text-xs" /> {i}</li>)}
                </ul>
              </div>
              <button onClick={() => setShowEnquiryForm(true)} className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors mb-3">Enquire Now</button>
              <a href="tel:+919876543210" className="w-full inline-flex items-center justify-center gap-2 border-2 border-primary text-primary py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all"><FiPhone /> Call to Book</a>
            </div>
          </div>
        </div>
      </section>

      {showEnquiryForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowEnquiryForm(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold">Enquiry for {trip.title}</h3>
              <button onClick={() => setShowEnquiryForm(false)} className="text-2xl text-gray-400 hover:text-gray-700">&times;</button>
            </div>
            <form className="p-6 space-y-4" onSubmit={handleSubmit}>
              <div><label className="block text-sm font-medium mb-1">Name *</label><input type="text" required value={form.name} onChange={e => setForm({...form,name:e.target.value})} placeholder="Enter your name" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors" /></div>
              <div><label className="block text-sm font-medium mb-1">Phone *</label><input type="tel" required value={form.phone} onChange={e => setForm({...form,phone:e.target.value})} placeholder="Enter your phone number" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors" /></div>
              <div><label className="block text-sm font-medium mb-1">Email</label><input type="email" value={form.email} onChange={e => setForm({...form,email:e.target.value})} placeholder="Enter your email" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium mb-1">Travel Date</label><input type="date" value={form.travelDate} onChange={e => setForm({...form,travelDate:e.target.value})} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors" /></div>
                <div><label className="block text-sm font-medium mb-1">Passengers</label><input type="number" min="1" max="20" value={form.passengers} onChange={e => setForm({...form,passengers:parseInt(e.target.value)})} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors" /></div>
              </div>
              <div><label className="block text-sm font-medium mb-1">Message</label><textarea rows="3" value={form.message} onChange={e => setForm({...form,message:e.target.value})} placeholder="Any special requirements?" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors resize-none" /></div>
              <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors">Submit Enquiry</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
