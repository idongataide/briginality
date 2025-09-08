
import { axiosAPIInstance } from "./interceptor";

export const getApplicants = async () => {
    try {
      return await axiosAPIInstance
        .get(`/admin/club-applications`)
        .then((res) => {
          return res?.data;
        });
    } catch (error) {
      return error;
    }
  };

export const getWaitlist = async () => {
    try {
      return await axiosAPIInstance
        .get(`/admin/waitlist`)
        .then((res) => {
          return res?.data;
        });
    } catch (error) {
      return error;
    }
  };

export const approveClubApplication = async (applicationId: string) => {
    try {
      return await axiosAPIInstance
        .post(`/admin/club-applications/${applicationId}/approve`)
        .then((res) => {
          return res?.data;
        });
    } catch (error) {
      return error;
    }
  };

export const rejectClubApplication = async (applicationId: string, notes?: string) => {
    try {
      return await axiosAPIInstance
        .post(`/admin/club-applications/${applicationId}/reject`, { notes })
        .then((res) => {
          return res?.data;
        });
    } catch (error) {
      return error;
    }
  };

export const getApplicantDetails = async (applicationId: string) => {
    try {
      return await axiosAPIInstance
        .get(`/admin/club-applications/${applicationId}`)
        .then((res) => {
          return res?.data;
        });
    } catch (error) {
      return error;
    }
  };

export const getRoleApplications = async () => {
  try {
    return await axiosAPIInstance
      .get(`/admin/role-applications`)
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const getRoleApplicationDetails = async (applicationId: string) => {
  try {
    return await axiosAPIInstance
      .get(`/admin/role-applications/${applicationId}`)
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const approveRoleApplication = async (applicationId: string) => {
  try {
    return await axiosAPIInstance
      .post(`/admin/role-applications/${applicationId}/approve`)
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const rejectRoleApplication = async (applicationId: string, notes?: string) => {
  try {
    return await axiosAPIInstance
      .post(`/admin/role-applications/${applicationId}/reject`, { notes })
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};


export const fetchClubMembers = async (clubId: string) => {
  try {
    return await axiosAPIInstance
      .get(`/club/members/${clubId}`)
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};
  