
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import DashboardLayout from '../dashboardLayout/DashboardLayout';
import { 
  MapPin,
  Car,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  Star,
  Navigation,
  User,
  Phone,
  AlertCircle,
  TrendingUp,
  Calendar
} from 'lucide-react';

const RiderDashboard = () => {
  const [isOnline, setIsOnline] = useState(false);

  const todayTrips = [
    {
      id: '#R001',
      customer: 'John D.',
      pickup: 'Ikeja Bus Stop',
      destination: 'Victoria Island',
      distance: '12.5 km',
      fare: '₦800',
      status: 'completed',
      time: '2:30 PM',
      duration: '25 mins',
      rating: 5
    },
    {
      id: '#R002',
      customer: 'Mary K.',
      pickup: 'Yaba Market',
      destination: 'Surulere',
      distance: '8.2 km',
      fare: '₦600',
      status: 'active',
      time: '3:45 PM',
      duration: '15 mins',
      rating: null
    },
    {
      id: '#R003',
      customer: 'Paul O.',
      pickup: 'Maryland Mall',
      destination: 'Gbagada',
      distance: '6.8 km',
      fare: '₦500',
      status: 'pending',
      time: '4:20 PM',
      duration: null,
      rating: null
    }
  ];

  const weeklyStats = [
    { day: 'Mon', trips: 8, earnings: 4800 },
    { day: 'Tue', trips: 12, earnings: 7200 },
    { day: 'Wed', trips: 10, earnings: 6000 },
    { day: 'Thu', trips: 15, earnings: 9500 },
    { day: 'Fri', trips: 18, earnings: 11800 },
    { day: 'Sat', trips: 22, earnings: 14200 },
    { day: 'Sun', trips: 14, earnings: 8600 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout userType="rider" userName="Ibrahim Okada" userAvatar="/api/placeholder/32/32">
      <div className="space-y-8">
        {/* Online Status & Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Rider Status</span>
                <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">{isOnline ? 'Online' : 'Offline'}</span>
                <Switch checked={isOnline} onCheckedChange={setIsOnline} />
              </div>
              {isOnline && (
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex items-center space-x-2 text-green-700">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">Available for rides</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-[#043873]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#043873]">₦1,900</div>
              <p className="text-xs text-muted-foreground">
                From 3 completed trips
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Trips Completed</CardTitle>
              <Car className="h-4 w-4 text-[#0521f5]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0521f5]">8</div>
              <p className="text-xs text-muted-foreground">
                +2 from yesterday
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rating</CardTitle>
              <Star className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">4.8</div>
              <Progress value={96} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Live Map and Current Trip */}
        {isOnline && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Navigation className="w-5 h-5 mr-2 text-[#043873]" />
                Live Map & Current Trip
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-[#043873]/10 to-[#0521f5]/10 rounded-lg p-6 h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-[#043873] mx-auto mb-4" />
                  <p className="text-lg font-medium text-[#043873] mb-2">Waiting for ride requests...</p>
                  <p className="text-gray-600">Your location is shared with nearby customers</p>
                  <Button className="mt-4 bg-[#0521f5] hover:bg-[#0521f5]/90">
                    <Navigation className="w-4 h-4 mr-2" />
                    View Full Map
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Today's Trips */}
          <Card>
            <CardHeader>
              <CardTitle>Today's Trips</CardTitle>
              <CardDescription>Your ride history for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayTrips.map((trip) => (
                  <div key={trip.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-medium">{trip.id}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <User className="w-3 h-3 mr-1" />
                          {trip.customer}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-[#043873]">{trip.fare}</div>
                        <Badge className={getStatusColor(trip.status)}>
                          {trip.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-3 h-3 mr-2" />
                        <span className="truncate">{trip.pickup} → {trip.destination}</span>
                      </div>
                      <div className="flex justify-between text-gray-500">
                        <span>{trip.distance}</span>
                        <span>{trip.time}</span>
                        {trip.duration && <span>{trip.duration}</span>}
                      </div>
                      {trip.rating && (
                        <div className="flex items-center">
                          {[...Array(trip.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      )}
                    </div>

                    {trip.status === 'active' && (
                      <div className="mt-3 flex space-x-2">
                        <Button size="sm" className="bg-[#25D366] hover:bg-[#25D366]/90 text-white">
                          <Phone className="w-3 h-3 mr-1" />
                          Call Customer
                        </Button>
                        <Button size="sm" variant="outline">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Complete Trip
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weekly Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Performance</CardTitle>
              <CardDescription>Your earnings and trip trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyStats.map((stat) => (
                  <div key={stat.day} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="font-medium text-gray-900">{stat.day}</div>
                      <div className="text-sm text-gray-600">{stat.trips} trips</div>
                    </div>
                    <div className="font-semibold text-[#043873]">₦{stat.earnings.toLocaleString()}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-[#043873]/10 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-[#043873] mx-auto mb-2" />
                  <div className="font-semibold text-lg">₦62,100</div>
                  <div className="text-sm text-gray-600">Total Earned</div>
                </div>
                <div className="text-center p-4 bg-[#0521f5]/10 rounded-lg">
                  <Car className="w-8 h-8 text-[#0521f5] mx-auto mb-2" />
                  <div className="font-semibold text-lg">97</div>
                  <div className="text-sm text-gray-600">Total Trips</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* KYC Verification */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
              Account Verification
            </CardTitle>
            <CardDescription>Complete your verification for full platform access</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 border rounded-lg">
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <h4 className="font-medium mb-1">Phone Verified</h4>
                <p className="text-sm text-gray-600">Your phone number is confirmed</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <h4 className="font-medium mb-1">ID Submitted</h4>
                <p className="text-sm text-gray-600">National ID under review</p>
              </div>
              <div className="text-center p-4 border rounded-lg border-yellow-200 bg-yellow-50">
                <AlertCircle className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <h4 className="font-medium mb-1">Vehicle Documents</h4>
                <p className="text-sm text-gray-600 mb-3">Please upload vehicle papers</p>
                <Button size="sm" className="bg-[#e95d08] hover:bg-[#e95d08]/90">
                  Upload Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default RiderDashboard;
