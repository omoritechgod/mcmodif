import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Clock, User, Star, Navigation, Phone, Locate } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Location {
  lat: number;
  lng: number;
  address?: string;
}

interface Rider {
  id: number;
  name: string;
  rating: number;
  completedRides: number;
  estimatedTime: string;
  distance: string;
  fare: string;
  image: string;
  bikeModel: string;
  isOnline: boolean;
  location: Location;
}

const RideHailing: React.FC = () => {
  const navigate = useNavigate();
  const [bookingStep, setBookingStep] = useState('pickup');
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedRider, setSelectedRider] = useState<number | null>(null);
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [trackingRide, setTrackingRide] = useState(false);
  const [rideStatus, setRideStatus] = useState<'searching' | 'found' | 'on-way' | 'arrived' | 'in-progress' | 'completed'>('searching');

  const nearbyRiders: Rider[] = [
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
      isOnline: true,
      location: { lat: 6.5244, lng: 3.3792 }
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
      isOnline: true,
      location: { lat: 6.5344, lng: 3.3892 }
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
      isOnline: true,
      location: { lat: 6.5144, lng: 3.3692 }
    }
  ];

  const recentLocations = [
    { name: "Victoria Island", address: "Lagos Island, Lagos" },
    { name: "Ikeja GRA", address: "Ikeja, Lagos" },
    { name: "Lekki Phase 1", address: "Lekki, Lagos" }
  ];

  // Get user's current location
  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location: Location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          
          // Reverse geocoding to get address (in real app, you'd use Google Maps API)
          setPickupLocation("Current Location");
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLoadingLocation(false);
          alert("Unable to get your location. Please enter manually.");
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    } else {
      setIsLoadingLocation(false);
      alert("Geolocation is not supported by this browser.");
    }
  };

  // Calculate distance between two points (simplified)
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Simulate ride tracking
  const startRideTracking = (riderId: number) => {
    setSelectedRider(riderId);
    setTrackingRide(true);
    setRideStatus('found');
    
    // Simulate ride progression
    setTimeout(() => setRideStatus('on-way'), 2000);
    setTimeout(() => setRideStatus('arrived'), 8000);
    setTimeout(() => setRideStatus('in-progress'), 12000);
    setTimeout(() => setRideStatus('completed'), 20000);
  };

  const handleBookRide = (riderId: number) => {
    startRideTracking(riderId);
    setBookingStep('tracking');
  };

  const getRideStatusMessage = () => {
    switch (rideStatus) {
      case 'searching':
        return 'Searching for nearby riders...';
      case 'found':
        return 'Rider found! Preparing for pickup...';
      case 'on-way':
        return 'Rider is on the way to your location';
      case 'arrived':
        return 'Rider has arrived at pickup location';
      case 'in-progress':
        return 'Ride in progress to destination';
      case 'completed':
        return 'Ride completed successfully!';
      default:
        return '';
    }
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
        {/* Ride Tracking View */}
        {trackingRide && bookingStep === 'tracking' && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Tracking Your Ride</h2>
              <p className="text-gray-600">{getRideStatusMessage()}</p>
            </div>

            {/* Live Map Placeholder */}
            <div className="bg-gray-100 rounded-xl h-64 mb-6 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100"></div>
              <div className="relative z-10 text-center">
                <Navigation size={48} className="text-blue-600 mx-auto mb-4 animate-pulse" />
                <p className="text-gray-600 font-medium">Live GPS Tracking</p>
                <p className="text-sm text-gray-500">Real-time location updates</p>
              </div>
              
              {/* Animated rider marker */}
              <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-blue-600 rounded-full animate-bounce"></div>
              {/* User location marker */}
              <div className="absolute bottom-1/4 right-1/3 w-4 h-4 bg-red-600 rounded-full"></div>
            </div>

            {/* Rider Info */}
            {selectedRider && (() => {
              const rider = nearbyRiders.find(r => r.id === selectedRider);
              return rider ? (
                <div className="border border-gray-200 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-4">
                    <img 
                      src={rider.image} 
                      alt={rider.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{rider.name}</h3>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Star size={14} className="text-yellow-500 fill-current" />
                          <span>{rider.rating}</span>
                        </div>
                        <span>•</span>
                        <span>{rider.bikeModel}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">{rider.fare}</div>
                      <button className="mt-2 p-2 bg-green-600 text-white rounded-lg">
                        <Phone size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ) : null;
            })()}

            {/* Trip Details */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-900 font-medium">From: {pickupLocation}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-gray-900 font-medium">To: {destination}</span>
                </div>
              </div>
            </div>

            {rideStatus === 'completed' && (
              <div className="mt-6 text-center">
                <button 
                  onClick={() => {
                    setTrackingRide(false);
                    setBookingStep('pickup');
                    setSelectedRider(null);
                    setRideStatus('searching');
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl"
                >
                  Book Another Ride
                </button>
              </div>
            )}
          </div>
        )}

        {/* Booking Form */}
        {!trackingRide && (
          <>
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
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={getCurrentLocation}
                    disabled={isLoadingLocation}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-blue-600 hover:text-blue-700 disabled:opacity-50"
                    title="Use current location"
                  >
                    <Locate size={20} className={isLoadingLocation ? 'animate-spin' : ''} />
                  </button>
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
          </>
        )}
      </div>
    </div>
  );
};

export default RideHailing;