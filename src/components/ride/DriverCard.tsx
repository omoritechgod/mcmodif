
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  Phone, 
  MessageCircle, 
  Bike,
  Shield,
  Clock,
  MapPin,
  CheckCircle,
  Navigation
} from 'lucide-react';

interface DriverCardProps {
  driver: {
    id: string;
    name: string;
    rating: number;
    avatar: string;
    phone: string;
    plateNumber: string;
    bikeModel: string;
    eta: number;
  };
  rideStatus: string;
  onAcceptRide: () => void;
  estimatedFare: number;
  destination: string;
}

const DriverCard = ({ driver, rideStatus, onAcceptRide, estimatedFare, destination }: DriverCardProps) => {
  return (
    <Card className="border-2 border-[#043873]/20">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <Bike className="w-5 h-5 mr-2 text-[#043873]" />
            {rideStatus === 'found' ? 'Rider Found!' : 
             rideStatus === 'pickup' ? 'Rider Coming' : 'On Trip'}
          </span>
          <Badge className="bg-green-100 text-green-800">
            <Shield className="w-3 h-3 mr-1" />
            Verified
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Driver Info */}
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={driver.avatar} alt={driver.name} />
            <AvatarFallback className="bg-[#043873] text-white text-lg">
              {driver.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{driver.name}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                <span className="font-medium">{driver.rating}</span>
              </div>
              <span>•</span>
              <span>{driver.bikeModel}</span>
            </div>
            <p className="text-sm text-gray-500">{driver.plateNumber}</p>
          </div>
          <div className="text-right">
            <div className="font-bold text-[#043873] text-lg">₦{estimatedFare}</div>
            <div className="text-sm text-gray-500">Total Fare</div>
          </div>
        </div>

        {/* Trip Details */}
        <div className="bg-blue-50 p-3 rounded-lg space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-red-500" />
              Destination
            </span>
            <span className="font-medium">{destination}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-blue-500" />
              {rideStatus === 'found' ? 'ETA' : rideStatus === 'pickup' ? 'Arrival' : 'Trip Time'}
            </span>
            <span className="font-medium">
              {rideStatus === 'found' ? `${driver.eta} mins` : 
               rideStatus === 'pickup' ? '2-3 mins' : 'In Progress'}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          {rideStatus === 'found' && (
            <>
              <Button onClick={onAcceptRide} className="flex-1 bg-[#043873] hover:bg-[#043873]/90">
                <CheckCircle className="w-4 h-4 mr-2" />
                Accept Ride
              </Button>
              <Button variant="outline" size="icon">
                <Phone className="w-4 h-4" />
              </Button>
            </>
          )}

          {rideStatus === 'pickup' && (
            <>
              <Button className="flex-1 bg-green-600 hover:bg-green-700" disabled>
                <Navigation className="w-4 h-4 mr-2" />
                Rider is Coming
              </Button>
              <Button variant="outline" size="icon" className="bg-[#25D366] text-white hover:bg-[#25D366]/90">
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <MessageCircle className="w-4 h-4" />
              </Button>
            </>
          )}

          {rideStatus === 'ongoing' && (
            <>
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700" disabled>
                <Bike className="w-4 h-4 mr-2" />
                Trip in Progress
              </Button>
              <Button variant="outline" size="icon" className="bg-[#25D366] text-white hover:bg-[#25D366]/90">
                <Phone className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>

        {/* Safety Info */}
        <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
          <div className="flex items-center text-sm text-yellow-800">
            <Shield className="w-4 h-4 mr-2" />
            <span className="font-medium">Safety: </span>
            <span className="ml-1">Share trip details with contacts for safety</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DriverCard;
