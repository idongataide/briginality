import { getRegions, getClubs, getClubsCat } from "@/api/enumsApi";
import useSWR from "swr";

export const useRegions = () => {
    const { data, isLoading, mutate } = useSWR(
        `/regions`,
        () => getRegions(),
        {
            revalidateOnFocus: false,
        },
    );

    return { data, isLoading, mutate };
};

export const useClubs = () => {
    const { data, isLoading, mutate } = useSWR(
        `/clubs`,
        () => getClubs(),
        {
            revalidateOnFocus: false,
        },
    );

    return { data, isLoading, mutate };
};

export const useClubCategories = () => {
    const { data, isLoading, mutate } = useSWR(
        `/club-categories/`,
        () => getClubsCat(),
        {
            revalidateOnFocus: false,
        },
    );

    return { data, isLoading, mutate };
};

