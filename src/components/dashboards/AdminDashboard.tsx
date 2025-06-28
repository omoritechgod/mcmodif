
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import DashboardLayout from '../dashboardLayout/DashboardLayout';
import { 
  Users,
  ShoppingBag,
  DollarSign,
  AlertTriangle,
  TrendingUp,
  MessageCircle,
  Shield,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  BarChart3
} from 'lucide-react';

const AdminDashboard = () => {
  const pendingApprovals = [
    {
      id: '001',
      type: 'Vendor',
      name: 'Mama Tolu Kitchen',
      category: 'Food Service',
      status: 'pending_verification',
      requestDate: '2 hours ago'
    },
    {
      id: '002',
      type: 'Product',
      name: 'iPhone 15 Pro Max',
      vendor: 'TechHub Lagos',
      status: 'pending_approval',
      requestDate: '5 hours ago'
    },
    {
      id: '003',
      type: 'Mechanic',
      name: 'AutoFix Garage',
      location: 'Ikeja, Lagos',
      status: 'pending_verification',
      requestDate: '1 day ago'
    }
  ];

  const recentDisputes = [
    {
      id: '#D001',
      type: 'Order Issue',
      customer: 'John D.',
      vendor: 'Mama Kemi Foods',
      amount: '₦2,500',
      status: 'open',
      priority: 'high'
    },
    {
      id: '#D002',
      type: 'Payment Dispute',
      customer: 'Mary K.',
      vendor: 'TechHub Lagos',
      amount: '₦85,000',
      status: 'investigating',
      priority: 'critical'
    }
  ];

  const systemMetrics = [
    { label: 'Server Uptime', value: 99.9, color: 'text-green-600' },
    { label: 'Payment Success Rate', value: 98.5, color: 'text-blue-600' },
    { label: 'User Satisfaction', value: 94.2, color: 'text-purple-600' },
    { label: 'Escrow Processing', value: 97.8, color: 'text-orange-600' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'pending_verification':
      case 'pending_approval':
      case 'open':
        return 'bg-yellow-100 text-yellow-800';
      case 'investigating':
        return 'bg-blue-100 text-blue-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout userType="admin" userName="Admin User" userAvatar="/api/placeholder/32/32">
      <div className="space-y-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-[#043873]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#043873]">12,458</div>
              <p className="text-xs text-muted-foreground">
                +234 from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Vendors</CardTitle>
              <ShoppingBag className="h-4 w-4 text-[#0521f5]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0521f5]">1,247</div>
              <p className="text-xs text-muted-foreground">
                +45 from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-[#e95d08]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#e95d08]">₦15.2M</div>
              <p className="text-xs text-muted-foreground">
                +₦1.2M from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Disputes</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">8</div>
              <p className="text-xs text-muted-foreground">
                -3 from last week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Admin Controls</CardTitle>
            <CardDescription>Platform management and oversight</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-[#043873] hover:bg-[#043873]/90">
                <Users className="w-6 h-6" />
                <span className="text-xs">User Management</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                <ShoppingBag className="w-6 h-6" />
                <span className="text-xs">Vendor Approval</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                <Shield className="w-6 h-6" />
                <span className="text-xs">Dispute Resolution</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                <DollarSign className="w-6 h-6" />
                <span className="text-xs">Payment Management</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                <BarChart3 className="w-6 h-6" />
                <span className="text-xs">Analytics</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                <MessageCircle className="w-6 h-6" />
                <span className="text-xs">Support Chat</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Pending Approvals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Pending Approvals
                <Badge variant="outline">{pendingApprovals.length}</Badge>
              </CardTitle>
              <CardDescription>Items awaiting your review</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingApprovals.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-500">
                        {item.type} • {item.category || item.vendor || item.location}
                      </div>
                      <div className="text-xs text-gray-400 flex items-center mt-1">
                        <Clock className="w-3 h-3 mr-1" />
                        {item.requestDate}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(item.status)}>
                        {item.status.replace('_', ' ')}
                      </Badge>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="outline" className="text-green-600 hover:bg-green-50">
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50">
                          <XCircle className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Pending Items
              </Button>
            </CardContent>
          </Card>

          {/* Recent Disputes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Disputes
                <Badge variant="destructive">{recentDisputes.length}</Badge>
              </CardTitle>
              <CardDescription>Issues requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDisputes.map((dispute) => (
                  <div key={dispute.id} className="flex items-center justify-between p-4 rounded-lg border border-red-100 bg-red-50/50">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium">{dispute.id}</span>
                        <Badge className={getPriorityColor(dispute.priority)}>
                          {dispute.priority}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">{dispute.type}</div>
                      <div className="text-xs text-gray-500">
                        {dispute.customer} vs {dispute.vendor} • {dispute.amount}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(dispute.status)}>
                        {dispute.status}
                      </Badge>
                      <Button size="sm" className="bg-[#043873] hover:bg-[#043873]/90">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Disputes
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle>System Health & Metrics</CardTitle>
            <CardDescription>Real-time platform performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {systemMetrics.map((metric, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className={`font-semibold text-2xl ${metric.color}`}>
                    {metric.value}%
                  </div>
                  <div className="text-sm text-gray-600 mb-2">{metric.label}</div>
                  <Progress value={metric.value} />
                </div>
              ))}
            </div>

            <div className="mt-8 grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-[#043873]/10 to-[#0521f5]/10 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Escrow Balance</span>
                  <Shield className="w-5 h-5 text-[#043873]" />
                </div>
                <div className="text-2xl font-bold text-[#043873]">₦2.8M</div>
                <p className="text-sm text-gray-600">
                  Funds protected in escrow
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Active Transactions</span>
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-700">1,247</div>
                <p className="text-sm text-green-600">
                  Currently being processed
                </p>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Support Tickets</span>
                  <MessageCircle className="w-5 h-5 text-orange-600" />
                </div>
                <div className="text-2xl font-bold text-orange-700">43</div>
                <p className="text-sm text-orange-600">
                  Open support requests
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
