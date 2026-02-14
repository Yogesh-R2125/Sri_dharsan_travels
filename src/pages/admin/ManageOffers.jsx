import { FiTag, FiEdit2, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { useState } from 'react';

export default function ManageOffers() {
  const { trips, updateTrip } = useAppContext();
  const [editingId, setEditingId] = useState(null);
  const [offerPrice, setOfferPrice] = useState('');

  const handleToggleOffer = (trip) => {
    if (trip.isOffer) { updateTrip(trip.id, { isOffer: false, offerPrice: null, offerLabel: '' }); toast.success(`Offer removed from "${trip.title}"`); }
    else { setEditingId(trip.id); setOfferPrice(''); }
  };

  const handleSaveOffer = (trip) => {
    if (!offerPrice || parseFloat(offerPrice) >= trip.price) { toast.error('Offer price must be less than the regular price'); return; }
    const discount = Math.round((1 - parseFloat(offerPrice) / trip.price) * 100);
    updateTrip(trip.id, { isOffer: true, offerPrice: parseFloat(offerPrice), offerLabel: `${discount}% OFF` });
    toast.success(`Offer set for "${trip.title}"`);
    setEditingId(null); setOfferPrice('');
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Manage Offers</h1>
        <p className="text-gray-500 text-sm mt-1">Set special offer prices on existing trips</p>
      </div>

      <div className="flex items-center gap-3 bg-blue-50 text-blue-700 p-4 rounded-xl mb-6 text-sm">
        <FiTag className="text-lg shrink-0" />
        <p>Click on a trip to toggle its offer status. Set a discounted price to attract more customers!</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-gray-100 text-left">
            <th className="px-5 py-3 font-semibold text-gray-500">Trip</th>
            <th className="px-5 py-3 font-semibold text-gray-500">Regular Price</th>
            <th className="px-5 py-3 font-semibold text-gray-500">Offer Price</th>
            <th className="px-5 py-3 font-semibold text-gray-500">Discount</th>
            <th className="px-5 py-3 font-semibold text-gray-500">Status</th>
            <th className="px-5 py-3 font-semibold text-gray-500">Actions</th>
          </tr></thead>
          <tbody>
            {trips.map(trip => (
              <tr key={trip.id} className={`border-b border-gray-50 hover:bg-gray-50 ${trip.isOffer ? 'bg-green-50/50' : ''}`}>
                <td className="px-5 py-3 font-semibold">{trip.title}</td>
                <td className="px-5 py-3">&#8377;{trip.price}</td>
                <td className="px-5 py-3">
                  {editingId === trip.id ? (
                    <div className="flex items-center gap-2">
                      <input type="number" value={offerPrice} onChange={e => setOfferPrice(e.target.value)} placeholder="Enter offer price" autoFocus className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-primary w-32" />
                      <button onClick={() => handleSaveOffer(trip)} className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg"><FiCheckCircle /></button>
                      <button onClick={() => setEditingId(null)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"><FiXCircle /></button>
                    </div>
                  ) : trip.offerPrice ? `?${trip.offerPrice}` : '—'}
                </td>
                <td className="px-5 py-3">{trip.isOffer ? trip.offerLabel : '—'}</td>
                <td className="px-5 py-3"><span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${trip.isOffer ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{trip.isOffer ? 'Active' : 'No Offer'}</span></td>
                <td className="px-5 py-3">
                  <div className="flex gap-2 flex-wrap">
                    {trip.isOffer ? (
                      <>
                        <button onClick={() => { setEditingId(trip.id); setOfferPrice(trip.offerPrice || ''); }} className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center gap-1"><FiEdit2 /> Edit</button>
                        <button onClick={() => handleToggleOffer(trip)} className="text-xs px-3 py-1.5 bg-danger text-white rounded-lg font-semibold hover:bg-red-700 transition-colors">Remove</button>
                      </>
                    ) : (
                      <button onClick={() => handleToggleOffer(trip)} className="text-xs px-3 py-1.5 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors inline-flex items-center gap-1"><FiTag /> Set Offer</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
