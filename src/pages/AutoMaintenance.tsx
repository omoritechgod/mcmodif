import React, { useState } from 'react';
import { ArrowLeft, MapPin, Wrench, Star, Phone, MessageCircle, Clock, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AutoMaintenance: React.FC = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState('');
  const [carIssue, setCarIssue] = useState('');
  const [showMechanics, setShowMechanics] = useState(false);

  const serviceTypes = [
    { id: 'engine', name: 'Engine Repair', icon: '🔧', price: '₦15,000 - ₦50,000' },
    { id: 'brake', name: 'Brake Service', icon: '🛑', price: '₦8,000 - ₦25,000' },
    { id: 'oil', name: 'Oil Change', icon: '🛢️', price: '₦5,000 - ₦12,000' },
    { id: 'tire', name: 'Tire Service', icon: '🛞', price: '₦3,000 - ₦15,000' },
    { id: 'electrical', name: 'Electrical', icon: '⚡', price: '₦10,000 - ₦30,000' },
    { id: 'ac', name: 'AC Repair', icon: '❄️', price: '₦12,000 - ₦35,000' },
  ];

  const nearbyMechanics = [
    {
      id: 1,
      name: "Adebayo Auto Works",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200",
      rating: 4.8,
      completedJobs: 245,
      distance: "1.2 km",
      specialties: ["Engine Repair", "Brake Service", "Electrical"],
      responseTime: "15 min",
      isAvailable: true,
      verified: true,
      priceRange: "₦₦₦",
      contact: "+234 801 234 5678"
    },
    {
      id: 2,
      name: "Quick Fix Garage",
      image: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=200",
      rating: 4.6,
      completedJobs: 189,
      distance: "2.1 km",
      specialties: ["Oil Change", "Tire Service", "AC Repair"],
      responseTime: "25 min",
      isAvailable: true,
      verified: true,
      priceRange: "₦₦",
      contact: "+234 802 345 6789"
    },
    {
      id: 3,
      name: "Expert Motors",
      image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200",
      rating: 4.9,
      completedJobs: 312,
      distance: "0.8 km",
      specialties: ["Engine Repair", "Electrical", "Brake Service"],
      responseTime: "10 min",
      isAvailable: true,
      verified: true,
      priceRange: "₦₦₦₦",
      contact: "+234 803 456 7890"
    }
  ];

  const handleSubmitRequest = () => {
    if (selectedService && carIssue) {
      setShowMechanics(true);
    }
  };

  const handleContactMechanic = (mechanicId: number) => {
    // This would typically open a contact modal or redirect to chat
    console.log(`Contacting mechanic ${mechanicId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Auto Maintenance</h1>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <MapPin size={14} />
                  <span>Lagos, Nigeria</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {!showMechanics ? (
          <>
            {/* Service Request Form */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What's wrong with your car?</h2>
              
              {/* Service Types */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Service Type</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {serviceTypes.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setSelectedService(service.id)}
                      className={`p-4 rounded-xl border-2 transition-colors text-left ${
                        selectedService === service.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl mb-2">{service.icon}</div>
                      <div className="font-semibold text-gray-900 mb-1">{service.name}</div>
                      <div className="text-sm text-gray-600">{service.price}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Issue Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Describe the Issue</h3>
                <textarea
                  value={carIssue}
                  onChange={(e) => setCarIssue(e.target.value)}
                  placeholder="Please describe what's happening with your car in detail. The more information you provide, the better mechanics can help you."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Commitment Fee Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <DollarSign className="text-blue-600 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">₦5,000 Commitment Fee</h4>
                    <p className="text-blue-800 text-sm leading-relaxed">
                      A refundable commitment fee is required to connect with mechanics. 
                      This fee is partially refunded based on service completion and helps ensure serious inquiries.
                    </p>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleSubmitRequest}
                disabled={!selectedService || !carIssue}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-colors"
              >
                Find Nearby Mechanics (₦5,000 commitment fee)
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Available Mechanics */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Available Mechanics</h2>
                <button 
                  onClick={() => setShowMechanics(false)}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  ← Back to Request
                </button>
              </div>

              <div className="space-y-4">
                {nearbyMechanics.map((mechanic) => (
                  <div key={mechanic.id} className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <img 
                            src={mechanic.image} 
                            alt={mechanic.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          {mechanic.isAvailable && (
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-bold text-gray-900">{mechanic.name}</h3>
                            {mechanic.verified && (
                              <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold">
                                ✓ Verified
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-1">
                              <Star size={14} className="text-yellow-500 fill-current" />
                              <span>{mechanic.rating}</span>
                            </div>
                            <span>•</span>
                            <span>{mechanic.completedJobs} jobs completed</span>
                            <span>•</span>
                            <span>{mechanic.distance} away</span>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-1">
                              <Clock size={14} />
                              <span>Responds in {mechanic.responseTime}</span>
                            </div>
                            <span>•</span>
                            <span>Price range: {mechanic.priceRange}</span>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {mechanic.specialties.map((specialty, index) => (
                              <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex gap-2 mb-2">
                          <button 
                            onClick={() => handleContactMechanic(mechanic.id)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                          >
                            <MessageCircle size={16} />
                            Contact
                          </button>
                          <button className="border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            <Phone size={16} />
                          </button>
                        </div>
                        <div className="text-xs text-gray-500">
                          {mechanic.contact}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* How It Works */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">How Auto Maintenance Works</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl mb-2">1️⃣</div>
                  <div className="font-semibold mb-1">Contact Mechanic</div>
                  <div className="text-sm opacity-90">Choose and contact your preferred mechanic</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">2️⃣</div>
                  <div className="font-semibold mb-1">Get Quote</div>
                  <div className="text-sm opacity-90">Receive detailed quote and timeline</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">3️⃣</div>
                  <div className="font-semibold mb-1">Service & Pay</div>
                  <div className="text-sm opacity-90">Get your car fixed and pay securely</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AutoMaintenance;