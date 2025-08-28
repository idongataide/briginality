import useSWR, { mutate } from 'swr';
import { 
  getNotices, 
  getNoticesByClub, 
  getNotice, 
  createNotice, 
  updateNotice, 
  deleteNotice,
  type Notice,
  type CreateNoticePayload,
  type UpdateNoticePayload
} from '@/api/noticesApi';

export const useNotices = () => {
  const { data, isLoading, error } = useSWR(
    `/notices`,
    async () => {
      const res = await getNotices();
      if ((res as any)?.error) {
        throw new Error((res as any)?.message || "Failed to fetch notices");
      }
      return (res as any)?.data || [];
    },
    {
      revalidateOnFocus: false,
    },
  );

  return { 
    data: data || [], 
    isLoading, 
    error,
    mutate: () => mutate('/notices')
  };
};

export const useNoticesByClub = (clubId: number | undefined) => {
  const { data, isLoading, error } = useSWR(
    clubId ? `/notices?club_id=${clubId}` : null,
    async () => {
      if (!clubId) return [];
      const res = await getNoticesByClub(clubId);
      if ((res as any)?.error) {
        throw new Error((res as any)?.message || "Failed to fetch club notices");
      }
      return (res as any)?.data || [];
    },
    {
      revalidateOnFocus: false,
    },
  );

  return { 
    data: data || [], 
    isLoading, 
    error,
    mutate: () => mutate(`/notices?club_id=${clubId}`)
  };
};

export const useNotice = (id: number | undefined) => {
  const { data, isLoading, error } = useSWR(
    id ? `/notices/${id}` : null,
    async () => {
      if (!id) return null;
      const res = await getNotice(id);
      if ((res as any)?.error) {
        throw new Error((res as any)?.message || "Failed to fetch notice");
      }
      return (res as any)?.data || null;
    },
    {
      revalidateOnFocus: false,
    },
  );

  return { 
    data, 
    isLoading, 
    error,
    mutate: () => mutate(`/notices/${id}`)
  };
};

export const useNoticeActions = () => {
  const createNoticeAction = async (payload: CreateNoticePayload) => {
    try {
      const res = await createNotice(payload);
      if ((res as any)?.error) {
        throw new Error((res as any)?.message || "Failed to create notice");
      }
      // Refresh the notices list
      mutate('/notices');
      return res;
    } catch (error) {
      throw error;
    }
  };

  const updateNoticeAction = async (id: number, payload: UpdateNoticePayload) => {
    try {
      const res = await updateNotice(id, payload);
      if ((res as any)?.error) {
        throw new Error((res as any)?.message || "Failed to update notice");
      }
      // Refresh the notices list and specific notice
      mutate('/notices');
      mutate(`/notices/${id}`);
      return res;
    } catch (error) {
      throw error;
    }
  };

  const deleteNoticeAction = async (id: number) => {
    try {
      const res = await deleteNotice(id);
      if ((res as any)?.error) {
        throw new Error((res as any)?.message || "Failed to delete notice");
      }
      // Refresh the notices list
      mutate('/notices');
      return res;
    } catch (error) {
      throw error;
    }
  };

  return {
    createNotice: createNoticeAction,
    updateNotice: updateNoticeAction,
    deleteNotice: deleteNoticeAction,
  };
};
