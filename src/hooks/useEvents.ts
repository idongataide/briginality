import useSWR from "swr";
import { getEvents, getEventsByRegion, EventItemApiResponse, GetEventsResponse } from "@/api/eventsApi";

export interface NormalizedEventItem {
  id: number | string;
  club: string;
  title: string;
  description?: string;
  date: string; // start_date for single-day display
  start_date: string;
  end_date: string;
  time: string; // "HH:mm - HH:mm"
  type?: string;
  meetingLink?: string;
}

const normalizeApiData = (payload: GetEventsResponse | any): NormalizedEventItem[] => {
  if (!payload) return [];

  const raw = Array.isArray(payload?.data) ? payload.data : payload?.data ? [payload.data] : [];

  return raw.map((item: EventItemApiResponse) => ({
    id: item.id,
    club: item.club,
    title: item.name,
    description: item.description,
    date: item.start_date,
    start_date: item.start_date,
    end_date: item.end_date || item.start_date, // fallback to start_date if end_date is not provided
    time: `${item.start_time} - ${item.end_time}`,
    meetingLink: item.zoom_link,
  }));
};

export const useEvents = () => {
  const { data, isLoading, mutate, error } = useSWR(
    `/events`,
    async () => {
      const res = await getEvents();
      // if API error shaped by handleApiError
      if ((res as any)?.error) {
        throw new Error((res as any)?.message || "Failed to fetch events");
      }
      return normalizeApiData(res as GetEventsResponse);
    },
    {
      revalidateOnFocus: false,
    },
  );

  return { data: data || [], isLoading, mutate, error };
};

export const useEventsByRegion = (regionId: string | number | undefined) => {
  const shouldFetch = Boolean(regionId);
  const { data, isLoading, mutate, error } = useSWR(
    shouldFetch ? `/region/${regionId}/events` : null,
    async () => {
      const res = await getEventsByRegion(regionId as string | number);
      // if API error shaped by handleApiError
      if ((res as any)?.error) {
        throw new Error((res as any)?.message || "Failed to fetch events");
      }
      return normalizeApiData(res as GetEventsResponse);
    },
    {
      revalidateOnFocus: false,
    },
  );

  return { data: data || [], isLoading, mutate, error };
};


