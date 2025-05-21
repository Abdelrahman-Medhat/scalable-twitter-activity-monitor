import { useState } from 'react';
import { http } from '@/lib/fetch';
import type { ActivityPayload, Profile, Alert, ApiResponse } from '@/types';

export function useAPI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitActivity = async (payload: ActivityPayload): Promise<ApiResponse<Profile>> => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await http.post<Profile>('/activity', payload);
      return { data, loading: false };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      return { error: errorMessage, loading: false };
    } finally {
      setLoading(false);
    }
  };

  const getProfiles = async (): Promise<ApiResponse<Profile[]>> => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await http.get<{ data: Profile[] }>('/profiles');
      return { data, loading: false };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      return { error: errorMessage, loading: false };
    } finally {
      setLoading(false);
    }
  };

  const getAlerts = async (): Promise<ApiResponse<Alert[]>> => {
    setLoading(true);
    setError(null);

    try {
      const data = await http.get<Alert[]>('/alerts');
      return { data, loading: false };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      return { error: errorMessage, loading: false };
    } finally {
      setLoading(false);
    }
  };

  return {
    submitActivity,
    getProfiles,
    getAlerts,
    loading,
    error,
  };
} 