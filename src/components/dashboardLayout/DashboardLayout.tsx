
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  LayoutDashboard,
  Wallet,
  ShoppingBag,
  Car,
  UtensilsCrossed,
  Building,
  Wrench,
  Users,
  Settings,
  Bell,
  MessageCircle,
  Star,
  TrendingUp,
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  Menu,
  X,
  LogOut,
  Package,
  Shield,
  Navigation,
  Truck
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userType: 'user' | 'vendor' | 'rider' | 'admin' | 'delivery';
  userName: string;
  userAvatar?: string;
}

const DashboardLayout = ({ children, userType, userName, userAvatar }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const getNavItems = () => {
    const common = [
      { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
      { icon: Wallet, label: 'Wallet', href: '/wallet' },
    ];

    switch (userType) {
      case 'user':
        return [
          ...common,
          { icon: Car, label: 'My Rides', href: '/rides' },
          { icon: UtensilsCrossed, label: 'Food Orders', href: '/food' },
          { icon: Building, label: 'Apartments', href: '/apartments' },
          { icon: ShoppingBag, label: 'Shopping', href: '/shopping' },
          { icon: Wrench, label: 'Auto Services', href: '/auto' },
          { icon: Settings, label: 'Settings', href: '/settings' },
        ];
      case 'vendor':
        return [
          ...common,
          { icon: ShoppingBag, label: 'My Products', href: '/products' },
          { icon: TrendingUp, label: 'Analytics', href: '/analytics' },
          { icon: Star, label: 'Reviews', href: '/reviews' },
          { icon: Settings, label: 'Settings', href: '/settings' },
        ];
      case 'rider':
        return [
          ...common,
          { icon: Car, label: 'Active Rides', href: '/active-rides' },
          { icon: MapPin, label: 'Go Online', href: '/online' },
          { icon: Navigation, label: 'Live Map', href: '/map' },
          { icon: TrendingUp, label: 'Earnings', href: '/earnings' },
          { icon: Star, label: 'Ratings', href: '/ratings' },
          { icon: Settings, label: 'Settings', href: '/settings' },
        ];
      case 'delivery':
        return [
          ...common,
          { icon: Package, label: 'Delivery Queue', href: '/queue' },
          { icon: Truck, label: 'Active Deliveries', href: '/active' },
          { icon: Shield, label: 'Sealing Protocol', href: '/sealing' },
          { icon: Navigation, label: 'Routes', href: '/routes' },
          { icon: TrendingUp, label: 'Performance', href: '/performance' },
          { icon: Settings, label: 'Settings', href: '/settings' },
        ];
      case 'admin':
        return [
          ...common,
          { icon: Users, label: 'User Management', href: '/users' },
          { icon: ShoppingBag, label: 'Vendor Management', href: '/vendors' },
          { icon: TrendingUp, label: 'Analytics', href: '/analytics' },
          { icon: MessageCircle, label: 'Support', href: '/support' },
          { icon: Shield, label: 'Disputes', href: '/disputes' },
          { icon: Settings, label: 'Settings', href: '/settings' },
        ];
      default:
        return common;
    }
  };

  const getUserTypeDisplay = () => {
    switch (userType) {
      case 'delivery':
        return 'Delivery Personnel';
      default:
        return userType.charAt(0).toUpperCase() + userType.slice(1);
    }
  };

  const navItems = getNavItems();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:inset-0
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-[#043873] to-[#0521f5] rounded-lg p-2 mr-3">
              <span className="text-white font-bold text-lg">McDoc</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={userAvatar} alt={userName} />
              <AvatarFallback className="bg-[#043873] text-white">
                {userName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold text-gray-900">{userName}</div>
              <Badge variant="outline" className="text-xs">
                {getUserTypeDisplay()}
              </Badge>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-[#043873] transition-colors"
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </a>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-200">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-700 hover:text-red-600"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden mr-4"
                  onClick={() => setIsSidebarOpen(true)}
                >
                  <Menu className="w-5 h-5" />
                </Button>
                <h1 className="text-2xl font-bold text-[#043873]">Dashboard</h1>
              </div>

              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="w-5 h-5" />
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-[#e95d08] text-white text-xs">
                    3
                  </Badge>
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
