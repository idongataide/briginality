import useSWR from "swr";
import { getProfile } from "@/api/settingsApi";

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: string[];
  isVerified: string;
  status: string;
  presided_clubs: Array<{
    id: number;
    region_id: string;
    name: string;
    club_president_id: string;
    club_vice_id: string;
    open_status: string;
    created_at: string;
    updated_at: string;
    club_id: string;
  }>;
  user_details: {
    id: number;
    user_id: number;
    age: string;
    pronouns: string;
    country_timezone: string;
    homeschool_status: string;
    region_id: string;
    bio: string | null;
    created_at: string;
    updated_at: string;
  };
  memberships: Array<{
    id: number;
    name: string;
    avatar: string | null;
    club: string;
    status: string;
    joined_at: string;
    role: string;
    club_id?: number; // Add club_id here
  }>;
}

export interface ProfileResponse {
  status: string;
  data: UserProfile;
  message: string;
}

export const useProfile = () => {
  const { data, isLoading, mutate, error } = useSWR(
    `/profile`,
    async () => {
      const res = await getProfile();
      if ((res as any)?.error) {
        throw new Error((res as any)?.message || "Failed to fetch profile");
      }
      return res as ProfileResponse;
    },
    {
      revalidateOnFocus: false,
    },
  );

  return { 
    profile: data?.data, 
    isLoading, 
    mutate, 
    error,
    isSuccess: data?.status === "success"
  };
};
