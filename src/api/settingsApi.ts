import { axiosAPIInstance } from "./interceptor";


export const getProfile = async () => {
  try {
    return await axiosAPIInstance
      .get(`/profile`)
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const updateProfile = async (data: {
  first_name: string;
  last_name: string;
  phone_number: string;
}) => {
  try {
    return await axiosAPIInstance
      .post(`accounts/update-profile`, data)
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const updatePassword = async (data: {
  old_password: string;
  new_password: string;
}) => {
  try {
    return await axiosAPIInstance
      .post(`accounts/update-profile`, data)
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};
