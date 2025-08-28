import { axiosAPIInstance, handleApiError } from "./interceptor";

export interface CreateEventPayload {
  name: string;
  assigned_club_id: number | string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  description?: string;
  zoom_link?: string;
}

export const createEvent = async (data: CreateEventPayload) => {
  try {
    const response = await axiosAPIInstance.post(`/events`, data);
    return response?.data;
  } catch (error: any) {
    return handleApiError(error);
  }
};

export interface EventItemApiResponse {
  id: number | string;
  club: string;
  name: string;
  description?: string;
  start_date: string; // YYYY-MM-DD
  end_date?: string; // YYYY-MM-DD
  start_time: string; // HH:mm
  end_time: string; // HH:mm
  zoom_link?: string;
  region?: string;
  created_by?: string;
}

export interface GetEventsResponse {
  status?: string;
  data: EventItemApiResponse[] | EventItemApiResponse;
  message?: string;
}

export const getEvents = async (): Promise<GetEventsResponse | ReturnType<typeof handleApiError>> => {
  try {
    const response = await axiosAPIInstance.get(`/events`);
    return response?.data;
  } catch (error: any) {
    return handleApiError(error);
  }
};

export const getEventsByRegion = async (regionId: string | number): Promise<GetEventsResponse | ReturnType<typeof handleApiError>> => {
  try {
    const response = await axiosAPIInstance.get(`/region/${regionId}/events`);
    return response?.data;
  } catch (error: any) {
    return handleApiError(error);
  }
};


