import { Link } from 'react-router-dom';
import { FiMapPin, FiTag, FiInbox, FiTrendingUp } from 'react-icons/fi';
import { useAppContext } from '../../context/AppContext';

export default function Dashboard() {
  const { trips, enquiries, unreadCount } = useAppContext();
  const activeTrips = trips.filter(t => t.active).length;
  const offerTrips = trips.filter(t => t.isOffer && t.active).length;
  const totalEnquiries = enquiries.length;
  const newEnquiries = enquiries.filter(e => e.status === 'new').length;
  const recentEnquiries = enquiries.slice(0, 5);

  const stats = [
    { icon: FiMapPin, label: 'Active Trips', value: activeTrips, color: 'bg-blue-50 text-blue-600' },
    { icon: FiTag, label: 'Special Offers', value: offerTrips, color: 'bg-green-50 text-green-600' },
    { icon: FiInbox, label: 'Total Enquiries', value: totalEnquiries, color: 'bg-orange-50 text-orange-600' },
    { icon: FiTrendingUp, label: 'New Enquiries', value: newEnquiries, color: 'bg-red-50 text-red-600' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back! Here is an overview of your business.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-8">
        {stats.map(s => (
          <div key={s.label} className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-200 flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-lg sm:text-xl ${s.color}`}><s.icon /></div>
            <div><h3 className="text-xl sm:text-2xl font-bold">{s.value}</h3><p className="text-xs sm:text-sm text-gray-500">{s.label}</p></div>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[['/admin/trips', FiMapPin, 'Manage Trips'],['/admin/offers', FiTag, 'Manage Offers'],['/admin/enquiries', FiInbox, 'View Enquiries']].map(([to, Icon, label]) => (
            <Link key={to} to={to} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-0.5 transition-all">
              <Icon className="text-xl text-primary" />
              <span className="font-semibold text-sm">{label}</span>
              {to === '/admin/enquiries' && unreadCount > 0 && <span className="ml-auto bg-danger text-white text-xs px-2 py-0.5 rounded-full">{unreadCount}</span>}
            </Link>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Recent Enquiries</h2>
          <Link to="/admin/enquiries" className="text-sm text-primary hover:text-accent font-semibold">View All</Link>
        </div>
        {/* Desktop table */}
        <div className="hidden sm:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-100 text-left">
              <th className="px-5 py-3 font-semibold text-gray-500">Customer</th>
              <th className="px-5 py-3 font-semibold text-gray-500">Trip</th>
              <th className="px-5 py-3 font-semibold text-gray-500">Phone</th>
              <th className="px-5 py-3 font-semibold text-gray-500">Date</th>
              <th className="px-5 py-3 font-semibold text-gray-500">Status</th>
            </tr></thead>
            <tbody>
              {recentEnquiries.map(enq => (
                <tr key={enq.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-5 py-3 font-semibold">{enq.name}</td>
                  <td className="px-5 py-3">{enq.tripTitle}</td>
                  <td className="px-5 py-3">{enq.phone}</td>
                  <td className="px-5 py-3">{new Date(enq.createdAt).toLocaleDateString()}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${enq.status === 'new' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{enq.status === 'new' ? 'New' : 'Read'}</span>
                  </td>
                </tr>
              ))}
              {recentEnquiries.length === 0 && <tr><td colSpan="5" className="px-5 py-8 text-center text-gray-400">No enquiries yet</td></tr>}
            </tbody>
          </table>
        </div>
        {/* Mobile cards */}
        <div className="sm:hidden space-y-3">
          {recentEnquiries.map(enq => (
            <div key={enq.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-sm">{enq.name}</span>
                <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${enq.status === 'new' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{enq.status === 'new' ? 'New' : 'Read'}</span>
              </div>
              <p className="text-xs text-gray-500 mb-1">{enq.tripTitle}</p>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>{enq.phone}</span>
                <span>{new Date(enq.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
          {recentEnquiries.length === 0 && <div className="text-center py-8 text-gray-400 text-sm">No enquiries yet</div>}
        </div>
      </div>
    </div>
  );
}
