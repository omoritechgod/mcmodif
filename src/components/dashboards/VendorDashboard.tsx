
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import DashboardLayout from '../dashboardLayout/DashboardLayout';
import { 
  DollarSign,
  ShoppingBag,
  Eye,
  Star,
  TrendingUp,
  Users,
  Package,
  Clock,
  MessageCircle,
  Plus,
  Edit,
  BarChart3
} from 'lucide-react';

const VendorDashboard = () => {
  const recentProducts = [
    {
      id: '001',
      name: 'Traditional Jollof Rice',
      category: 'Food',
      price: '₦2,500',
      status: 'active',
      orders: 23,
      rating: 4.8
    },
    {
      id: '002', 
      name: 'Samsung Galaxy A54',
      category: 'Electronics',
      price: '₦185,000',
      status: 'pending_approval',
      orders: 5,
      rating: 4.9
    },
    {
      id: '003',
      name: 'Event Planning Service',
      category: 'Services',
      price: '₦50,000',
      status: 'active',
      orders: 12,
      rating: 4.7
    }
  ];

  const recentOrders = [
    {
      id: '#12345',
      customer: 'John D.',
      product: 'Jollof Rice',
      amount: '₦2,500',
      status: 'in_escrow',
      time: '2 hours ago'
    },
    {
      id: '#12344',
      customer: 'Mary K.',
      product: 'Event Planning',
      amount: '₦50,000',
      status: 'completed',
      time: '5 hours ago'
    },
    {
      id: '#12343',
      customer: 'Paul O.',
      product: 'Samsung Phone',
      amount: '₦185,000',
      status: 'pending_payment',
      time: '1 day ago'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending_approval':
      case 'in_escrow':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending_payment':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout userType="vendor" userName="Mama Kemi Foods" userAvatar="/api/placeholder/32/32">
      <div className="space-y-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-[#043873]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#043873]">₦245,600</div>
              <p className="text-xs text-muted-foreground">
                +₦15,400 from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Products</CardTitle>
              <ShoppingBag className="h-4 w-4 text-[#0521f5]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0521f5]">23</div>
              <p className="text-xs text-muted-foreground">
                +2 from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <Package className="h-4 w-4 text-[#e95d08]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#e95d08]">156</div>
              <p className="text-xs text-muted-foreground">
                +12 from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">4.8</div>
              <Progress value={96} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your business efficiently</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-[#043873] hover:bg-[#043873]/90">
                <Plus className="w-6 h-6" />
                <span className="text-xs">Add Product</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                <Edit className="w-6 h-6" />
                <span className="text-xs">Edit Listings</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                <BarChart3 className="w-6 h-6" />
                <span className="text-xs">View Analytics</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                <MessageCircle className="w-6 h-6" />
                <span className="text-xs">Customer Support</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Products */}
          <Card>
            <CardHeader>
              <CardTitle>Your Products</CardTitle>
              <CardDescription>Manage your listings and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex-1">
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.category}</div>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-sm font-semibold">{product.price}</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs">{product.rating}</span>
                        </div>
                        <span className="text-xs text-gray-500">{product.orders} orders</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(product.status)}>
                        {product.status.replace('_', ' ')}
                      </Badge>
                      <Button variant="ghost" size="sm" className="mt-2">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Products
              </Button>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Track your sales and payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <div className="font-medium">{order.id}</div>
                      <div className="text-sm text-gray-500">{order.customer} • {order.product}</div>
                      <div className="text-xs text-gray-400 flex items-center mt-1">
                        <Clock className="w-3 h-3 mr-1" />
                        {order.time}
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
        </div>

        {/* Performance & Trust */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
              <CardDescription>Your business metrics this month</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-[#043873]/10 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-[#043873] mx-auto mb-2" />
                  <div className="font-semibold text-lg">+24%</div>
                  <div className="text-sm text-gray-600">Sales Growth</div>
                </div>
                <div className="text-center p-4 bg-[#0521f5]/10 rounded-lg">
                  <Users className="w-8 h-8 text-[#0521f5] mx-auto mb-2" />
                  <div className="font-semibold text-lg">89</div>
                  <div className="text-sm text-gray-600">New Customers</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Order Completion Rate</span>
                    <span>96%</span>
                  </div>
                  <Progress value={96} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Customer Satisfaction</span>
                    <span>94%</span>
                  </div>
                  <Progress value={94} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Response Time</span>
                    <span>98%</span>
                  </div>
                  <Progress value={98} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Escrow & Payments</CardTitle>
              <CardDescription>Your protected transactions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">In Escrow</span>
                  <Badge className="bg-yellow-100 text-yellow-800">Pending Release</Badge>
                </div>
                <div className="text-2xl font-bold text-green-700">₦67,500</div>
                <p className="text-sm text-green-600">
                  From 12 orders awaiting customer confirmation
                </p>
              </div>

              <div className="space-y-3">
                <Button className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-white">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact Support via WhatsApp
                </Button>
                <Button variant="outline" className="w-full">
                  View Payment History
                </Button>
                <Button variant="outline" className="w-full">
                  Request Payout
                </Button>
              </div>

              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="font-semibold text-lg text-[#043873]">Verified Vendor</div>
                <div className="text-sm text-gray-600">Trust Level: Premium</div>
                <Progress value={95} className="mt-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default VendorDashboard;
