import { axiosAPIInstance } from "./interceptor";




export const changePassword = async (payload: any) => {
  try {
    return await axiosAPIInstance
      .post(`/change-password`, payload)
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

