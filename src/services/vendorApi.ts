import { apiClient, ApiResponse } from './api';

// Vendor-specific types
export interface VendorRegistrationData {
  vendor_type: string;
  business_name: string;
  category: string;
}

export interface MechanicSetupData {
  workshop_name: string;
  services_offered: string;
  location: string;
  contact_number: string;
}

export interface RiderSetupData {
  vehicle_type: string;
  license_number: string;
  experience_years: number;
}

export interface ProductVendorSetupData {
  contact_person: string;
  store_address: string;
  store_phone: string;
  store_email: string;
  store_description: string;
  logo?: string;
}

export interface ServiceApartmentSetupData {
  full_name: string;
  phone_number: string;
  organization_name: string;
  organization_address: string;
  website?: string;
  years_of_experience: number;
}

export interface ServiceVendorSetupData {
  service_name: string;
  description: string;
  location: string;
  phone: string;
  email: string;
}

// Vendor API service
export class VendorApiService {
  // Vendor registration
  async registerVendor(data: VendorRegistrationData): Promise<ApiResponse> {
    return apiClient.post('/vendor/register', data);
  }

  // Category-specific setup
  async setupMechanic(data: MechanicSetupData): Promise<ApiResponse> {
    return apiClient.post('/vendor/mechanic/setup', data);
  }

  async setupRider(data: RiderSetupData): Promise<ApiResponse> {
    return apiClient.post('/vendor/rider/setup', data);
  }

  async setupProductVendor(data: ProductVendorSetupData): Promise<ApiResponse> {
    return apiClient.post('/vendor/product/setup', data);
  }

  async setupServiceApartment(data: ServiceApartmentSetupData): Promise<ApiResponse> {
    return apiClient.post('/vendor/apartment/setup', data);
  }

  async setupServiceVendor(data: ServiceVendorSetupData): Promise<ApiResponse> {
    return apiClient.post('/vendor/service/setup', data);
  }

  // Dashboard data (placeholders for future implementation)
  async getMechanicDashboard(): Promise<any> {
    return apiClient.get('/vendor/mechanic/dashboard');
  }

  async getRiderDashboard(): Promise<any> {
    return apiClient.get('/vendor/rider/dashboard');
  }

  async getProductVendorDashboard(): Promise<any> {
    return apiClient.get('/vendor/product/dashboard');
  }

  async getServiceVendorDashboard(): Promise<any> {
    return apiClient.get('/vendor/service/dashboard');
  }

  async getApartmentDashboard(): Promise<any> {
    return apiClient.get('/vendor/apartment/dashboard');
  }

  async getFoodVendorDashboard(): Promise<any> {
    return apiClient.get('/vendor/food/dashboard');
  }
}

// Create and export service instance
export const vendorApi = new VendorApiService();