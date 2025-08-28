import { axiosAPIInstance } from "./interceptor";

export const getClubsByRegion = async (regionId: string) => {
    try {
      return await axiosAPIInstance
        .get(`/admin/club-groups/${regionId}`)
        .then((res) => {
          return res?.data;
        });
    } catch (error) {
      return error;
    }
  };

export const getRegionalClubMembers= async (regionId: string) => {
    try {
      return await axiosAPIInstance
        .get(`/admin/club-groups/${regionId}/members`)
        .then((res) => {
          return res?.data;
        });
    } catch (error) {
      return error;
    }
  };

  
export const getMembersByRegion = async (regionId: string) => {
  try {
    return await axiosAPIInstance
      .get(`/admin/regions/${regionId}/members`)
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

  export const getRegionClubs = async (regionId: string) => {
    try {
      return await axiosAPIInstance
        .get(`/admin/regions/${regionId}/clubs`)
        .then((res) => {
          return res?.data;
        });
    } catch (error) {
      return error;
    }
  };

  export const createRegionalClub = async (data: any) => {
    try {
      return await axiosAPIInstance
        .post(`/admin/regional-clubs`, data)
        .then((res) => {
          return res?.data;
        });
    } catch (error) {
      return error;
    }
  };

  export const createClubGroup = async (data: any) => {
    try {
      return await axiosAPIInstance
        .post(`/admin/club-groups/create`, data)
        .then((res) => {
          return res?.data;
        });
    } catch (error) {
      return error;
    }
  };

  export const getApprovedLeaders = async () => {
    try {
      return await axiosAPIInstance
        .get(`/admin/approved-leaders`)
        .then((res) => {
          return res?.data;
        });
    } catch (error) {
      return error;
    }
  };