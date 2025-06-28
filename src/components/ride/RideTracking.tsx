
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Navigation, 
  Bike,
  Route,
  Clock
} from 'lucide-react';

interface RideTrackingProps {
  currentLocation: {lat: number, lng: number} | null;
  driverLocation?: {lat: number, lng: number};
  rideStatus: string;
}

const RideTracking = ({ currentLocation, driverLocation, rideStatus }: RideTrackingProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'booking':
        return 'bg-gray-100 text-gray-800';
      case 'searching':
        return 'bg-yellow-100 text-yellow-800';
      case 'found':
        return 'bg-blue-100 text-blue-800';
      case 'pickup':
        return 'bg-orange-100 text-orange-800';
      case 'ongoing':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'booking':
        return 'Ready to Book';
      case 'searching':
        return 'Finding Rider';
      case 'found':
        return 'Rider Found';
      case 'pickup':
        return 'Rider Coming';
      case 'ongoing':
        return 'Trip in Progress';
      case 'completed':
        return 'Trip Completed';
      default:
        return 'Unknown Status';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <Navigation className="w-5 h-5 mr-2 text-[#043873]" />
            Live Tracking
          </span>
          <Badge className={getStatusColor(rideStatus)}>
            {getStatusText(rideStatus)}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Map Container */}
        <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-8 h-96 flex items-center justify-center relative overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 w-2 h-2 bg-[#043873] rounded-full animate-pulse"></div>
            <div className="absolute top-8 right-6 w-1 h-1 bg-[#0521f5] rounded-full animate-pulse delay-100"></div>
            <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-[#043873] rounded-full animate-pulse delay-200"></div>
            <div className="absolute bottom-4 right-4 w-2 h-2 bg-[#0521f5] rounded-full animate-pulse delay-300"></div>
          </div>

          <div className="text-center z-10">
            {rideStatus === 'booking' && (
              <>
                <MapPin className="w-16 h-16 text-[#043873] mx-auto mb-4" />
                <p className="text-lg font-medium text-[#043873] mb-2">Ready to Track</p>
                <p className="text-gray-600">Book a ride to see live location tracking</p>
              </>
            )}

            {rideStatus === 'searching' && (
              <>
                <div className="relative">
                  <Bike className="w-16 h-16 text-[#043873] mx-auto mb-4 animate-pulse" />
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-20 border-4 border-[#043873] border-opacity-20 rounded-full animate-ping"></div>
                </div>
                <p className="text-lg font-medium text-[#043873] mb-2">Searching for Riders</p>
                <p className="text-gray-600">Looking for nearby okada riders...</p>
              </>
            )}

            {(rideStatus === 'found' || rideStatus === 'pickup') && (
              <>
                <div className="relative">
                  <div className="flex items-center justify-center space-x-8 mb-4">
                    <MapPin className="w-12 h-12 text-blue-600" />
                    <div className="flex-1 h-1 bg-gradient-to-r from-blue-600 to-green-600 rounded animate-pulse"></div>
                    <Bike className="w-12 h-12 text-green-600 animate-bounce" />
                  </div>
                </div>
                <p className="text-lg font-medium text-[#043873] mb-2">
                  {rideStatus === 'found' ? 'Rider Assigned' : 'Rider on the Way'}
                </p>
                <p className="text-gray-600">
                  {rideStatus === 'found' ? 'Accept the ride to start tracking' : 'Track your rider in real-time'}
                </p>
              </>
            )}

            {rideStatus === 'ongoing' && (
              <>
                <div className="relative">
                  <Route className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-16 border-2 border-green-600 border-opacity-30 rounded-full animate-spin"></div>
                </div>
                <p className="text-lg font-medium text-green-600 mb-2">Trip in Progress</p>
                <p className="text-gray-600">Enjoy your ride! ETA updates in real-time</p>
              </>
            )}

            {rideStatus === 'completed' && (
              <>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-lg font-medium text-green-600 mb-2">Destination Reached!</p>
                <p className="text-gray-600">Thank you for riding with McDoc Okada</p>
              </>
            )}
          </div>
        </div>

        {/* Location Info */}
        {currentLocation && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center text-sm text-gray-600">
              <Navigation className="w-4 h-4 mr-2" />
              <span>
                Your Location: {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}
              </span>
            </div>
            {driverLocation && (
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <Bike className="w-4 h-4 mr-2" />
                <span>
                  Rider Location: {driverLocation.lat.toFixed(6)}, {driverLocation.lng.toFixed(6)}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <div className="bg-blue-50 p-2 rounded text-center">
            <Clock className="w-4 h-4 mx-auto mb-1 text-blue-600" />
            <span className="text-blue-600 font-medium">Live ETA</span>
          </div>
          <div className="bg-green-50 p-2 rounded text-center">
            <Route className="w-4 h-4 mx-auto mb-1 text-green-600" />
            <span className="text-green-600 font-medium">Route Tracking</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RideTracking;
