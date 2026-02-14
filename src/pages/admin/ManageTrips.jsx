import { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const emptyTrip = { title: '', from: 'Coimbatore', to: '', distance: '', duration: '', vehicleType: 'Sedan', price: '', offerPrice: '', image: '', description: '', highlights: '', isOffer: false, offerLabel: '' };

export default function ManageTrips() {
  const { trips, addTrip, updateTrip, deleteTrip } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyTrip);

  const handleOpenAdd = () => { setForm(emptyTrip); setEditingId(null); setShowForm(true); };
  const handleOpenEdit = (trip) => { setForm({ ...trip, highlights: trip.highlights.join(', '), offerPrice: trip.offerPrice || '' }); setEditingId(trip.id); setShowForm(true); };
  const handleDelete = (id) => { if (confirm('Are you sure you want to delete this trip?')) { deleteTrip(id); toast.success('Trip deleted successfully'); } };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.to || !form.price) { toast.error('Please fill in required fields'); return; }
    const tripData = { ...form, price: parseFloat(form.price), offerPrice: form.offerPrice ? parseFloat(form.offerPrice) : null, highlights: form.highlights.split(',').map(h => h.trim()).filter(Boolean), isOffer: !!form.offerPrice, offerLabel: form.offerPrice ? `${Math.round((1 - parseFloat(form.offerPrice) / parseFloat(form.price)) * 100)}% OFF` : '', image: form.image || 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600' };
    if (editingId) { updateTrip(editingId, tripData); toast.success('Trip updated successfully'); }
    else { addTrip(tripData); toast.success('Trip added successfully'); }
    setShowForm(false); setEditingId(null); setForm(emptyTrip);
  };

  const inputCls = "w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors";

  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div><h1 className="text-2xl font-bold">Manage Trips</h1><p className="text-gray-500 text-sm mt-1">Add, edit, or remove travel trips</p></div>
        <button onClick={handleOpenAdd} className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-primary-dark transition-colors text-sm"><FiPlus /> Add New Trip</button>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-gray-100 text-left">
            <th className="px-5 py-3 font-semibold text-gray-500">Trip</th>
            <th className="px-5 py-3 font-semibold text-gray-500">From - To</th>
            <th className="px-5 py-3 font-semibold text-gray-500">Distance</th>
            <th className="px-5 py-3 font-semibold text-gray-500">Vehicle</th>
            <th className="px-5 py-3 font-semibold text-gray-500">Price</th>
            <th className="px-5 py-3 font-semibold text-gray-500">Offer</th>
            <th className="px-5 py-3 font-semibold text-gray-500">Actions</th>
          </tr></thead>
          <tbody>
            {trips.map(trip => (
              <tr key={trip.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-5 py-3"><div className="flex items-center gap-3"><img src={trip.image} alt={trip.title} className="w-10 h-10 rounded-lg object-cover" /><strong>{trip.title}</strong></div></td>
                <td className="px-5 py-3">{trip.from} &rarr; {trip.to}</td>
                <td className="px-5 py-3">{trip.distance}</td>
                <td className="px-5 py-3">{trip.vehicleType}</td>
                <td className="px-5 py-3">&#8377;{trip.price}</td>
                <td className="px-5 py-3">{trip.isOffer ? <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-semibold">&#8377;{trip.offerPrice}</span> : <span className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">No Offer</span>}</td>
                <td className="px-5 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => handleOpenEdit(trip)} className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors" title="Edit"><FiEdit2 /></button>
                    <button onClick={() => handleDelete(trip.id)} className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors" title="Delete"><FiTrash2 /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {trips.map(trip => (
          <div key={trip.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center gap-3 mb-3">
              <img src={trip.image} alt={trip.title} className="w-12 h-12 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm truncate">{trip.title}</h3>
                <p className="text-xs text-gray-500">{trip.from} &rarr; {trip.to}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs mb-3">
              <div><span className="text-gray-400">Distance:</span> <span className="font-medium">{trip.distance}</span></div>
              <div><span className="text-gray-400">Vehicle:</span> <span className="font-medium">{trip.vehicleType}</span></div>
              <div><span className="text-gray-400">Price:</span> <span className="font-medium">&#8377;{trip.price}</span></div>
              <div><span className="text-gray-400">Offer:</span> {trip.isOffer ? <span className="text-green-700 font-semibold">&#8377;{trip.offerPrice}</span> : <span className="text-gray-400">None</span>}</div>
            </div>
            <div className="flex gap-2 border-t border-gray-100 pt-3">
              <button onClick={() => handleOpenEdit(trip)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-blue-600 bg-blue-50 text-xs font-semibold"><FiEdit2 /> Edit</button>
              <button onClick={() => handleDelete(trip.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-red-600 bg-red-50 text-xs font-semibold"><FiTrash2 /> Delete</button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold">{editingId ? 'Edit Trip' : 'Add New Trip'}</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-700"><FiX /></button>
            </div>
            <form className="p-6 space-y-4" onSubmit={handleSubmit}>
              <div><label className="block text-sm font-medium mb-1">Trip Title *</label><input type="text" required value={form.title} onChange={e => setForm({...form,title:e.target.value})} placeholder="e.g., Coimbatore to Ooty" className={inputCls} /></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium mb-1">From *</label><input type="text" required value={form.from} onChange={e => setForm({...form,from:e.target.value})} placeholder="Coimbatore" className={inputCls} /></div>
                <div><label className="block text-sm font-medium mb-1">To *</label><input type="text" required value={form.to} onChange={e => setForm({...form,to:e.target.value})} placeholder="e.g., Chennai" className={inputCls} /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium mb-1">Distance</label><input type="text" value={form.distance} onChange={e => setForm({...form,distance:e.target.value})} placeholder="e.g., 505 km" className={inputCls} /></div>
                <div><label className="block text-sm font-medium mb-1">Duration</label><input type="text" value={form.duration} onChange={e => setForm({...form,duration:e.target.value})} placeholder="e.g., 8 hours" className={inputCls} /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium mb-1">Vehicle Type</label><select value={form.vehicleType} onChange={e => setForm({...form,vehicleType:e.target.value})} className={inputCls}><option value="Sedan">Sedan</option><option value="SUV">SUV</option><option value="Tempo Traveller">Tempo Traveller</option></select></div>
                <div><label className="block text-sm font-medium mb-1">Price *</label><input type="number" required value={form.price} onChange={e => setForm({...form,price:e.target.value})} placeholder="e.g., 4500" className={inputCls} /></div>
              </div>
              <div><label className="block text-sm font-medium mb-1">Offer Price - Leave empty if no offer</label><input type="number" value={form.offerPrice} onChange={e => setForm({...form,offerPrice:e.target.value})} placeholder="e.g., 3999" className={inputCls} /></div>
              <div><label className="block text-sm font-medium mb-1">Image URL</label><input type="url" value={form.image} onChange={e => setForm({...form,image:e.target.value})} placeholder="https://..." className={inputCls} /></div>
              <div><label className="block text-sm font-medium mb-1">Description</label><textarea rows="3" value={form.description} onChange={e => setForm({...form,description:e.target.value})} placeholder="Describe the trip..." className={inputCls + " resize-none"} /></div>
              <div><label className="block text-sm font-medium mb-1">Highlights (comma separated)</label><input type="text" value={form.highlights} onChange={e => setForm({...form,highlights:e.target.value})} placeholder="e.g., AC Vehicle, Toll Included, Scenic Route" className={inputCls} /></div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors">{editingId ? 'Update Trip' : 'Add Trip'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
