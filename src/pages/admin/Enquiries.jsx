import { FiMail, FiPhone, FiCalendar, FiUser, FiCheckCircle, FiEye } from 'react-icons/fi';
import { useAppContext } from '../../context/AppContext';

export default function Enquiries() {
  const { enquiries, markEnquiryRead, markAllRead, unreadCount } = useAppContext();

  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">Customer Enquiries</h1>
          <p className="text-gray-500 text-sm mt-1">{unreadCount > 0 ? `You have ${unreadCount} new enquiry notifications!` : 'All caught up!'}</p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors"><FiCheckCircle /> Mark All Read</button>
        )}
      </div>

      {enquiries.length === 0 ? (
        <div className="text-center py-16">
          <FiMail className="text-5xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-700 mb-2">No Enquiries Yet</h3>
          <p className="text-gray-500">When customers submit enquiries, they will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {enquiries.map(enq => (
            <div key={enq.id} className={`bg-white rounded-xl shadow-sm border overflow-hidden ${enq.status === 'new' ? 'border-primary/30 bg-primary/[0.02]' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between p-5 border-b border-gray-100 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  {enq.status === 'new' && <span className="w-2.5 h-2.5 bg-accent rounded-full animate-[pulse-dot_2s_infinite]" />}
                  <h3 className="font-bold">{enq.tripTitle}</h3>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${enq.status === 'new' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{enq.status === 'new' ? 'New' : 'Read'}</span>
                </div>
                <span className="text-xs text-gray-400">{new Date(enq.createdAt).toLocaleString()}</span>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-sm"><FiUser className="text-primary" /><span><strong>Name:</strong> {enq.name}</span></div>
                  <div className="flex items-center gap-2 text-sm"><FiPhone className="text-primary" /><span><strong>Phone:</strong> <a href={`tel:${enq.phone}`} className="text-primary hover:text-accent">{enq.phone}</a></span></div>
                  {enq.email && <div className="flex items-center gap-2 text-sm"><FiMail className="text-primary" /><span><strong>Email:</strong> <a href={`mailto:${enq.email}`} className="text-primary hover:text-accent">{enq.email}</a></span></div>}
                  {enq.travelDate && <div className="flex items-center gap-2 text-sm"><FiCalendar className="text-primary" /><span><strong>Travel Date:</strong> {enq.travelDate}</span></div>}
                  <div className="flex items-center gap-2 text-sm"><FiUser className="text-primary" /><span><strong>Passengers:</strong> {enq.passengers}</span></div>
                </div>
                {enq.message && <div className="bg-gray-50 rounded-lg p-4 text-sm"><strong className="text-gray-700">Message:</strong><p className="text-gray-600 mt-1">{enq.message}</p></div>}
              </div>
              {enq.status === 'new' && (
                <div className="flex gap-3 px-5 pb-5">
                  <button onClick={() => markEnquiryRead(enq.id)} className="inline-flex items-center gap-2 text-xs bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-dark transition-colors"><FiEye /> Mark as Read</button>
                  <a href={`tel:${enq.phone}`} className="inline-flex items-center gap-2 text-xs border border-gray-200 px-4 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors"><FiPhone /> Call Customer</a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
