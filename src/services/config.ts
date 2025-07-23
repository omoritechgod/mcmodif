// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api',
  ADMIN_BASE_URL: import.meta.env.VITE_ADMIN_API_BASE_URL || 'http://127.0.0.1:8000',
  TIMEOUT: 30000, // 30 seconds
};

// API Endpoints
export const ENDPOINTS = {
  // Authentication
  LOGIN: '/login',
  REGISTER: '/register',
  LOGOUT: '/logout',
  ME: '/me',
  
  // Profile
  UPDATE_PROFILE_IMAGE: '/user/profile/image',
  
  // Maintenance
  MAINTENANCE_REQUEST: '/maintenance/request',
  MAINTENANCE_HISTORY: '/maintenance/my-requests',
  
  // Verification
  SEND_OTP: '/verify/send-otp',
  CONFIRM_OTP: '/verify/confirm-otp',
  
  // Vendor Compliance
  COMPLIANCE_STATUS: '/vendor/compliance/status',
  UPLOAD_COMPLIANCE_DOCUMENT: '/vendor/compliance/upload-document',
  SUBMIT_FOR_REVIEW: '/vendor/compliance/submit-review',
  
  // Vendor Registration (Legacy - to be organized later)
  VENDOR_REGISTER: '/vendor/register',
  VENDOR_MECHANIC_SETUP: '/vendor/mechanic/setup',
  VENDOR_RIDER_SETUP: '/vendor/rider/setup',
  VENDOR_PRODUCT_SETUP: '/vendor/product/setup',
  VENDOR_APARTMENT_SETUP: '/vendor/apartment/setup',
  VENDOR_SERVICE_SETUP: '/vendor/service/setup',
};

export default API_CONFIG;