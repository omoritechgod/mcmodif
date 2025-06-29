import React, { useState } from 'react';
import { ArrowLeft, MapPin, Clock, User, Star, Navigation, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RideHailing: React.FC = () => {
  const navigate = useNavigate();
  const [bookingStep, setBookingStep] = useState('pickup'); // pickup, destination, riders, confirm
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedRider, setSelectedRider] = useState<number | null>(null);

  const nearbyRiders = [
    {
      id: 1,
      name: "Adebayo Johnson",
      rating: 4.9,
      completedRides: 1250,
      estimatedTime: "3 min",
      distance: "0.5 km",
      fare: "₦800",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200",
      bikeModel: "Honda CB150",
      isOnline: true
    },
    {
      id: 2,
      name: "Ibrahim Musa",
      rating: 4.8,
      completedRides: 980,
      estimatedTime: "5 min",
      distance: "0.8 km",
      fare: "₦750",
      image: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=200",
      bikeModel: "Bajaj Pulsar",
      isOnline: true
    },
    {
      id: 3,
      name: "Emeka Okafor",
      rating: 4.7,
      completedRides: 756,
      estimatedTime: "7 min",
      distance: "1.2 km",
      fare: "₦900",
      image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200",
      bikeModel: "TVS Apache",
      isOnline: true
    }
  ];

  const recentLocations = [
    { name: "Victoria Island", address: "Lagos Island, Lagos" },
    { name: "Ikeja GRA", address: "Ikeja, Lagos" },
    { name: "Lekki Phase 1", address: "Lekki, Lagos" }
  ];

  const handleBookRide = (riderId: number) => {
    setSelectedRider(riderId);
    setBookingStep('confirm');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Ride Hailing</h1>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <MapPin size={14} />
                  <span>Lagos, Nigeria</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Booking Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Book a Ride</h2>
          
          {/* Location Inputs */}
          <div className="space-y-4 mb-6">
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-green-500 rounded-full"></div>
              <input
                type="text"
                placeholder="Pickup location"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-red-500 rounded-full"></div>
              <input
                type="text"
                placeholder="Where to?"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Recent Locations */}
          {!pickupLocation && !destination && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Recent locations</h3>
              <div className="space-y-2">
                {recentLocations.map((location, index) => (
                  <button
                    key={index}
                    className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={() => setPickupLocation(location.name)}
                  >
                    <div className="font-medium text-gray-900">{location.name}</div>
                    <div className="text-sm text-gray-600">{location.address}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Available Riders */}
        {pickupLocation && destination && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Available Riders</h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>{nearbyRiders.length} riders nearby</span>
              </div>
            </div>

            <div className="space-y-4">
              {nearbyRiders.map((rider) => (
                <div key={rider.id} className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img 
                          src={rider.image} 
                          alt={rider.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        {rider.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-gray-900">{rider.name}</h3>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Star size={14} className="text-yellow-500 fill-current" />
                            <span>{rider.rating}</span>
                          </div>
                          <span>•</span>
                          <span>{rider.completedRides} rides</span>
                          <span>•</span>
                          <span>{rider.bikeModel}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">{rider.fare}</div>
                      <div className="text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock size={12} />
                          <span>{rider.estimatedTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Navigation size={12} />
                          <span>{rider.distance} away</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <button 
                      onClick={() => handleBookRide(rider.id)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors"
                    >
                      Book Ride
                    </button>
                    <button className="px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                      <Phone size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Booking Confirmation */}
        {bookingStep === 'confirm' && selectedRider && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Booking</h3>
              
              {(() => {
                const rider = nearbyRiders.find(r => r.id === selectedRider);
                return rider ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <img 
                        src={rider.image} 
                        alt={rider.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900">{rider.name}</h4>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Star size={14} className="text-yellow-500 fill-current" />
                          <span>{rider.rating} • {rider.completedRides} rides</span>
                        </div>
                        <div className="text-sm text-gray-600">{rider.bikeModel}</div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">From:</span>
                          <span className="font-medium">{pickupLocation}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">To:</span>
                          <span className="font-medium">{destination}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Estimated time:</span>
                          <span className="font-medium">{rider.estimatedTime}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total fare:</span>
                          <span>{rider.fare}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button 
                        onClick={() => setBookingStep('pickup')}
                        className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors">
                        Confirm Booking
                      </button>
                    </div>
                  </div>
                ) : null;
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RideHailing;