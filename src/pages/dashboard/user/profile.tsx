import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { 
  User, 
  Mail, 
  Phone, 
  Camera, 
  Upload,
  AlertCircle,
  CheckCircle,
  Shield
} from 'lucide-react';
import { getStoredUser } from '../../../utils/dashboardUtils';
import { authApi } from '../../../services/authApi';

const UserProfile: React.FC = () => {
  const [user, setUser] = useState(getStoredUser());
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [selectedFile]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setMessage({ type: 'error', text: 'Please select a valid image file' });
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'Image size should be less than 5MB' });
        return;
      }
      
      setSelectedFile(file);
      setMessage({ type: '', text: '' });
    }
  };

  const handleProfileImageUpdate = async () => {
    if (!selectedFile) {
      setMessage({ type: 'error', text: 'Please select an image first' });
      return;
    }

    setIsUploading(true);
    setMessage({ type: '', text: '' });

    try {
      const data = await authApi.updateProfileImage(selectedFile);

      // Update user data in state and localStorage
      const updatedUser = { ...user, profile_image: data.profile_image_url };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      setMessage({ type: 'success', text: 'Profile image updated successfully!' });
      setSelectedFile(null);
      setPreviewUrl(null);

      // Reset file input
      const fileInput = document.getElementById('profile-image-input') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (error: any) {
      console.error('Error updating profile image:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to update profile image' });
    } finally {
      setIsUploading(false);
    }
  };

  const getUserInitials = (name: string): string => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length >= 2) {
      return (names[0].charAt(0) + names[1].charAt(0)).toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };

  if (!user) {
    return (
      <DashboardLayout>
        <div className="p-6 flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">User data not found</h2>
            <p className="text-gray-600">Please try logging in again.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Profile Management</h2>

            {/* Message Display */}
            {message.text && (
              <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                message.type === 'success' 
                  ? 'bg-green-50 border border-green-200 text-green-800' 
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}>
                {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                <span>{message.text}</span>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Image Section */}
              <div className="lg:col-span-1">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Picture</h3>
                  
                  <div className="relative inline-block mb-4">
                    {previewUrl || user.profile_image ? (
                      <img 
                        src={previewUrl || user.profile_image} 
                        alt={user.name}
                        className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                      />
                    ) : (
                      <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-4xl border-4 border-gray-200">
                        {getUserInitials(user.name)}
                      </div>
                    )}
                    
                    <label 
                      htmlFor="profile-image-input"
                      className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer transition-colors"
                    >
                      <Camera size={16} />
                    </label>
                  </div>

                  <input
                    id="profile-image-input"
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />

                  {selectedFile && (
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600">
                        Selected: {selectedFile.name}
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={handleProfileImageUpdate}
                          disabled={isUploading}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                        >
                          {isUploading ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              Uploading...
                            </>
                          ) : (
                            <>
                              <Upload size={16} />
                              Update
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => {
                            setSelectedFile(null);
                            const fileInput = document.getElementById('profile-image-input') as HTMLInputElement;
                            if (fileInput) fileInput.value = '';
                          }}
                          className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-gray-500 mt-2">
                    Max file size: 5MB<br />
                    Supported formats: JPG, PNG, GIF
                  </p>
                </div>
              </div>

              {/* Profile Information Section */}
              <div className="lg:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Information</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        value={user.name}
                        readOnly
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-600 cursor-not-allowed"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Contact support to change your name</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="email"
                        value={user.email}
                        readOnly
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-600 cursor-not-allowed"
                      />
                      {user.email_verified_at && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <CheckCircle className="text-green-500" size={16} />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-gray-500">Contact support to change your email</p>
                      {user.email_verified_at ? (
                        <span className="text-xs text-green-600 font-medium">✓ Verified</span>
                      ) : (
                        <span className="text-xs text-yellow-600 font-medium">⚠ Not Verified</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="tel"
                        value={user.phone}
                        readOnly
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-600 cursor-not-allowed"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Contact support to change your phone number</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Type
                    </label>
                    <div className="px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-600">
                      {user.user_type === 'user' ? 'Customer' : 'Vendor'}
                      {user.user_type === 'vendor' && user.vendor && (
                        <span className="ml-2 text-sm">
                          ({user.vendor.business_name} - {user.vendor.category})
                        </span>
                      )}
                    </div>
                  </div>

                  {user.user_type === 'vendor' && user.vendor && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Business Type
                        </label>
                        <div className="px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-600">
                          {user.vendor.vendor_type === 'individual' ? 'Individual' : 'Registered Business'}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Verification Status
                        </label>
                        <div className="space-y-3">
                          {/* Overall Status */}
                          <div className="px-4 py-3 border border-gray-300 rounded-xl bg-gray-50">
                            <div className="flex items-center justify-between">
                              <span>Account Status:</span>
                              <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                                user.vendor.is_verified 
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {user.vendor.is_verified ? (
                                  <>
                                    <CheckCircle size={14} />
                                    Live
                                  </>
                                ) : (
                                  <>
                                    <AlertCircle size={14} />
                                    Test Mode
                                  </>
                                )}
                              </span>
                            </div>
                          </div>

                          {/* Verification Steps */}
                          <div className="bg-gray-50 p-4 rounded-xl">
                            <h4 className="font-medium text-gray-900 mb-3">Verification Steps:</h4>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-700">Email Verification</span>
                                {user.email_verified_at ? (
                                  <CheckCircle className="text-green-500" size={16} />
                                ) : (
                                  <AlertCircle className="text-yellow-500" size={16} />
                                )}
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-700">
                                  {user.vendor.vendor_type === 'individual' ? 'NIN Document' : 'CAC Document'}
                                </span>
                                {user.vendor.compliance_status === 'approved' ? (
                                  <CheckCircle className="text-green-500" size={16} />
                                ) : user.vendor.compliance_status === 'pending' ? (
                                  <AlertCircle className="text-yellow-500" size={16} />
                                ) : (
                                  <AlertCircle className="text-red-500" size={16} />
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Compliance Link */}
                          {!user.vendor.is_verified && (
                            <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl">
                              <div className="flex items-center gap-3">
                                <Shield className="text-blue-600" size={20} />
                                <div className="flex-1">
                                  <h4 className="font-semibold text-blue-800">Complete Verification</h4>
                                  <p className="text-blue-700 text-sm">
                                    Complete your compliance verification to activate your account.
                                  </p>
                                </div>
                                <button
                                  onClick={() => window.location.href = `${window.location.pathname.replace('/profile', '/compliance')}`}
                                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                                >
                                  Go to Compliance
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserProfile;