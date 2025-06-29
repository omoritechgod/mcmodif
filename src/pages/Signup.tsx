import React, { useState } from 'react';
import { ArrowLeft, User, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SignupForm from '../components/auth/SignupForm';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'user' | 'vendor'>('user');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div className="text-2xl font-bold text-blue-600">McDee</div>
            </div>
            
            <div className="text-sm text-gray-600">
              Already have an account?{' '}
              <button 
                onClick={() => navigate('/login')}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Join McDee Today
          </h1>
          <p className="text-lg text-gray-600">
            Create your account and start connecting with trusted service providers
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('user')}
              className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                activeTab === 'user'
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <User size={20} />
                <span>I'm a Customer</span>
              </div>
              <div className="text-xs mt-1 opacity-75">
                Book services and shop products
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('vendor')}
              className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                activeTab === 'vendor'
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Building size={20} />
                <span>I'm a Vendor</span>
              </div>
              <div className="text-xs mt-1 opacity-75">
                Offer services and sell products
              </div>
            </button>
          </div>

          {/* Form Content */}
          <div className="p-8">
            {activeTab === 'vendor' && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="text-amber-600 mt-1">⚠️</div>
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-1">Vendor Account Verification</h4>
                    <p className="text-amber-700 text-sm leading-relaxed">
                      Your vendor account will need to be verified before you can start listing services or products. 
                      This process typically takes 24-48 hours and helps ensure the safety and trust of our platform.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <SignupForm userType={activeTab} />
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-2">Why Choose McDee?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div>
                <div className="text-2xl mb-2">🔒</div>
                <div className="font-medium">Secure Escrow</div>
                <div>Protected transactions</div>
              </div>
              <div>
                <div className="text-2xl mb-2">✅</div>
                <div className="font-medium">Verified Vendors</div>
                <div>Trusted service providers</div>
              </div>
              <div>
                <div className="text-2xl mb-2">📱</div>
                <div className="font-medium">Easy to Use</div>
                <div>Simple and intuitive</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;