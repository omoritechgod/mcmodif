import React, { useState } from 'react';
import { ArrowLeft, User, Building, Shield, CheckCircle, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SignupForm from '../components/auth/SignupForm';
import VendorDetailsForm from '../components/auth/VendorDetailsForm';
import VendorCategorySpecificForm from '../components/auth/VendorCategorySpecificForm';

type RegistrationStep = 'initial' | 'vendorDetails' | 'vendorCategorySpecific';

interface InitialRegistrationData {
  name: string;
  email: string;
  phone: string;
  password: string;
  user_type: 'user' | 'vendor';
}

interface VendorDetailsData {
  vendor_type: string;
  business_name: string;
  category: string;
}

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'user' | 'vendor'>('user');
  const [registrationStep, setRegistrationStep] = useState<RegistrationStep>('initial');
  const [initialRegistrationData, setInitialRegistrationData] = useState<InitialRegistrationData | null>(null);
  const [vendorDetailsData, setVendorDetailsData] = useState<VendorDetailsData | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInitialRegistrationSubmit = async (formData: any) => {
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const payload = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        user_type: formData.userType
      };

      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const result = await response.json();

      if (formData.userType === 'user') {
        setSuccessMessage('Registration successful! Please check your email for verification.');
        // Optionally redirect to login page after a delay
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        // Store initial registration data and move to vendor details step
        setInitialRegistrationData(payload);
        setRegistrationStep('vendorDetails');
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVendorDetailsSubmit = (vendorData: VendorDetailsData) => {
    setVendorDetailsData(vendorData);
    setRegistrationStep('vendorCategorySpecific');
  };

  const handleFinalVendorRegistrationSubmit = async (categorySpecificData: any) => {
    if (!initialRegistrationData || !vendorDetailsData) {
      setErrorMessage('Missing registration data. Please start over.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      let endpoint = '';
      let payload = {};

      // Determine endpoint and payload based on category
      switch (vendorDetailsData.category) {
        case 'mechanic':
          endpoint = '/api/vendor/mechanic/register';
          payload = {
            workshop_name: categorySpecificData.workshop_name,
            services_offered: categorySpecificData.services_offered,
            location: categorySpecificData.location,
            contact_number: categorySpecificData.contact_number
          };
          break;
        case 'product':
          endpoint = '/api/vendor/product-vendor/setup';
          payload = {
            contact_person: categorySpecificData.contact_person,
            store_address: categorySpecificData.store_address,
            store_phone: categorySpecificData.store_phone,
            store_email: categorySpecificData.store_email,
            store_description: categorySpecificData.store_description,
            logo: categorySpecificData.logo
          };
          break;
        case 'rider':
          endpoint = '/api/vendor/rider/complete-registration';
          payload = {
            vehicle_type: categorySpecificData.vehicle_type,
            license_number: categorySpecificData.license_number,
            experience_years: categorySpecificData.experience_years
          };
          break;
        case 'service-apartment':
          endpoint = '/api/vendor/service-apartment/setup';
          payload = {
            full_name: categorySpecificData.full_name,
            phone_number: categorySpecificData.phone_number,
            organization_name: categorySpecificData.organization_name,
            organization_address: categorySpecificData.organization_address,
            website: categorySpecificData.website,
            years_of_experience: categorySpecificData.years_of_experience
          };
          break;
        case 'service':
          endpoint = '/api/vendor/service-vendor/setup';
          payload = {
            service_name: categorySpecificData.service_name,
            description: categorySpecificData.description,
            location: categorySpecificData.location,
            phone: categorySpecificData.phone,
            email: categorySpecificData.email
          };
          break;
        default:
          throw new Error('Invalid vendor category');
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Vendor registration failed');
      }

      const result = await response.json();
      setSuccessMessage('Vendor registration completed successfully! Your account will be reviewed for verification before going live.');
      
      // Reset form after successful registration
      setTimeout(() => {
        setRegistrationStep('initial');
        setInitialRegistrationData(null);
        setVendorDetailsData(null);
        navigate('/login');
      }, 3000);

    } catch (error: any) {
      setErrorMessage(error.message || 'An error occurred during vendor registration');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToVendorDetails = () => {
    setRegistrationStep('vendorDetails');
    setErrorMessage('');
  };

  const handleBackToInitial = () => {
    setRegistrationStep('initial');
    setInitialRegistrationData(null);
    setVendorDetailsData(null);
    setErrorMessage('');
    setSuccessMessage('');
  };

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
        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-600" size={20} />
              <p className="text-green-800">{successMessage}</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-red-800">{errorMessage}</p>
          </div>
        )}

        {/* Page Header */}
        {registrationStep === 'initial' && (
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Join McDee Today
            </h1>
            <p className="text-lg text-gray-600">
              Create your account and start connecting with trusted service providers
            </p>
          </div>
        )}

        {registrationStep === 'vendorDetails' && (
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Vendor Details
            </h1>
            <p className="text-lg text-gray-600">
              Tell us more about your business
            </p>
          </div>
        )}

        {registrationStep === 'vendorCategorySpecific' && (
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Complete Your Profile
            </h1>
            <p className="text-lg text-gray-600">
              Provide specific details for your {vendorDetailsData?.category} business
            </p>
          </div>
        )}

        {/* Registration Forms */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {registrationStep === 'initial' && (
            <>
              {/* Tab Navigation */}
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
                      <div className="text-amber-600 mt-1">
                        <Shield size={20} />
                      </div>
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

                <SignupForm 
                  userType={activeTab} 
                  onSubmit={handleInitialRegistrationSubmit}
                  isLoading={isLoading}
                />
              </div>
            </>
          )}

          {registrationStep === 'vendorDetails' && (
            <div className="p-8">
              <VendorDetailsForm 
                onSubmit={handleVendorDetailsSubmit}
                onBack={handleBackToInitial}
                isLoading={isLoading}
              />
            </div>
          )}

          {registrationStep === 'vendorCategorySpecific' && vendorDetailsData && (
            <div className="p-8">
              <VendorCategorySpecificForm 
                category={vendorDetailsData.category}
                onSubmit={handleFinalVendorRegistrationSubmit}
                onBack={handleBackToVendorDetails}
                isLoading={isLoading}
              />
            </div>
          )}
        </div>

        {/* Additional Info */}
        {registrationStep === 'initial' && (
          <div className="mt-8 text-center">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">Why Choose McDee?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                <div>
                  <div className="text-2xl mb-2">
                    <Shield className="mx-auto text-blue-600" size={32} />
                  </div>
                  <div className="font-medium">Secure Escrow</div>
                  <div>Protected transactions</div>
                </div>
                <div>
                  <div className="text-2xl mb-2">
                    <CheckCircle className="mx-auto text-green-600" size={32} />
                  </div>
                  <div className="font-medium">Verified Vendors</div>
                  <div>Trusted service providers</div>
                </div>
                <div>
                  <div className="text-2xl mb-2">
                    <Star className="mx-auto text-yellow-600" size={32} />
                  </div>
                  <div className="font-medium">Easy to Use</div>
                  <div>Simple and intuitive</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;