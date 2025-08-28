import useSWR, { mutate } from 'swr';
import { getMyClubs } from '@/api/myClubsApi';

export const useMyClubs = () => {
  const { data, isLoading, error } = useSWR(
    `/my-clubs`,
    async () => {
      const res = await getMyClubs();
      if ((res as any)?.error) {
        throw new Error((res as any)?.message || "Failed to fetch clubs");
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
    mutate: () => mutate('/my-clubs')
  };
};