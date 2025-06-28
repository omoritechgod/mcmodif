
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  DollarSign, 
  Phone, 
  Star,
  Bike,
  User,
  Shield,
  MessageCircle,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import RideBookingForm from '@/components/ride/RideBookingForm';
import RideTracking from '@/components/ride/RideTracking';
import DriverCard from '@/components/ride/DriverCard';

type RideStatus = 'booking' | 'searching' | 'found' | 'pickup' | 'ongoing' | 'completed';

const RidePage = () => {
  const [rideStatus, setRideStatus] = useState<RideStatus>('booking');
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null);
  const [destination, setDestination] = useState('');
  const [estimatedFare, setEstimatedFare] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [assignedDriver, setAssignedDriver] = useState<any>(null);

  // Mock driver data
  const mockDriver = {
    id: 'DR001',
    name: 'Ibrahim Okada',
    rating: 4.8,
    avatar: '/api/placeholder/64/64',
    phone: '+234 801 234 5678',
    plateNumber: 'ABC-123-XY',
    bikeModel: 'Bajaj Pulsar 200',
    location: { lat: 6.5244, lng: 3.3792 },
    eta: 5
  };

  // Get current location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Location error:', error);
          // Default to Lagos coordinates
          setCurrentLocation({ lat: 6.5244, lng: 3.3792 });
        }
      );
    } else {
      // Default to Lagos coordinates
      setCurrentLocation({ lat: 6.5244, lng: 3.3792 });
    }
  }, []);

  const handleBookRide = (bookingData: any) => {
    setDestination(bookingData.destination);
    setEstimatedFare(bookingData.estimatedFare);
    setEstimatedTime(bookingData.estimatedTime);
    setRideStatus('searching');
    
    // Simulate finding a driver
    setTimeout(() => {
      setAssignedDriver(mockDriver);
      setRideStatus('found');
    }, 3000);
  };

  const handleAcceptRide = () => {
    setRideStatus('pickup');
    
    // Simulate driver arrival
    setTimeout(() => {
      setRideStatus('ongoing');
    }, 10000);
  };

  const handleCompleteRide = () => {
    setRideStatus('completed');
  };

  const resetRide = () => {
    setRideStatus('booking');
    setAssignedDriver(null);
    setDestination('');
    setEstimatedFare(0);
    setEstimatedTime(0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-[#043873] to-[#0521f5] rounded-lg p-2 mr-3">
                <Bike className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-[#043873]">McDoc Okada</h1>
            </div>
            <Badge className="bg-green-100 text-green-800">
              <Shield className="w-3 h-3 mr-1" />
              Safe Rides
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Booking Form or Status */}
          <div className="space-y-6">
            {rideStatus === 'booking' && (
              <RideBookingForm 
                onBookRide={handleBookRide}
                currentLocation={currentLocation}
              />
            )}

            {rideStatus === 'searching' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#043873] mr-3"></div>
                    Finding Your Rider
                  </CardTitle>
                  <CardDescription>
                    Searching for nearby okada riders...
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Destination</span>
                      <span className="text-gray-600">{destination}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-medium">Estimated Fare</span>
                      <span className="font-bold text-[#043873]">₦{estimatedFare}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-medium">Estimated Time</span>
                      <span className="text-gray-600">{estimatedTime} mins</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 text-center">
                    Please wait while we connect you with a nearby rider
                  </p>
                </CardContent>
              </Card>
            )}

            {(rideStatus === 'found' || rideStatus === 'pickup' || rideStatus === 'ongoing') && assignedDriver && (
              <DriverCard 
                driver={assignedDriver}
                rideStatus={rideStatus}
                onAcceptRide={handleAcceptRide}
                estimatedFare={estimatedFare}
                destination={destination}
              />
            )}

            {rideStatus === 'completed' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-green-600">
                    <CheckCircle className="w-6 h-6 mr-3" />
                    Ride Completed!
                  </CardTitle>
                  <CardDescription>
                    Thank you for riding with us
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Total Fare</span>
                      <span className="font-bold text-[#043873] text-lg">₦{estimatedFare}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Rider</span>
                      <span className="text-gray-600">{assignedDriver?.name}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Rate Your Rider</h4>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Button key={star} variant="outline" size="sm">
                          <Star className="w-4 h-4" />
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button className="flex-1 bg-[#043873] hover:bg-[#043873]/90">
                      Book Another Ride
                    </Button>
                    <Button variant="outline" onClick={resetRide}>
                      Done
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Safety Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-green-600" />
                  Safety Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    <span>Verified Riders</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    <span>GPS Tracking</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    <span>24/7 Support</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    <span>Insurance Coverage</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Map */}
          <div className="lg:sticky lg:top-8">
            <RideTracking 
              currentLocation={currentLocation}
              driverLocation={assignedDriver?.location}
              rideStatus={rideStatus}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RidePage;
