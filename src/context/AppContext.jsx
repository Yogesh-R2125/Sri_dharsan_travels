import { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext();

const initialTrips = [
  {
    id: 1,
    title: 'Coimbatore to Chennai',
    from: 'Coimbatore',
    to: 'Chennai',
    distance: '505 km',
    duration: '8 hours',
    vehicleType: 'Sedan',
    price: 4500,
    offerPrice: 3999,
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600',
    description: 'Comfortable sedan ride from Coimbatore to Chennai via Salem. AC vehicle with experienced driver. Toll and parking included.',
    highlights: ['AC Vehicle', 'Experienced Driver', 'Toll Included', 'Parking Included'],
    isOffer: true,
    offerLabel: '11% OFF',
    active: true,
  },
  {
    id: 2,
    title: 'Coimbatore to Bangalore',
    from: 'Coimbatore',
    to: 'Bangalore',
    distance: '365 km',
    duration: '6 hours',
    vehicleType: 'SUV',
    price: 5500,
    offerPrice: null,
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600',
    description: 'Spacious SUV for a comfortable journey from Coimbatore to Bangalore. Ideal for families and groups.',
    highlights: ['Spacious SUV', 'Family Friendly', 'Highway Drive', 'Rest Stops'],
    isOffer: false,
    offerLabel: '',
    active: true,
  },
  {
    id: 3,
    title: 'Coimbatore to Ooty',
    from: 'Coimbatore',
    to: 'Ooty',
    distance: '86 km',
    duration: '3 hours',
    vehicleType: 'Sedan',
    price: 2500,
    offerPrice: 1999,
    image: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=600',
    description: 'Scenic hill station drive from Coimbatore to Ooty through 36 hairpin bends. Enjoy the Nilgiri mountain views.',
    highlights: ['Scenic Route', '36 Hairpin Bends', 'Nilgiri Views', 'Hill Station'],
    isOffer: true,
    offerLabel: '20% OFF',
    active: true,
  },
  {
    id: 4,
    title: 'Coimbatore to Madurai',
    from: 'Coimbatore',
    to: 'Madurai',
    distance: '210 km',
    duration: '4 hours',
    vehicleType: 'Sedan',
    price: 3200,
    offerPrice: null,
    image: 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=600',
    description: 'Quick and comfortable trip to the temple city Madurai. Visit Meenakshi Temple and explore the rich cultural heritage.',
    highlights: ['Temple City', 'Cultural Heritage', 'Quick Trip', 'AC Sedan'],
    isOffer: false,
    offerLabel: '',
    active: true,
  },
  {
    id: 5,
    title: 'Coimbatore to Kodaikanal',
    from: 'Coimbatore',
    to: 'Kodaikanal',
    distance: '175 km',
    duration: '5 hours',
    vehicleType: 'SUV',
    price: 4000,
    offerPrice: 3499,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600',
    description: 'Journey to the Princess of Hill Stations. Enjoy the scenic beauty of Kodaikanal with our premium SUV service.',
    highlights: ['Princess of Hills', 'Premium SUV', 'Scenic Beauty', 'Lake City'],
    isOffer: true,
    offerLabel: '12% OFF',
    active: true,
  },
  {
    id: 6,
    title: 'Coimbatore to Munnar',
    from: 'Coimbatore',
    to: 'Munnar',
    distance: '160 km',
    duration: '4.5 hours',
    vehicleType: 'SUV',
    price: 3800,
    offerPrice: null,
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600',
    description: 'Drive through lush tea plantations to reach the beautiful Munnar. Perfect getaway from city life.',
    highlights: ['Tea Plantations', 'Kerala Border', 'Nature Escape', 'Cool Climate'],
    isOffer: false,
    offerLabel: '',
    active: true,
  },
];

const initialEnquiries = [
  {
    id: 1,
    tripId: 1,
    tripTitle: 'Coimbatore to Chennai',
    name: 'Ravi Kumar',
    phone: '9876543210',
    email: 'ravi@example.com',
    travelDate: '2026-03-01',
    passengers: 3,
    message: 'Need a sedan for 3 passengers. Early morning preferred.',
    status: 'new',
    createdAt: '2026-02-13T10:30:00',
  },
];

export function AppProvider({ children }) {
  const [trips, setTrips] = useState(initialTrips);
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);

  const addTrip = useCallback((trip) => {
    setTrips(prev => [...prev, { ...trip, id: Date.now(), active: true }]);
  }, []);

  const updateTrip = useCallback((id, updatedTrip) => {
    setTrips(prev => prev.map(t => t.id === id ? { ...t, ...updatedTrip } : t));
  }, []);

  const deleteTrip = useCallback((id) => {
    setTrips(prev => prev.filter(t => t.id !== id));
  }, []);

  const addEnquiry = useCallback((enquiry) => {
    const newEnquiry = {
      ...enquiry,
      id: Date.now(),
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    setEnquiries(prev => [newEnquiry, ...prev]);
    setUnreadCount(prev => prev + 1);
  }, []);

  const markEnquiryRead = useCallback((id) => {
    setEnquiries(prev =>
      prev.map(e => {
        if (e.id === id && e.status === 'new') {
          setUnreadCount(c => Math.max(0, c - 1));
          return { ...e, status: 'read' };
        }
        return e;
      })
    );
  }, []);

  const markAllRead = useCallback(() => {
    setEnquiries(prev => prev.map(e => ({ ...e, status: 'read' })));
    setUnreadCount(0);
  }, []);

  const adminLogin = useCallback((password) => {
    if (password === 'admin123') {
      setIsAdminLoggedIn(true);
      return true;
    }
    return false;
  }, []);

  const adminLogout = useCallback(() => {
    setIsAdminLoggedIn(false);
  }, []);

  return (
    <AppContext.Provider
      value={{
        trips,
        enquiries,
        isAdminLoggedIn,
        unreadCount,
        addTrip,
        updateTrip,
        deleteTrip,
        addEnquiry,
        markEnquiryRead,
        markAllRead,
        adminLogin,
        adminLogout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
