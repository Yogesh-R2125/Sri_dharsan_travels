import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { useAppContext } from '../context/AppContext';

export default function Trips() {
  const { trips } = useAppContext();
  const [search, setSearch] = useState('');
  const [vehicleFilter, setVehicleFilter] = useState('all');
  const [sortBy, setSortBy] = useState('price-low');

  const activeTrips = trips.filter(t => t.active);
  const filteredTrips = activeTrips
    .filter(t => {
      const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.from.toLowerCase().includes(search.toLowerCase()) || t.to.toLowerCase().includes(search.toLowerCase());
      const matchVehicle = vehicleFilter === 'all' || t.vehicleType === vehicleFilter;
      return matchSearch && matchVehicle;
    })
    .sort((a, b) => {
      const pA = a.offerPrice || a.price;
      const pB = b.offerPrice || b.price;
      return sortBy === 'price-low' ? pA - pB : sortBy === 'price-high' ? pB - pA : 0;
    });

  return (
    <div>
      <section className="bg-gradient-to-br from-dark to-primary py-16 text-center text-white">
        <div className="max-w-7xl mx-auto px-5">
          <h1 className="font-display text-4xl max-md:text-2xl font-bold mb-2">Trips & <span className="text-accent">Pricing</span></h1>
          <p className="text-white/80 text-lg">Explore all available long distance trips from Coimbatore</p>
        </div>
      </section>

      <section className="py-20 max-md:py-12">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex flex-wrap gap-4 mb-8 items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 flex-1 min-w-[220px] border border-gray-200 rounded-lg px-3 py-2">
              <FiSearch className="text-gray-400" />
              <input type="text" placeholder="Search trips (e.g., Chennai, Ooty...)" value={search} onChange={e => setSearch(e.target.value)} className="bg-transparent outline-none w-full text-sm" />
            </div>
            <select value={vehicleFilter} onChange={e => setVehicleFilter(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white outline-none">
              <option value="all">All Vehicles</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
            </select>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white outline-none">
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          <p className="text-sm text-gray-500 mb-6">{filteredTrips.length} trip(s) found</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrips.map(trip => (
              <div key={trip.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:-translate-y-1 hover:shadow-lg transition-all">
                <div className="relative">
                  <img src={trip.image} alt={trip.title} className="w-full h-48 object-cover" />
                  {trip.isOffer && <span className="absolute top-3 left-3 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">{trip.offerLabel}</span>}
                  <span className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">{trip.vehicleType}</span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-2">{trip.title}</h3>
                  <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-3">
                    <span className="bg-gray-100 px-2 py-1 rounded">{trip.distance}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">{trip.duration}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">{trip.vehicleType}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">{trip.description.substring(0, 120)}...</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {trip.highlights.slice(0, 3).map((h, i) => (
                      <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">{h}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div>
                      {trip.offerPrice ? (
                        <>
                          <span className="text-sm text-gray-400 line-through mr-2">&#8377;{trip.price}</span>
                          <span className="text-xl font-bold text-accent">&#8377;{trip.offerPrice}</span>
                        </>
                      ) : (
                        <span className="text-xl font-bold text-primary">&#8377;{trip.price}</span>
                      )}
                    </div>
                    <Link to={`/trips/${trip.id}`} className="bg-primary text-white text-sm px-4 py-2 rounded-lg font-semibold hover:bg-primary-dark transition-colors">View Details</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTrips.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-bold text-gray-700 mb-2">No trips found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
