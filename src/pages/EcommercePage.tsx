import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search,
  Filter,
  Star,
  MessageCircle,
  ShoppingBag,
  Briefcase,
  Users,
  MapPin,
  Clock,
  Shield,
  ChevronDown,
  Heart,
  Share2,
  Eye,
  Smartphone,
  Laptop,
  Headphones,
  Watch,
  Camera,
  Gamepad2,
  Home,
  Shirt,
  Car,
  Book,
  Dumbbell,
  Palette,
  Menu
} from 'lucide-react';

const EcommercePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('products');
  const [selectedProductCategory, setSelectedProductCategory] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const productCategories = [
    { id: 'all', name: 'All Products', icon: ShoppingBag },
    { id: 'electronics', name: 'Electronics', icon: Smartphone },
    { id: 'computers', name: 'Computers & Laptops', icon: Laptop },
    { id: 'audio', name: 'Audio & Headphones', icon: Headphones },
    { id: 'wearables', name: 'Smartwatches & Wearables', icon: Watch },
    { id: 'cameras', name: 'Cameras & Photography', icon: Camera },
    { id: 'gaming', name: 'Gaming & Entertainment', icon: Gamepad2 },
    { id: 'home', name: 'Home & Kitchen', icon: Home },
    { id: 'fashion', name: 'Fashion & Clothing', icon: Shirt },
    { id: 'automotive', name: 'Automotive', icon: Car },
    { id: 'books', name: 'Books & Education', icon: Book },
    { id: 'sports', name: 'Sports & Fitness', icon: Dumbbell },
    { id: 'art', name: 'Art & Crafts', icon: Palette },
  ];

  const sampleProducts = [
    {
      id: 1,
      title: 'Samsung Galaxy A54',
      category: 'Electronics',
      price: '₦185,000',
      location: 'Lagos, VI',
      rating: 4.8,
      reviews: 24,
      vendor: 'TechHub Store',
      image: '/api/placeholder/300/200',
      isVerified: true,
      postedTime: '2 hours ago',
      description: 'Brand new Samsung Galaxy A54 with warranty',
      productCategory: 'electronics'
    },
    {
      id: 2,
      title: 'Traditional Jollof Rice',
      category: 'Food',
      price: '₦2,500',
      location: 'Ibadan, Oyo',
      rating: 4.9,
      reviews: 156,
      vendor: 'Mama Kemi Kitchen',
      image: '/api/placeholder/300/200',
      isVerified: true,
      postedTime: '30 minutes ago',
      description: 'Delicious homemade jollof rice with chicken',
      productCategory: 'food'
    },
    {
      id: 3,
      title: 'Toyota Camry 2018',
      category: 'Vehicles',
      price: '₦8,500,000',
      location: 'Abuja, FCT',
      rating: 4.6,
      reviews: 8,
      vendor: 'AutoMart Dealers',
      image: '/api/placeholder/300/200',
      isVerified: true,
      postedTime: '1 day ago',
      description: 'Clean Toyota Camry 2018 model, first body',
      productCategory: 'automotive'
    },
    {
      id: 4,
      title: 'MacBook Pro M2',
      category: 'Electronics',
      price: '₦1,200,000',
      location: 'Lagos, Ikeja',
      rating: 4.9,
      reviews: 45,
      vendor: 'Apple Store NG',
      image: '/api/placeholder/300/200',
      isVerified: true,
      postedTime: '1 hour ago',
      description: 'Latest MacBook Pro with M2 chip, 512GB storage',
      productCategory: 'computers'
    },
    {
      id: 5,
      title: 'Sony WH-1000XM4',
      category: 'Electronics',
      price: '₦95,000',
      location: 'Port Harcourt, Rivers',
      rating: 4.8,
      reviews: 67,
      vendor: 'Audio Plus',
      image: '/api/placeholder/300/200',
      isVerified: true,
      postedTime: '3 hours ago',
      description: 'Noise-cancelling wireless headphones',
      productCategory: 'audio'
    }
  ];

  const sampleServices = [
    {
      id: 1,
      title: 'Event Planning & Decoration',
      category: 'Event Services',
      price: 'From ₦50,000',
      location: 'Lagos, Nigeria',
      rating: 4.9,
      reviews: 67,
      vendor: 'Elite Events Co.',
      image: '/api/placeholder/300/200',
      isVerified: true,
      postedTime: '1 hour ago',
      description: 'Complete event planning and decoration services'
    },
    {
      id: 2,
      title: 'Home Cleaning Service',
      category: 'Home Services',
      price: '₦8,000/visit',
      location: 'Port Harcourt, Rivers',
      rating: 4.7,
      reviews: 134,
      vendor: 'CleanPro Services',
      image: '/api/placeholder/300/200',
      isVerified: true,
      postedTime: '3 hours ago',
      description: 'Professional home cleaning and maintenance'
    },
    {
      id: 3,
      title: 'Plumbing & Electrical',
      category: 'Home Services',
      price: '₦5,000 - ₦25,000',
      location: 'Kano, Kano',
      rating: 4.5,
      reviews: 89,
      vendor: 'FixIt Masters',
      image: '/api/placeholder/300/200',
      isVerified: true,
      postedTime: '5 hours ago',
      description: 'Expert plumbing and electrical repairs'
    }
  ];

  const sampleJobs = [
    {
      id: 1,
      title: 'Graphic Designer Needed',
      category: 'Design',
      price: '₦15,000 - ₦30,000',
      location: 'Remote',
      rating: 4.8,
      reviews: 12,
      vendor: 'Creative Agency Ltd',
      image: '/api/placeholder/300/200',
      isVerified: true,
      postedTime: '2 hours ago',
      description: 'Looking for a creative graphic designer for brand projects'
    },
    {
      id: 2,
      title: 'Content Writer',
      category: 'Writing',
      price: '₦20,000/month',
      location: 'Lagos, Nigeria',
      rating: 4.6,
      reviews: 28,
      vendor: 'Marketing Hub',
      image: '/api/placeholder/300/200',
      isVerified: true,
      postedTime: '4 hours ago',
      description: 'Part-time content writer for digital marketing'
    },
    {
      id: 3,
      title: 'Web Developer',
      category: 'Technology',
      price: '₦80,000 - ₦150,000',
      location: 'Abuja, FCT',
      rating: 4.9,
      reviews: 45,
      vendor: 'TechStart Solutions',
      image: '/api/placeholder/300/200',
      isVerified: true,
      postedTime: '6 hours ago',
      description: 'Full-time web developer position available'
    }
  ];

  const handleWhatsAppContact = (item: any) => {
    const message = `Hi! I'm interested in "${item.title}" listed for ${item.price}. Can you provide more details?`;
    const whatsappUrl = `https://wa.me/2348000000000?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const filteredProducts = selectedProductCategory === 'all' 
    ? sampleProducts 
    : sampleProducts.filter(product => product.productCategory === selectedProductCategory);

  const ProductCard = ({ item }: { item: any }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 overflow-hidden">
      <div className="relative">
        <img 
          src={item.image} 
          alt={item.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <Button size="sm" variant="ghost" className="w-8 h-8 p-0 bg-white/80 hover:bg-white">
            <Heart className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" className="w-8 h-8 p-0 bg-white/80 hover:bg-white">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
        {item.isVerified && (
          <Badge className="absolute top-3 left-3 bg-green-500 hover:bg-green-500">
            <Shield className="w-3 h-3 mr-1" />
            Verified
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-xs">
            {item.category}
          </Badge>
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">{item.rating}</span>
            <span className="text-xs text-gray-500">({item.reviews})</span>
          </div>
        </div>
        
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{item.title}</h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="text-xl font-bold text-[#043873]">{item.price}</div>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-3 h-3 mr-1" />
            {item.location}
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Avatar className="w-6 h-6">
              <AvatarFallback className="bg-[#043873] text-white text-xs">
                {item.vendor.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{item.vendor}</span>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <Clock className="w-3 h-3 mr-1" />
            {item.postedTime}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            className="flex-1 bg-[#25D366] hover:bg-[#25D366]/90 text-white"
            onClick={() => handleWhatsAppContact(item)}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Contact via WhatsApp
          </Button>
          <Button variant="outline" size="sm" className="px-3">
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const CategorySidebar = () => (
    <div className={`fixed lg:relative inset-y-0 left-0 z-50 w-64 bg-white border-r transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out lg:block`}>
      <div className="p-4 border-b">
        <h3 className="font-semibold text-lg text-[#043873]">Categories</h3>
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden absolute top-4 right-4"
          onClick={() => setSidebarOpen(false)}
        >
          ×
        </Button>
      </div>
      <div className="p-4 space-y-2">
        {productCategories.map((category) => {
          const IconComponent = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => {
                setSelectedProductCategory(category.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                selectedProductCategory === category.id
                  ? 'bg-[#043873] text-white'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <IconComponent className="w-5 h-5" />
              <span className="text-sm font-medium">{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#043873] to-[#0521f5] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">McDoc Marketplace</h1>
            <p className="text-xl text-white/90 mb-8">
              Buy, Sell, Hire - Everything you need in one trusted platform
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search products, services, or jobs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-3 text-lg bg-white border-0"
                  />
                </div>
                <Button className="bg-[#e95d08] hover:bg-[#e95d08]/90 px-6">
                  <Search className="w-5 h-5" />
                </Button>
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <Filter className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 bg-white border">
            <TabsTrigger 
              value="products" 
              className="flex items-center space-x-2 data-[state=active]:bg-[#043873] data-[state=active]:text-white"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Products</span>
            </TabsTrigger>
            <TabsTrigger 
              value="services"
              className="flex items-center space-x-2 data-[state=active]:bg-[#043873] data-[state=active]:text-white"
            >
              <Briefcase className="w-4 h-4" />
              <span>Services</span>
            </TabsTrigger>
            <TabsTrigger 
              value="jobs"
              className="flex items-center space-x-2 data-[state=active]:bg-[#043873] data-[state=active]:text-white"
            >
              <Users className="w-4 h-4" />
              <span>Jobs</span>
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex lg:hidden items-center justify-between mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-4 h-4 mr-2" />
                Categories
              </Button>
            </div>

            <div className="flex gap-6">
              <CategorySidebar />
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-[#043873]">
                    {selectedProductCategory === 'all' ? 'All Products' : productCategories.find(cat => cat.id === selectedProductCategory)?.name}
                  </h2>
                  <div className="flex items-center space-x-4">
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </Button>
                    <span className="text-sm text-gray-600">{filteredProducts.length} products found</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} item={product} />
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#043873]">Browse Services</h2>
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
                <span className="text-sm text-gray-600">{sampleServices.length} services found</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleServices.map((service) => (
                <ProductCard key={service.id} item={service} />
              ))}
            </div>
          </TabsContent>

          {/* Jobs Tab */}
          <TabsContent value="jobs" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#043873]">Browse Jobs</h2>
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
                <span className="text-sm text-gray-600">{sampleJobs.length} jobs found</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleJobs.map((job) => (
                <ProductCard key={job.id} item={job} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Trust Section */}
        <div className="mt-16 bg-gradient-to-r from-[#043873] to-[#0521f5] rounded-3xl p-8 text-white text-center">
          <Shield className="w-16 h-16 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">Protected by Escrow</h3>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Every transaction is protected. Your payment is held securely until you confirm receipt of your order or service. 
            Only then does the vendor get paid - protecting you completely.
          </p>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default EcommercePage;
