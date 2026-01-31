export interface Technician {
  id: string;
  name: string;
  email: string;
  serviceCategory: string;
  latitude: number | null;
  longitude: number | null;
  onlineStatus: boolean;
  verified: boolean;
  walletBalance: number;
}

export interface ServiceRequest {
  id: string;
  customerId: string;
  serviceCategory: string;
  latitude: number;
  longitude: number;
  status: "open" | "accepted" | "in_progress" | "completed";
  acceptedBy?: string; // Technician ID
  createdAt: number; // Timestamp
  address?: string; // Optional human-readable address
}

export interface UserProfile {
  uid: string;
  email: string;
  role: 'customer' | 'technician' | 'admin';
  displayName?: string;
}

export const SERVICE_CATEGORIES = [
  "Plumber",
  "Electrician",
  "Carpenter",
  "Mechanic",
  "Cleaner",
];
