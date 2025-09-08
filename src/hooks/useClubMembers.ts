
import { fetchClubMembers } from "@/api/customersApi";
import useSWR from "swr";

export const usefetchClubMembers = (clubId: string | null) => {
  const shouldFetch = Boolean(clubId);
  const { data, isLoading, mutate } = useSWR(
    shouldFetch ? `/club/members/${clubId}` : null,
    () => {
      return fetchClubMembers(clubId as string).then((res) => {
        return res?.data;
      });
    },
    {
      revalidateOnFocus: false,
    },
  );

  return { data, isLoading, mutate };
};

