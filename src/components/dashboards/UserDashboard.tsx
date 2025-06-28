
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import DashboardLayout from '../dashboardLayout/DashboardLayout';
import { 
  Car,
  UtensilsCrossed,
  Building,
  ShoppingBag,
  Wrench,
  Wallet,
  Clock,
  MapPin,
  Star,
  MessageCircle,
  TrendingUp,
  DollarSign
} from 'lucide-react';

const UserDashboard = () => {
  const recentOrders = [
    {
      id: '001',
      type: 'food',
      title: 'Jollof Rice from Mama Kemi',
      status: 'delivered',
      amount: '₦2,500',
      time: '2 hours ago',
      icon: UtensilsCrossed,
      color: 'text-green-600'
    },
    {
      id: '002',
      type: 'ride',
      title: 'Okada ride to Victoria Island',
      status: 'completed',
      amount: '₦800',
      time: '5 hours ago',
      icon: Car,
      color: 'text-blue-600'
    },
    {
      id: '003',
      type: 'shopping',
      title: 'Samsung Galaxy Phone',
      status: 'in_escrow',
      amount: '₦85,000',
      time: '1 day ago',
      icon: ShoppingBag,
      color: 'text-orange-600'
    }
  ];

  const quickActions = [
    { icon: Car, label: 'Book Ride', href: '/book-ride', color: 'bg-blue-500' },
    { icon: UtensilsCrossed, label: 'Order Food', href: '/order-food', color: 'bg-green-500' },
    { icon: Building, label: 'Find Apartment', href: '/apartments', color: 'bg-cyan-500' },
    { icon: ShoppingBag, label: 'Shop Now', href: '/shop', color: 'bg-orange-500' },
    { icon: Wrench, label: 'Auto Service', href: '/auto-service', color: 'bg-gray-500' },
    { icon: MessageCircle, label: 'Support', href: '/support', color: 'bg-purple-500' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_escrow':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout userType="user" userName="John Doe" userAvatar="/api/placeholder/32/32">
      <div className="space-y-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
              <Wallet className="h-4 w-4 text-[#043873]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#043873]">₦45,230</div>
              <p className="text-xs text-muted-foreground">
                +₦2,500 from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingBag className="h-4 w-4 text-[#0521f5]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0521f5]">47</div>
              <p className="text-xs text-muted-foreground">
                +3 from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Rides</CardTitle>
              <Car className="h-4 w-4 text-[#e95d08]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#e95d08]">23</div>
              <p className="text-xs text-muted-foreground">
                +5 from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Trust Score</CardTitle>
              <Star className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">4.9</div>
              <Progress value={98} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>What would you like to do today?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center space-y-2 hover:shadow-md transition-shadow"
                  asChild
                >
                  <a href={action.href}>
                    <div className={`p-2 rounded-lg ${action.color}`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs font-medium">{action.label}</span>
                  </a>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Your latest transactions and services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg bg-gray-100`}>
                        <order.icon className={`w-5 h-5 ${order.color}`} />
                      </div>
                      <div>
                        <div className="font-medium">{order.title}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {order.time}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{order.amount}</div>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Orders
              </Button>
            </CardContent>
          </Card>

          {/* Trust & Support */}
          <Card>
            <CardHeader>
              <CardTitle>Trust & Support</CardTitle>
              <CardDescription>Your safety and satisfaction matter</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-[#043873]/10 to-[#0521f5]/10 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Escrow Protection</span>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <p className="text-sm text-gray-600">
                  ₦87,500 currently protected in escrow
                </p>
              </div>

              <div className="space-y-3">
                <Button className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-white">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat with Support via WhatsApp
                </Button>
                <Button variant="outline" className="w-full">
                  Report an Issue
                </Button>
                <Button variant="outline" className="w-full">
                  View Trust Guidelines
                </Button>
              </div>

              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <div className="font-semibold text-lg">4.9/5.0</div>
                <div className="text-sm text-gray-600">Your Trust Score</div>
                <Progress value={98} className="mt-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
