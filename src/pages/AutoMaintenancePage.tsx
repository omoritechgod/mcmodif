
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  MapPin, 
  Wrench, 
  Car, 
  Truck, 
  Phone, 
  Star, 
  Clock, 
  DollarSign,
  AlertTriangle,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AutoMaintenancePage = () => {
  const [activeTab, setActiveTab] = useState('report');
  const [selectedMechanic, setSelectedMechanic] = useState(null);
  const [needsTow, setNeedsTow] = useState('no');
  const [faultDescription, setFaultDescription] = useState('');
  const [location, setLocation] = useState('');

  const mechanics = [
    {
      id: 1,
      name: "AutoFix Garage",
      rating: 4.8,
      reviews: 124,
      distance: "0.5 km",
      specialties: ["Engine Repair", "Oil Change", "Brake Service"],
      price: "₦15,000 - ₦50,000",
      available: true,
      phone: "+234 801 234 5678",
      address: "123 Main Street, Victoria Island"
    },
    {
      id: 2,
      name: "Quick Service Motors",
      rating: 4.6,
      reviews: 89,
      distance: "1.2 km",
      specialties: ["Transmission", "AC Repair", "Diagnostics"],
      price: "₦10,000 - ₦40,000",
      available: true,
      phone: "+234 802 345 6789",
      address: "456 Lagos Street, Ikeja"
    },
    {
      id: 3,
      name: "Pro Mechanics Ltd",
      rating: 4.9,
      reviews: 203,
      distance: "2.1 km",
      specialties: ["Electrical", "Body Work", "Towing"],
      price: "₦20,000 - ₦80,000",
      available: false,
      phone: "+234 803 456 7890",
      address: "789 Repair Avenue, Surulere"
    }
  ];

  const handleSubmitRequest = () => {
    if (!faultDescription || !location) {
      alert('Please fill in all required fields');
      return;
    }
    setActiveTab('mechanics');
  };

  const handleSelectMechanic = (mechanic) => {
    setSelectedMechanic(mechanic);
    setActiveTab('payment');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="mr-4">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-[#043873]">Auto Maintenance</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center ${activeTab === 'report' ? 'text-[#043873]' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeTab === 'report' ? 'bg-[#043873] text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span className="ml-2 font-medium">Report Issue</span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div className={`flex items-center ${activeTab === 'mechanics' ? 'text-[#043873]' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeTab === 'mechanics' ? 'bg-[#043873] text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="ml-2 font-medium">Find Mechanic</span>
            </div>
            <div className="w-8 h-px bg-gray-300"></div>
            <div className={`flex items-center ${activeTab === 'payment' ? 'text-[#043873]' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeTab === 'payment' ? 'bg-[#043873] text-white' : 'bg-gray-200'}`}>
                3
              </div>
              <span className="ml-2 font-medium">Payment</span>
            </div>
          </div>
        </div>

        {/* Fault Reporting */}
        {activeTab === 'report' && (
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="w-6 h-6 mr-2 text-[#e95d08]" />
                  Report Your Vehicle Issue
                </CardTitle>
                <CardDescription>
                  Describe your vehicle problem and we'll connect you with nearby mechanics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="location">Your Location *</Label>
                  <Input
                    id="location"
                    placeholder="Enter your current location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="fault">Describe the Problem *</Label>
                  <Textarea
                    id="fault"
                    placeholder="Describe what's wrong with your vehicle (e.g., engine won't start, strange noise, overheating)"
                    value={faultDescription}
                    onChange={(e) => setFaultDescription(e.target.value)}
                    rows={4}
                  />
                </div>

                <div>
                  <Label>Do you need towing service?</Label>
                  <RadioGroup value={needsTow} onValueChange={setNeedsTow} className="mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="no-tow" />
                      <Label htmlFor="no-tow">No, I can drive to the garage</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="yes-tow" />
                      <Label htmlFor="yes-tow">Yes, I need towing service</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-[#043873] mb-2">Service Information</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Commitment fee: ₦5,000 (required to process request)</li>
                    <li>• 50% refund available if service is not used</li>
                    <li>• Final service charge agreed with mechanic</li>
                  </ul>
                </div>

                <Button 
                  onClick={handleSubmitRequest}
                  className="w-full bg-[#043873] hover:bg-[#0521f5]"
                  disabled={!faultDescription || !location}
                >
                  Find Nearby Mechanics
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Nearby Mechanics */}
        {activeTab === 'mechanics' && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#043873] mb-2">Available Mechanics Near You</h2>
              <p className="text-gray-600">Choose a mechanic based on proximity, rating, and specialization</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mechanics.map((mechanic) => (
                <Card key={mechanic.id} className={`${!mechanic.available ? 'opacity-60' : ''}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{mechanic.name}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="ml-1 text-sm font-medium">{mechanic.rating}</span>
                          </div>
                          <span className="text-sm text-gray-500">({mechanic.reviews} reviews)</span>
                        </div>
                      </div>
                      {mechanic.available ? (
                        <Badge className="bg-green-100 text-green-800">Available</Badge>
                      ) : (
                        <Badge variant="secondary">Busy</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {mechanic.distance} away
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium mb-1">Specialties:</p>
                        <div className="flex flex-wrap gap-1">
                          {mechanic.specialties.map((specialty, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center text-sm">
                        <DollarSign className="w-4 h-4 mr-2 text-[#e95d08]" />
                        <span className="font-medium">{mechanic.price}</span>
                      </div>

                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="w-4 h-4 mr-2" />
                        {mechanic.phone}
                      </div>

                      <p className="text-xs text-gray-500">{mechanic.address}</p>

                      {needsTow === 'yes' && mechanic.specialties.includes('Towing') && (
                        <div className="flex items-center text-sm text-green-600">
                          <Truck className="w-4 h-4 mr-2" />
                          Towing service available
                        </div>
                      )}

                      <Button 
                        onClick={() => handleSelectMechanic(mechanic)}
                        disabled={!mechanic.available}
                        className="w-full"
                        variant={mechanic.available ? "default" : "secondary"}
                      >
                        {mechanic.available ? 'Select Mechanic' : 'Not Available'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Payment Flow */}
        {activeTab === 'payment' && selectedMechanic && (
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
                  Confirm Service Request
                </CardTitle>
                <CardDescription>
                  Review your selection and make the commitment payment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Selected Mechanic</h4>
                  <div className="space-y-2">
                    <p className="font-medium">{selectedMechanic.name}</p>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm">{selectedMechanic.rating} ({selectedMechanic.reviews} reviews)</span>
                    </div>
                    <p className="text-sm text-gray-600">{selectedMechanic.address}</p>
                    <p className="text-sm">{selectedMechanic.phone}</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Service Details</h4>
                  <div className="space-y-2">
                    <p className="text-sm"><span className="font-medium">Location:</span> {location}</p>
                    <p className="text-sm"><span className="font-medium">Issue:</span> {faultDescription}</p>
                    <p className="text-sm"><span className="font-medium">Towing needed:</span> {needsTow === 'yes' ? 'Yes' : 'No'}</p>
                    <p className="text-sm"><span className="font-medium">Estimated cost:</span> {selectedMechanic.price}</p>
                  </div>
                </div>

                <div className="border-2 border-[#e95d08] bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-[#e95d08] mb-2">Payment Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Commitment Fee:</span>
                      <span className="font-medium">₦5,000</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      <p>• Required to process your request</p>
                      <p>• 50% refundable if service is not used</p>
                      <p>• Final service charge will be agreed with mechanic</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab('mechanics')}
                  >
                    Go Back
                  </Button>
                  <Button className="bg-[#043873] hover:bg-[#0521f5]">
                    Pay ₦5,000 & Submit Request
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AutoMaintenancePage;
