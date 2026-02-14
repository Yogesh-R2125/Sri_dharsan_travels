import { Link } from 'react-router-dom';
import { FiTag, FiArrowRight } from 'react-icons/fi';
import { useAppContext } from '../context/AppContext';

export default function Offers() {
  const { trips } = useAppContext();
  const offerTrips = trips.filter(t => t.isOffer && t.active);

  return (
    <div>
      <section className="bg-gradient-to-br from-dark to-primary py-16 text-center text-white">
        <div className="max-w-7xl mx-auto px-5">
          <h1 className="font-display text-4xl max-md:text-2xl font-bold mb-2">Special <span className="text-accent">Offers</span></h1>
          <p className="text-white/80 text-lg">Grab these amazing deals before they expire!</p>
        </div>
      </section>

      <section className="py-20 max-md:py-12">
        <div className="max-w-7xl mx-auto px-5">
          {offerTrips.length === 0 ? (
            <div className="text-center py-16">
              <FiTag className="text-5xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-700 mb-2">No Offers Available</h3>
              <p className="text-gray-500 mb-6">Check back later for exciting deals and discounts.</p>
              <Link to="/trips" className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors">View All Trips</Link>
            </div>
          ) : (
            <>
              <div className="bg-gradient-to-r from-accent to-accent-light text-white rounded-2xl p-6 mb-8 flex items-center gap-4 flex-wrap">
                <h2 className="text-xl font-bold flex items-center gap-2"><FiTag /> {offerTrips.length} Special Offer{offerTrips.length > 1 ? 's' : ''} Available!</h2>
                <p className="text-white/90">Limited time deals with great discounts on popular routes</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {offerTrips.map(trip => (
                  <div key={trip.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border-2 border-accent/20 hover:shadow-lg transition-all">
                    <div className="relative">
                      <img src={trip.image} alt={trip.title} className="w-full h-56 object-cover" />
                      <span className="absolute top-4 left-4 bg-accent text-white text-sm font-bold px-4 py-1.5 rounded-full">{trip.offerLabel}</span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{trip.title}</h3>
                      <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-3">
                        <span className="bg-gray-100 px-2 py-1 rounded">{trip.distance}</span>
                        <span className="bg-gray-100 px-2 py-1 rounded">{trip.duration}</span>
                        <span className="bg-gray-100 px-2 py-1 rounded">{trip.vehicleType}</span>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">{trip.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {trip.highlights.map((h, i) => (
                          <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">{h}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-6 mb-5 p-4 bg-gray-50 rounded-xl">
                        <div><span className="text-xs text-gray-400 block">Regular</span><span className="text-gray-400 line-through">&#8377;{trip.price}</span></div>
                        <div><span className="text-xs text-gray-400 block">Offer</span><span className="text-2xl font-bold text-accent">&#8377;{trip.offerPrice}</span></div>
                        <div><span className="text-xs text-gray-400 block">You Save</span><span className="font-bold text-success">&#8377;{trip.price - trip.offerPrice}</span></div>
                      </div>
                      <Link to={`/trips/${trip.id}`} className="w-full inline-flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors">Book This Offer <FiArrowRight /></Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
