
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  DollarSign,
  Bike,
  AlertCircle
} from 'lucide-react';

interface RideBookingFormProps {
  onBookRide: (bookingData: any) => void;
  currentLocation: {lat: number, lng: number} | null;
}

const RideBookingForm = ({ onBookRide, currentLocation }: RideBookingFormProps) => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateFare = (distance: number) => {
    // Base fare + distance-based pricing
    const baseFare = 200;
    const perKmRate = 80;
    return Math.round(baseFare + (distance * perKmRate));
  };

  const calculateTime = (distance: number) => {
    // Assuming average speed of 25 km/h in city traffic
    return Math.round((distance / 25) * 60);
  };

  const handleBookRide = () => {
    if (!pickup || !destination) return;

    setIsCalculating(true);
    
    // Simulate distance calculation
    setTimeout(() => {
      const mockDistance = Math.random() * 15 + 2; // 2-17 km
      const estimatedFare = calculateFare(mockDistance);
      const estimatedTime = calculateTime(mockDistance);

      onBookRide({
        pickup,
        destination,
        estimatedFare,
        estimatedTime,
        distance: mockDistance
      });
      
      setIsCalculating(false);
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bike className="w-6 h-6 mr-3 text-[#043873]" />
          Book Your Okada Ride
        </CardTitle>
        <CardDescription>
          Fast, reliable motorcycle rides across the city
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="pickup">Pickup Location</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="pickup"
              placeholder="Enter pickup location"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="pl-10"
            />
          </div>
          {currentLocation && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPickup('Current Location')}
              className="text-[#043873]"
            >
              <Navigation className="w-3 h-3 mr-1" />
              Use Current Location
            </Button>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="destination">Destination</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-red-400" />
            <Input
              id="destination"
              placeholder="Where are you going?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Fare Estimate */}
        <div className="bg-gradient-to-r from-[#043873]/10 to-[#0521f5]/10 p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center">
              <DollarSign className="w-4 h-4 text-[#043873] mr-2" />
              <span>Base Fare: ₦200</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 text-[#0521f5] mr-2" />
              <span>Rate: ₦80/km</span>
            </div>
          </div>
        </div>

        {/* Safety Notice */}
        <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
          <div className="flex items-start">
            <AlertCircle className="w-4 h-4 text-yellow-600 mr-2 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <p className="font-medium mb-1">Safety First</p>
              <p>All our riders are verified and insured. Always wear the provided helmet.</p>
            </div>
          </div>
        </div>

        <Button
          onClick={handleBookRide}
          disabled={!pickup || !destination || isCalculating}
          className="w-full bg-[#043873] hover:bg-[#043873]/90"
        >
          {isCalculating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Calculating Fare...
            </>
          ) : (
            <>
              <Bike className="w-4 h-4 mr-2" />
              Book Okada Ride
            </>
          )}
        </Button>

        {/* Popular Destinations */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Popular Destinations</p>
          <div className="flex flex-wrap gap-2">
            {['Lagos Island', 'Victoria Island', 'Ikeja', 'Yaba', 'Surulere'].map((place) => (
              <Badge
                key={place}
                variant="outline"
                className="cursor-pointer hover:bg-[#043873] hover:text-white"
                onClick={() => setDestination(place)}
              >
                {place}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RideBookingForm;
