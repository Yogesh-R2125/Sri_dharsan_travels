import { FiCheckCircle, FiPhone } from 'react-icons/fi';
import { FaCar, FaHandshake, FaHeart, FaAward } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div>
      <section className="bg-gradient-to-br from-dark to-primary py-16 text-center text-white">
        <div className="max-w-7xl mx-auto px-5">
          <h1 className="font-display text-4xl max-md:text-2xl font-bold mb-2">About <span className="text-accent">Sri Dharsan Tour & Travels</span></h1>
          <p className="text-white/80 text-lg">Your trusted travel partner since 2010</p>
        </div>
      </section>

      <section className="py-20 max-md:py-12">
        <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <img src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600" alt="About" className="rounded-2xl shadow-lg w-full" />
          </div>
          <div>
            <h2 className="font-display text-3xl max-md:text-2xl font-bold mb-4">Our <span className="text-accent">Story</span></h2>
            <p className="text-gray-600 mb-4 leading-7">Founded in 2010, Sri Dharsan Tour & Travels has grown from a small taxi service in Coimbatore to one of the most trusted travel companies in Tamil Nadu. Our journey began with just 2 cars and a dream to provide the best travel experience.</p>
            <p className="text-gray-600 mb-5 leading-7">Today, we operate a fleet of 50+ well-maintained vehicles including sedans, SUVs, and tempo travellers, serving thousands of happy customers every month across South India.</p>
            <div className="space-y-2">
              {['Government Licensed & Insured', 'GPS Tracked Vehicles', 'Verified & Trained Drivers', '24/7 Customer Support', 'Transparent Pricing - No Hidden Costs', 'Clean & Sanitized Vehicles'].map(item => (
                <div key={item} className="flex items-center gap-2.5 py-2 font-medium text-gray-700">
                  <FiCheckCircle className="text-success shrink-0" /> {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 max-md:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl max-md:text-2xl font-bold text-gray-900 mb-3">Our <span className="text-accent">Values</span></h2>
            <p className="text-gray-500 text-lg">The principles that guide everything we do</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[[FaHandshake,'Trust','We build lasting relationships through transparency, honesty, and reliability in every ride.'],[FaHeart,'Customer First','Your comfort and satisfaction are our top priorities. We go the extra mile.'],[FaCar,'Quality','From our vehicles to our drivers, we maintain the highest standards.'],[FaAward,'Excellence','We constantly improve our services to deliver the best travel experience.']].map(([Icon,title,desc])=>(
              <div key={title} className="bg-white p-8 rounded-2xl text-center shadow-sm border border-gray-200 hover:-translate-y-1 hover:shadow-lg transition-all">
                <Icon className="text-4xl text-primary mb-4 mx-auto" />
                <h3 className="text-lg font-bold mb-2">{title}</h3>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 max-md:py-12">
        <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[['Our Mission','To provide safe, comfortable, and affordable travel solutions to every customer, making their journey as enjoyable as the destination.'],['Our Vision','To be the most trusted and preferred travel company in South India, known for our exceptional service quality and customer care.']].map(([title,desc])=>(
            <div key={title} className="bg-white p-10 rounded-2xl border-l-4 border-l-primary shadow-sm">
              <h3 className="font-display text-xl text-primary mb-3">{title}</h3>
              <p className="text-gray-600 leading-7">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 max-md:py-12 bg-gradient-to-br from-primary to-dark-2 text-center text-white">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="font-display text-4xl max-md:text-2xl font-bold mb-3">Experience the Difference</h2>
          <p className="text-white/80 text-lg mb-8">Travel with Sri Dharsan and discover why thousands choose us for their journeys.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a href="tel:+919876543210" className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary border-2 border-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-all"><FiPhone /> Call Now</a>
            <Link to="/trips" className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-primary transition-all">View Trips</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
