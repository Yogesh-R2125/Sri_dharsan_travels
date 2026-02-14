import { Link } from 'react-router-dom';
import { FiArrowRight, FiPhone } from 'react-icons/fi';
import { FaCar, FaRoute, FaBus, FaPlane, FaCalendarAlt, FaCity } from 'react-icons/fa';

export default function Services() {
  const services = [
    { icon: <FaRoute />, title: 'Long Distance Trips', desc: 'Comfortable and affordable long distance taxi services from Coimbatore to all major cities in South India. Sedan, SUV, and Tempo Traveller options available.', features: ['One-way & Round Trip', 'Multiple Vehicle Options', 'Experienced Drivers', 'Toll & Parking Included'] },
    { icon: <FaCar />, title: 'Local City Rides', desc: 'Reliable local taxi service within Coimbatore city. Airport pickup/drop, railway station transfers, and hourly rentals available.', features: ['Airport Transfers', 'Railway Station Pickup', 'Hourly Rental', 'Point to Point'] },
    { icon: <FaCalendarAlt />, title: 'Tour Packages', desc: 'Curated tour packages to popular destinations like Ooty, Kodaikanal, Munnar, Wayanad, and more. All-inclusive pricing.', features: ['Hill Station Tours', 'Temple Tours', 'Weekend Getaways', 'Family Packages'] },
    { icon: <FaBus />, title: 'Corporate Travel', desc: 'Dedicated corporate travel solutions for businesses in Coimbatore. Monthly contracts, employee transport, and event transportation.', features: ['Monthly Contracts', 'Employee Transport', 'Event Transportation', 'Fleet Management'] },
    { icon: <FaPlane />, title: 'Airport Transfers', desc: 'Punctual airport pickup and drop services for Coimbatore International Airport. Meet & greet, flight tracking included.', features: ['Flight Tracking', 'Meet & Greet', '24/7 Available', 'Fixed Pricing'] },
    { icon: <FaCity />, title: 'Outstation Cabs', desc: 'Book outstation cabs from Coimbatore to any destination in India. One-way drops and multi-city trips available.', features: ['One-Way Drop', 'Multi-City Trips', 'Flexible Itinerary', 'All India Coverage'] },
  ];

  return (
    <div>
      <section className="bg-gradient-to-br from-dark to-primary py-16 text-center text-white">
        <div className="max-w-7xl mx-auto px-5">
          <h1 className="font-display text-4xl max-md:text-2xl font-bold mb-2">Our <span className="text-accent">Services</span></h1>
          <p className="text-white/80 text-lg">Comprehensive travel solutions for every need</p>
        </div>
      </section>

      <section className="py-20 max-md:py-12">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:-translate-y-1 hover:shadow-lg transition-all flex flex-col">
                <div className="text-3xl text-primary mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-500 text-sm mb-4 leading-6">{service.desc}</p>
                <ul className="mb-6 space-y-2 flex-1">
                  {service.features.map((f, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-accent before:shrink-0">{f}</li>
                  ))}
                </ul>
                <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors">
                  Enquire Now <FiArrowRight />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 max-md:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl max-md:text-2xl font-bold text-gray-900 mb-3">Our <span className="text-accent">Fleet</span></h2>
            <p className="text-gray-500 text-lg">Choose the perfect vehicle for your journey</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              ['https://images.unsplash.com/photo-1549317661-bd32c8ce0637?w=400','Sedan','Swift Dzire, Toyota Etios','4 Passengers','From ?12/km'],
              ['https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400','SUV','Toyota Innova, Ertiga','6-7 Passengers','From ?16/km'],
              ['https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400','Tempo Traveller','12-seater, 16-seater','12-16 Passengers','From ?22/km'],
            ].map(([img,title,subtitle,cap,price])=>(
              <div key={title} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:-translate-y-1 hover:shadow-lg transition-all">
                <img src={img} alt={title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-1">{title}</h3>
                  <p className="text-gray-500 text-sm mb-3">{subtitle}</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{cap}</span>
                    <span className="font-bold text-primary">{price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 max-md:py-12 bg-gradient-to-br from-primary to-dark-2 text-center text-white">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="font-display text-4xl max-md:text-2xl font-bold mb-3">Need a Custom Quote?</h2>
          <p className="text-white/80 text-lg mb-8">Contact us for personalized pricing based on your specific requirements.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a href="tel:+919876543210" className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-white rounded-lg font-semibold hover:bg-accent-light transition-all"><FiPhone /> Call Now</a>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-primary transition-all">Get Quote</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
