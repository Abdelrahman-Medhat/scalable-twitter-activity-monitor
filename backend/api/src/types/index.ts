export type ActivityType = 'TWEET' | 'RETWEET' | 'REPLY';

export interface ActivityPayload {
  handle: string;
  type: ActivityType;
  timestamp?: string;
}

export interface ProfileResponse {
  id: string;
  handle: string;
  activityCount: number;
  isActive: boolean;
  lastActivityAt: string | null;
}

export interface AlertResponse {
  handle: string;
  lastActivityAt: string;
  inactiveDuration: number; // in minutes
} 