export interface ActivityPayload {
  handle: string;
  type: string;
  timestamp?: string;
}

export interface Profile {
  id: string;
  handle: string;
  activityCount: number;
  isActive: boolean;
  lastActivityAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Alert {
  id: string;
  handle: string;
  activityCount: number;
  isActive: boolean;
  lastActivityAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  loading: boolean;
} 