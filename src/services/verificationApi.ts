import { apiClient } from './apiClient';

export interface OTPResponse {
  message: string;
  success: boolean;
}

export interface ComplianceDocument {
  type: 'nin' | 'cac';
  file: File;
}

export class VerificationApiService {
  // OTP Email Verification
  async sendOTP(): Promise<OTPResponse> {
    return apiClient.post('/verify/send-otp', {});
  }

  async confirmOTP(otp: string): Promise<OTPResponse> {
    return apiClient.post('/verify/confirm-otp', { otp });
  }

  // Compliance Document Upload
  async uploadComplianceDocument(document: ComplianceDocument): Promise<{ message: string; document_url: string }> {
    const formData = new FormData();
    formData.append('document', document.file);
    formData.append('type', document.type);
    
    return apiClient.uploadFile('/vendor/compliance/upload-document', formData);
  }

  // Submit for Review
  async submitForReview(): Promise<{ message: string }> {
    return apiClient.post('/vendor/compliance/submit-review', {});
  }

  // Get Compliance Status
  async getComplianceStatus(): Promise<{
    email_verified: boolean;
    email_verified_at: string | null;
    document_uploaded: boolean;
    document_type: 'nin' | 'cac' | null;
    compliance_status: 'pending' | 'approved' | 'rejected';
    is_verified: boolean;
  }> {
    return apiClient.get('/vendor/compliance/status');
  }
}

export const verificationApi = new VerificationApiService();