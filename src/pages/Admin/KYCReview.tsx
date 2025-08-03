import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock, 
  User,
  Building,
  Phone,
  Mail,
  Calendar,
  FileText,
  Download,
  AlertTriangle
} from 'lucide-react';
import { adminApi, KYCVerification } from '../../services/adminApi';

const KYCReview: React.FC = () => {
  const [verifications, setVerifications] = useState<KYCVerification[]>([]);
  const [selectedVerification, setSelectedVerification] = useState<KYCVerification | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [showModal, setShowModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    fetchVerifications();
  }, []);

  const fetchVerifications = async () => {
    console.log('🔍 Fetching KYC verifications...');
    try {
      const response = await adminApi.getKYCVerifications();
      console.log('✅ KYC verifications response:', response);
      setVerifications(response.data);
      setError(''); // Clear any previous errors
    } catch (error: any) {
      console.error('Error fetching KYC verifications:', error);
      setError(`Failed to load KYC verifications: ${error.message || 'Unknown error'}`);
      // Set empty array for demo
      setVerifications([]);
    } finally {
      console.log('🏁 Finished fetching KYC verifications');
      setIsLoading(false);
    }
  };

  const handleApprove = async (id: number) => {
    console.log(`🔍 Approving KYC verification ${id}...`);
    setIsProcessing(true);
    setError(''); // Clear any previous errors
    try {
      await adminApi.approveKYC(id);
      console.log(`✅ KYC verification ${id} approved successfully`);
      await fetchVerifications(); // Refresh the list
      setShowModal(false);
      setSelectedVerification(null);
    } catch (error: any) {
      console.error('Error approving KYC:', error);
      setError(`Failed to approve KYC verification: ${error.message || 'Unknown error'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async (id: number) => {
    if (!rejectionReason.trim()) {
      setError('Please provide a rejection reason');
      return;
    }

    console.log(`🔍 Rejecting KYC verification ${id} with reason: ${rejectionReason}`);
    setIsProcessing(true);
    setError(''); // Clear any previous errors
    try {
      await adminApi.rejectKYC(id, rejectionReason);
      console.log(`✅ KYC verification ${id} rejected successfully`);
      await fetchVerifications(); // Refresh the list
      setShowModal(false);
      setSelectedVerification(null);
      setRejectionReason('');
    } catch (error: any) {
      console.error('Error rejecting KYC:', error);
      setError(`Failed to reject KYC verification: ${error.message || 'Unknown error'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={16} />;
      case 'approved':
        return <CheckCircle size={16} />;
      case 'rejected':
        return <XCircle size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  const filteredVerifications = verifications.filter(verification => 
    filter === 'all' || verification.status === filter
  );

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="p-6 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">KYC Review</h2>
          <p className="text-gray-600">Review and approve vendor compliance documents</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
            <AlertTriangle className="text-red-600" size={20} />
            <span className="text-red-800">{error}</span>
            <button 
              onClick={() => setError('')}
              className="ml-auto text-red-600 hover:text-red-800"
            >
              ×
            </button>
          </div>
        )}

        {/* Filters */}
        <div className="mb-6">
          <div className="flex gap-2">
            {[
              { key: 'all', label: 'All' },
              { key: 'pending', label: 'Pending' },
              { key: 'approved', label: 'Approved' },
              { key: 'rejected', label: 'Rejected' }
            ].map((filterOption) => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === filterOption.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                {filterOption.label}
              </button>
            ))}
          </div>
        </div>

        {/* KYC Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {filteredVerifications.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No KYC verifications found</h3>
              <p className="text-gray-500">
                {filter === 'all' 
                  ? 'No KYC submissions yet' 
                  : `No ${filter} KYC verifications`}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Vendor</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Business</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Document Type</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Submitted</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredVerifications.map((verification) => (
                    <tr key={verification.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {verification.user.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-3">
                            <div className="font-medium text-gray-900">{verification.user.name}</div>
                            <div className="text-sm text-gray-500">{verification.user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{verification.vendor.business_name}</div>
                        <div className="text-sm text-gray-500">{verification.vendor.category}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                          {verification.document_type === 'nin' ? <User size={14} /> : <Building size={14} />}
                          {verification.document_type ? verification.document_type.toUpperCase() : 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 text-sm font-medium rounded-full ${getStatusColor(verification.status)}`}>
                          {getStatusIcon(verification.status)}
                          {verification.status ? verification.status.charAt(0).toUpperCase() + verification.status.slice(1) : 'Unknown'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(verification.submitted_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            setSelectedVerification(verification);
                            setShowModal(true);
                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                        >
                          <Eye size={14} />
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Review Modal */}
        {showModal && selectedVerification && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowModal(false)}></div>
            
            <div className="relative bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Vendor Verification Review</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              {/* Vendor Information */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Vendor Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-gray-400" />
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{selectedVerification.user.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-gray-400" />
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{selectedVerification.user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-gray-400" />
                    <span className="text-gray-600">Phone:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{selectedVerification.user.phone}</span>
                      {selectedVerification.user.phone_verified_at ? (
                        <span className="text-green-600 text-xs">✓ Verified</span>
                      ) : (
                        <span className="text-red-600 text-xs">Not verified</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building size={16} className="text-gray-400" />
                    <span className="text-gray-600">Business:</span>
                    <span className="font-medium">{selectedVerification.business_name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-400" />
                    <span className="text-gray-600">Registered:</span>
                    <span className="font-medium">{new Date(selectedVerification.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-gray-400" />
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium">{selectedVerification.vendor_type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-gray-400" />
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium">{selectedVerification.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-gray-400" />
                    <span className="text-gray-600">Phone Verified:</span>
                    <span className="font-medium">
                      {selectedVerification.user.phone_verified_at ? (
                        <span className="text-green-600">
                          {new Date(selectedVerification.user.phone_verified_at).toLocaleDateString()}
                        </span>
                      ) : (
                        <span className="text-red-600">Not verified</span>
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Verification Status */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Verification Status</h4>
                <div className="space-y-4">
                  {/* Phone Verification Status */}
                  <div className={`p-4 rounded-lg border ${
                    selectedVerification.user.phone_verified_at 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-red-50 border-red-200'
                  }`}>
                    <div className="flex items-center gap-3">
                      <Phone className={`${
                        selectedVerification.user.phone_verified_at ? 'text-green-600' : 'text-red-600'
                      }`} size={20} />
                      <div>
                        <h5 className={`font-semibold ${
                          selectedVerification.user.phone_verified_at ? 'text-green-800' : 'text-red-800'
                        }`}>
                          Phone Verification
                        </h5>
                        <p className={`text-sm ${
                          selectedVerification.user.phone_verified_at ? 'text-green-700' : 'text-red-700'
                        }`}>
                          {selectedVerification.user.phone_verified_at 
                            ? `Verified on ${new Date(selectedVerification.user.phone_verified_at).toLocaleDateString()}`
                            : 'Phone number not verified'
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Account Verification Status */}
                  <div className={`p-4 rounded-lg border ${
                    selectedVerification.is_verified 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-yellow-50 border-yellow-200'
                  }`}>
                    <div className="flex items-center gap-3">
                      <Shield className={`${
                        selectedVerification.is_verified ? 'text-green-600' : 'text-yellow-600'
                      }`} size={20} />
                      <div>
                        <h5 className={`font-semibold ${
                          selectedVerification.is_verified ? 'text-green-800' : 'text-yellow-800'
                        }`}>
                          Account Verification
                        </h5>
                        <p className={`text-sm ${
                          selectedVerification.is_verified ? 'text-green-700' : 'text-yellow-700'
                        }`}>
                          {selectedVerification.is_verified 
                            ? 'Account is verified and live'
                            : 'Account pending verification'
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Setup Status */}
                  <div className={`p-4 rounded-lg border ${
                    selectedVerification.is_setup_complete 
                      ? 'bg-blue-50 border-blue-200' 
                      : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center gap-3">
                      <CheckCircle className={`${
                        selectedVerification.is_setup_complete ? 'text-blue-600' : 'text-gray-400'
                      }`} size={20} />
                      <div>
                        <h5 className={`font-semibold ${
                          selectedVerification.is_setup_complete ? 'text-blue-800' : 'text-gray-600'
                        }`}>
                          Profile Setup
                        </h5>
                        <p className={`text-sm ${
                          selectedVerification.is_setup_complete ? 'text-blue-700' : 'text-gray-500'
                        }`}>
                          {selectedVerification.is_setup_complete 
                            ? 'Profile setup is complete'
                            : 'Profile setup incomplete'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rejection Reason Input (only show for pending status) */}
              {!selectedVerification.is_verified && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Action Reason (if needed)
                  </label>
                  <textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Provide a reason for your action (optional)..."
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors"
                >
                  Close
                </button>
                
                {!selectedVerification.is_verified && (
                  <>
                    <button
                      onClick={() => handleReject(selectedVerification.id)}
                      disabled={isProcessing}
                      className="flex-1 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      {isProcessing ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <>
                          <Clock size={16} />
                          Mark Pending
                        </>
                      )}
                    </button>
                    
                    <button
                      onClick={() => handleApprove(selectedVerification.id)}
                      disabled={isProcessing}
                      className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      {isProcessing ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <>
                          <CheckCircle size={16} />
                          Verify Vendor
                        </>
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default KYCReview;