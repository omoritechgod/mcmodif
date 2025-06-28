
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import DashboardLayout from '../dashboardLayout/DashboardLayout';
import { 
  Package,
  MapPin,
  Clock,
  Shield,
  AlertTriangle,
  CheckCircle,
  Navigation,
  Camera,
  Phone,
  Truck,
  Star,
  DollarSign
} from 'lucide-react';

const DeliveryDashboard = () => {
  const [isOnDuty, setIsOnDuty] = useState(true);

  const deliveryQueue = [
    {
      id: '#D001',
      restaurant: 'Mama Kemi Kitchen',
      customer: 'John D.',
      address: '15 Ikeja Street, Lagos',
      items: 'Jollof Rice, Chicken',
      amount: '₦2,500',
      status: 'ready_for_pickup',
      distance: '2.3 km',
      eta: '15 mins',
      priority: 'normal',
      sealed: false
    },
    {
      id: '#D002',
      restaurant: 'Uncle Bello Spot',
      customer: 'Mary K.',
      address: '42 Victoria Island, Lagos',
      items: 'Eba & Egusi Soup',
      amount: '₦1,800',
      status: 'in_transit',
      distance: '5.8 km',
      eta: '25 mins',
      priority: 'high',
      sealed: true
    },
    {
      id: '#D003',
      restaurant: 'Aunty Shade Foods',
      customer: 'Paul O.',
      address: '8 Surulere Road, Lagos',
      items: 'Pounded Yam, Vegetable Soup',
      amount: '₦3,200',
      status: 'delivered',
      distance: '4.1 km',
      eta: 'Completed',
      priority: 'normal',
      sealed: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready_for_pickup':
        return 'bg-blue-100 text-blue-800';
      case 'in_transit':
        return 'bg-yellow-100 text-yellow-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'issue_reported':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority: string) => {
    if (priority === 'high') {
      return <AlertTriangle className="w-4 h-4 text-red-500" />;
    }
    return null;
  };

  return (
    <DashboardLayout userType="rider" userName="Delivery Person" userAvatar="/api/placeholder/32/32">
      <div className="space-y-8">
        {/* Status & Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Duty Status</span>
                <div className={`w-3 h-3 rounded-full ${isOnDuty ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">{isOnDuty ? 'On Duty' : 'Off Duty'}</span>
                <Switch checked={isOnDuty} onCheckedChange={setIsOnDuty} />
              </div>
              {isOnDuty && (
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex items-center space-x-2 text-green-700">
                    <Truck className="w-4 h-4" />
                    <span className="text-sm">Ready for deliveries</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Deliveries</CardTitle>
              <Package className="h-4 w-4 text-[#043873]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#043873]">12</div>
              <p className="text-xs text-muted-foreground">
                +3 from yesterday
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-[#0521f5]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0521f5]">₦2,400</div>
              <p className="text-xs text-muted-foreground">
                From completed deliveries
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">98%</div>
              <p className="text-xs text-muted-foreground">
                Successful deliveries
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Active Delivery */}
        <Card className="border-[#0521f5] border-2">
          <CardHeader>
            <CardTitle className="flex items-center text-[#0521f5]">
              <Navigation className="w-5 h-5 mr-2" />
              Active Delivery
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-r from-[#0521f5]/10 to-[#043873]/10 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-lg mb-2">#D002 - Uncle Bello Spot</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                      <span>42 Victoria Island, Lagos</span>
                    </div>
                    <div className="flex items-center">
                      <Package className="w-4 h-4 mr-2 text-gray-500" />
                      <span>Eba & Egusi Soup</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-gray-500" />
                      <span>ETA: 25 minutes</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Order Sealed:</span>
                    <Badge className="bg-green-100 text-green-800">
                      <Shield className="w-3 h-3 mr-1" />
                      Sealed
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-[#25D366] hover:bg-[#25D366]/90 text-white">
                      <Phone className="w-3 h-3 mr-1" />
                      Call Customer
                    </Button>
                    <Button size="sm" variant="outline">
                      <Navigation className="w-3 h-3 mr-1" />
                      Navigate
                    </Button>
                  </div>
                  <Button className="w-full bg-[#043873] hover:bg-[#043873]/90">
                    Mark as Delivered
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Delivery Queue */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery Queue</CardTitle>
              <CardDescription>Orders ready for pickup and delivery</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deliveryQueue.map((delivery) => (
                  <div key={delivery.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{delivery.id}</span>
                        {getPriorityIcon(delivery.priority)}
                        <Badge className={getStatusColor(delivery.status)}>
                          {delivery.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <span className="font-semibold text-[#043873]">{delivery.amount}</span>
                    </div>

                    <div className="space-y-2 text-sm mb-3">
                      <div className="font-medium">{delivery.restaurant} → {delivery.customer}</div>
                      <div className="text-gray-600">{delivery.items}</div>
                      <div className="flex items-center text-gray-500">
                        <MapPin className="w-3 h-3 mr-1" />
                        <span className="truncate">{delivery.address}</span>
                      </div>
                      <div className="flex justify-between text-gray-500">
                        <span>{delivery.distance}</span>
                        <span>{delivery.eta}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {delivery.sealed ? (
                          <Badge className="bg-green-100 text-green-800">
                            <Shield className="w-3 h-3 mr-1" />
                            Sealed
                          </Badge>
                        ) : (
                          <Badge className="bg-yellow-100 text-yellow-800">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Not Sealed
                          </Badge>
                        )}
                      </div>

                      {delivery.status === 'ready_for_pickup' && (
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Camera className="w-3 h-3 mr-1" />
                            Seal Order
                          </Button>
                          <Button size="sm" className="bg-[#0521f5] hover:bg-[#0521f5]/90">
                            Accept
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sealing & Compliance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-[#043873]" />
                Order Sealing Protocol
              </CardTitle>
              <CardDescription>Ensure food safety and customer trust</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-[#043873]/10 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Sealing Checklist:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>Verify order contents with restaurant</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>Apply tamper-evident seal</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>Take photo of sealed order</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>Update order status to 'sealed'</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full bg-[#043873] hover:bg-[#043873]/90">
                  <Camera className="w-4 h-4 mr-2" />
                  Start Sealing Process
                </Button>
                <Button variant="outline" className="w-full">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Report Seal Breach
                </Button>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center text-red-700 mb-2">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  <span className="font-medium">Important</span>
                </div>
                <p className="text-sm text-red-600">
                  Never break or tamper with seals. Report any issues immediately to maintain platform trust.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Summary</CardTitle>
            <CardDescription>Your delivery statistics and ratings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-[#043873]/10 rounded-lg">
                <Package className="w-8 h-8 text-[#043873] mx-auto mb-2" />
                <div className="font-semibold text-lg">247</div>
                <div className="text-sm text-gray-600">Total Deliveries</div>
              </div>
              <div className="text-center p-4 bg-[#0521f5]/10 rounded-lg">
                <Star className="w-8 h-8 text-[#0521f5] mx-auto mb-2" />
                <div className="font-semibold text-lg">4.9</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
              <div className="text-center p-4 bg-green-100 rounded-lg">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="font-semibold text-lg">98%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
              <div className="text-center p-4 bg-[#e95d08]/10 rounded-lg">
                <DollarSign className="w-8 h-8 text-[#e95d08] mx-auto mb-2" />
                <div className="font-semibold text-lg">₦15,400</div>
                <div className="text-sm text-gray-600">This Week</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DeliveryDashboard;
