import { getApplicants, getApplicantDetails, getRoleApplications, getWaitlist, getRoleApplicationDetails, approveRoleApplication, rejectRoleApplication, approveClubApplication, rejectClubApplication } from "@/api/customersApi";
import { getClubsByRegion, getMembersByRegion, getRegionClubs, createRegionalClub, getApprovedLeaders, getRegionalClubMembers } from "@/api/useAdmin";

import useSWR from "swr";

export const useApplicants = () => {
  const { data, isLoading, mutate } = useSWR(
    `admin/club-applications`,
    () => {
      return getApplicants().then((res) => {
        return res?.data;
      });
    },

    {
      revalidateOnFocus: false,
    },
  );

  return { data, isLoading, mutate };
};

export const useWaitlist = () => {
  const { data, isLoading, mutate } = useSWR(
    `admin/waitlist`,
    () => {
      return getWaitlist().then((res) => {
        return res?.data;
      });
    },
    {
      revalidateOnFocus: false,
    },
  );

  return { data, isLoading, mutate };
};

export const useApplicantDetails = (applicationId: string | undefined) => {
  const shouldFetch = Boolean(applicationId);
  const { data, isLoading, mutate } = useSWR(
    shouldFetch ? `admin/club-applications/${applicationId}` : null,
    () => {
      return getApplicantDetails(applicationId as string).then((res) => {
        return res?.data;
      });
    },
    {
      revalidateOnFocus: false,
    },
  );

  return { data, isLoading, mutate };
};

export const useRoleApplications = () => {
  const { data, isLoading, mutate } = useSWR(
    `admin/role-applications`,
    () => {
      return getRoleApplications().then((res) => {
        return res?.data;
      });
    },
    {
      revalidateOnFocus: false,
    },
  );

  return { data, isLoading, mutate };
};

export const useRoleApplicationDetails = (applicationId: string | undefined) => {
  const shouldFetch = Boolean(applicationId);
  const { data, isLoading, mutate } = useSWR(
    shouldFetch ? `admin/role-applications/${applicationId}` : null,
    () => {
      return getRoleApplicationDetails(applicationId as string).then((res) => {
        return res?.data;
      });
    },
    {
      revalidateOnFocus: false,
    },
  );

  return { data, isLoading, mutate };
};

export const useApproveRoleApplication = () => {
  const approveApplication = async (applicationId: string) => {
    try {
      const result = await approveRoleApplication(applicationId);
      return result;
    } catch (error) {
      throw error;
    }
  };

  return { approveApplication };
};

export const useRejectRoleApplication = () => {
  const rejectApplication = async (applicationId: string, notes?: string) => {
    try {
      const result = await rejectRoleApplication(applicationId, notes);
      return result;
    } catch (error) {
      throw error;
    }
  };

  return { rejectApplication };
};

export const useApproveClubApplication = () => {
  const approveApplication = async (applicationId: string) => {
    try {
      const result = await approveClubApplication(applicationId);
      return result;
    } catch (error) {
      throw error;
    }
  };

  return { approveApplication };
};

export const useRejectClubApplication = () => {
  const rejectApplication = async (applicationId: string, notes?: string) => {
    try {
      const result = await rejectClubApplication(applicationId, notes);
      return result;
    } catch (error) {
      throw error;
    }
  };

  return { rejectApplication };
};


export const useClubsByRegion = (regionId: string) => {
  const { data, isLoading, mutate } = useSWR(
    `admin/club-groups/${regionId}`,
    () => {
      return getClubsByRegion(regionId).then((res) => {
        return res?.data;
      });
    },
  );

  return { data, isLoading, mutate };
};

export const useRegionalClubMembers = (regionId: string | undefined) => {
  const shouldFetch = Boolean(regionId);
  const { data, isLoading, mutate } = useSWR(
    shouldFetch ? `admin/regions/${regionId}/members` : null,
    () => {
      return getRegionalClubMembers(regionId as string).then((res) => {
        return res?.data;
      });
    },
    {
      revalidateOnFocus: false,
    },
  );

  return { data, isLoading, mutate };
};

export const useMembersByRegion = (regionId: string | undefined) => {
  const shouldFetch = Boolean(regionId);
  const { data, isLoading, mutate } = useSWR(
    shouldFetch ? `admin/regions/${regionId}/members` : null,
    () => {
      return getMembersByRegion(regionId as string).then((res) => {
        return res?.data;
      });
    },
    {
      revalidateOnFocus: false,
    },
  );

  return { data, isLoading, mutate };
};

export const useRegionClubs = (regionId: string | undefined) => {
  const { data, isLoading, mutate } = useSWR(
    `/admin/regions/${regionId}/clubs`,
    () => {
      return getRegionClubs(regionId as string).then((res) => {
        return res?.data;
      });
    },
  );

  return { data, isLoading, mutate };
};

export const useCreateRegionalClub = () => {
  const createClub = async (data: any) => {
    try {
      const result = await createRegionalClub(data);
      return result;
    } catch (error) {
      throw error;
    }
  };

  return { createClub };
};

export const useApprovedLeaders = () => {
  const { data, isLoading, mutate } = useSWR(
    `admin/approved-leaders`,
    () => {
      return getApprovedLeaders().then((res) => {
        return res?.data;
      });
    },
    {
      revalidateOnFocus: false,
    },
  );

  return { data, isLoading, mutate };
};

