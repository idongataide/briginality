import { axiosAPIInstance } from "./interceptor";
import { handleApiError } from "./interceptor";

export interface Notice {
  id: number;
  title: string;
  content: string;
  club_id: number;
  author?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateNoticePayload {
  title: string;
  content: string;
  club_id: number;
}

export interface UpdateNoticePayload {
  title?: string;
  content?: string;
  club_id?: number;
  _method: string;
}

export interface GetNoticesResponse {
  data: Notice[];
  message?: string;
}

export interface GetNoticeResponse {
  data: Notice;
  message?: string;
}

// Get all notices
export const getNotices = async (): Promise<GetNoticesResponse | ReturnType<typeof handleApiError>> => {
  try {
    const response = await axiosAPIInstance.get(`/notices`);
    return response?.data;
  } catch (error: any) {
    return handleApiError(error);
  }
};

// Get notices by club
export const getNoticesByClub = async (clubId: number): Promise<GetNoticesResponse | ReturnType<typeof handleApiError>> => {
  try {
    const response = await axiosAPIInstance.get(`/notices?club_id=${clubId}`);
    return response?.data;
  } catch (error: any) {
    return handleApiError(error);
  }
};

// Get single notice
export const getNotice = async (id: number): Promise<GetNoticeResponse | ReturnType<typeof handleApiError>> => {
  try {
    const response = await axiosAPIInstance.get(`/notices/${id}`);
    return response?.data;
  } catch (error: any) {
    return handleApiError(error);
  }
};

// Create notice
export const createNotice = async (data: CreateNoticePayload): Promise<GetNoticeResponse | ReturnType<typeof handleApiError>> => {
  try {
    const response = await axiosAPIInstance.post(`/notices`, data);
    return response?.data;
  } catch (error: any) {
    return handleApiError(error);
  }
};

// Update notice
export const updateNotice = async (id: number, data: UpdateNoticePayload): Promise<GetNoticeResponse | ReturnType<typeof handleApiError>> => {
  try {
    const response = await axiosAPIInstance.put(`/notices/${id}`, data);
    return response?.data;
  } catch (error: any) {
    return handleApiError(error);
  }
};

// Delete notice
export const deleteNotice = async (id: number): Promise<{ message: string } | ReturnType<typeof handleApiError>> => {
  try {
    const response = await axiosAPIInstance.delete(`/notices/${id}`);
    return response?.data;
  } catch (error: any) {
    return handleApiError(error);
  }
};
