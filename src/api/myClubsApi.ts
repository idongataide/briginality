import { axiosAPIInstance } from "./interceptor";




export const getMyClubs = async () => {
  try {
    return await axiosAPIInstance
      .get(`my-clubs`)
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};