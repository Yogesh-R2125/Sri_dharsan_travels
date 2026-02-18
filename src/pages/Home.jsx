import { Link } from 'react-router-dom';
import { FiArrowRight, FiPhone, FiStar } from 'react-icons/fi';
import { FaCar, FaRoute, FaShieldAlt, FaUsers, FaClock, FaMapMarkedAlt } from 'react-icons/fa';
import { useAppContext } from '../context/AppContext';

export default function Home() {
  const { trips } = useAppContext();
  const offerTrips = trips.filter(t => t.isOffer && t.active);
  const featuredTrips = trips.filter(t => t.active).slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[600px] max-md:min-h-auto flex items-center bg-gradient-to-br from-dark to-primary overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1400')] bg-center bg-cover opacity-15" />
        <div className="relative z-10 max-w-7xl mx-auto px-5 text-center py-20 max-md:py-12 text-white w-full">
          <h1 className="font-display text-5xl max-md:text-3xl max-sm:text-2xl font-bold mb-4 leading-tight">
            Your Reliable Partner in <span className="text-accent">Coimbatore</span>
          </h1>
          <p className="text-lg max-md:text-base text-white/85 max-w-2xl mx-auto mb-8">
            Safe, reliable, and affordable taxi services for local and long distance trips across South India.
          </p>
          <div className="flex justify-center gap-4 flex-wrap mb-12">
            <Link to="/trips" className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary border-2 border-primary text-white rounded-lg font-semibold hover:bg-primary-dark hover:border-primary-dark hover:-translate-y-0.5 hover:shadow-lg transition-all">
              Explore Trips <FiArrowRight />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-primary hover:-translate-y-0.5 transition-all">
              <FiPhone /> Book Now
            </Link>
          </div>
          <div className="flex justify-center gap-12 max-md:gap-6 flex-wrap">
            {[['10+', 'Years Experience'], ['50+', 'Vehicles'], ['10K+', 'Happy Customers'], ['100+', 'Routes']].map(([num, label]) => (
              <div key={label} className="flex flex-col items-center">
                <strong className="text-3xl max-md:text-2xl max-sm:text-xl font-extrabold text-accent">{num}</strong>
                <span className="text-sm text-white/70">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 max-md:py-12">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl max-md:text-2xl font-bold text-gray-900 mb-3">Why Choose <span className="text-accent">Sri Dharsan</span>?</h2>
            <p className="text-gray-500 text-lg max-md:text-base">We stand out from the crowd with our commitment to quality and customer satisfaction.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              [FaShieldAlt, 'Safe & Secure', 'All vehicles are GPS tracked and regularly maintained. Your safety is our priority.'],
              [FaClock, '24/7 Available', 'Round-the-clock service. Book anytime, travel anytime, anywhere in South India.'],
              [FaUsers, 'Expert Drivers', 'Verified, experienced drivers who know every route like the back of their hand.'],
              [FaCar, 'Well-Maintained Fleet', 'Choose from sedans, SUVs, and tempo travellers. All vehicles are clean and well-maintained.'],
              [FaRoute, 'Best Prices', 'Transparent pricing with no hidden charges. Best rates guaranteed for all routes.'],
              [FaMapMarkedAlt, 'Pan South India', 'Service across Tamil Nadu, Kerala, Karnataka, and Andhra Pradesh.'],
            ].map(([Icon, title, desc]) => (
              <div key={title} className="bg-white p-8 rounded-2xl text-center shadow-sm border border-gray-200 hover:-translate-y-1 hover:shadow-lg hover:border-primary-light transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-light text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                  <Icon />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Trips */}
      <section className="py-20 max-md:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl max-md:text-2xl font-bold text-gray-900 mb-3">Popular <span className="text-accent">Trips</span></h2>
            <p className="text-gray-500 text-lg max-md:text-base">Most booked long distance routes from Coimbatore</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTrips.map(trip => (
              <div key={trip.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:-translate-y-1 hover:shadow-lg transition-all group">
                <div className="relative h-52 overflow-hidden">
                  <img src={trip.image} alt={trip.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400" />
                  {trip.isOffer && <span className="absolute top-3 left-3 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold">{trip.offerLabel}</span>}
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{trip.title}</h3>
                  <div className="flex gap-2 flex-wrap mb-3">
                    {[trip.distance, trip.duration, trip.vehicleType].map(m => (
                      <span key={m} className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">{m}</span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mb-4 leading-relaxed">{trip.description.substring(0, 100)}...</p>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      {trip.offerPrice ? (
                        <><span className="line-through text-gray-400 text-sm">&#8377;{trip.price}</span><span className="text-xl font-extrabold text-primary">&#8377;{trip.offerPrice}</span></>
                      ) : (
                        <span className="text-xl font-extrabold text-primary">&#8377;{trip.price}</span>
                      )}
                    </div>
                    <Link to={`/trips/${trip.id}`} className="inline-flex items-center gap-1 px-4 py-2 bg-primary text-white text-sm rounded-lg font-semibold hover:bg-primary-dark transition-all">View Details</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/trips" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-all">
              View All Trips <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Offers Banner */}
      {offerTrips.length > 0 && (
        <section className="py-12 bg-gradient-to-r from-accent to-amber-500">
          <div className="max-w-7xl mx-auto px-5 flex items-center justify-between gap-6 flex-wrap max-md:flex-col max-md:text-center">
            <div>
              <h2 className="text-white font-display text-3xl max-md:text-2xl font-bold">Special Offers Available!</h2>
              <p className="text-white/90">Save big on {offerTrips.length} popular routes. Limited time deals with huge discounts.</p>
            </div>
            <Link to="/offers" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-accent rounded-lg font-semibold hover:bg-gray-50 transition-all">
              View Offers <FiArrowRight />
            </Link>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="py-20 max-md:py-12">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl max-md:text-2xl font-bold text-gray-900 mb-3">What Our <span className="text-accent">Customers</span> Say</h2>
            <p className="text-gray-500 text-lg max-md:text-base">Dont just take our word for it</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              ['Priya Sharma', 'Coimbatore to Ooty', 'Excellent service! The driver was very professional and the car was spotlessly clean. Will definitely book again.'],
              ['Arun Krishnan', 'Coimbatore to Chennai', 'Best cab service in Coimbatore. Reasonable prices, on-time pickup, and very comfortable journey to Chennai.'],
              ['Meena Devi', 'Coimbatore to Kodaikanal', 'Family trip to Kodaikanal was amazing. The SUV was spacious and the driver was very helpful. Highly recommended!'],
            ].map(([name, route, text]) => (
              <div key={name} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                <div className="flex gap-1 mb-4">{[...Array(5)].map((_, i) => <FiStar key={i} className="text-gold fill-gold" />)}</div>
                <p className="text-sm text-gray-600 italic mb-4 leading-relaxed">&quot;{text}&quot;</p>
                <div><strong className="block text-gray-900">{name}</strong><span className="text-sm text-gray-400">{route}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 max-md:py-12 bg-gradient-to-br from-primary to-dark-2 text-center text-white">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="font-display text-4xl max-md:text-2xl font-bold mb-3">Ready to Travel?</h2>
          <p className="text-white/80 text-lg max-md:text-base mb-8">Book your next trip with Sri Dharsan Tour & Travels and enjoy a comfortable, safe journey.</p>
          <div className="flex justify-center gap-4 flex-wrap max-sm:flex-col max-sm:items-center">
            <a href="tel:+919876543210" className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary border-2 border-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-all">
              <FiPhone /> Call Now
            </a>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-primary transition-all">
              Send Enquiry
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
