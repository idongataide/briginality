import { iLogin } from "@/interfaces/interface";
import { StudentSignupPayload } from "@/interfaces/studentSignup";
import { LeadershipRoleApplicationPayload } from "@/interfaces/leadershipSignup";

import { requestClient } from "./baseRequest";



export const login = async (data: iLogin) => {
  try {
     return await requestClient
     .post(`/login`, data)
     .then((res) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};


export const signup = async (data: StudentSignupPayload) => {
  try {
     return await requestClient
     .post(`/club-application`, data)
     .then((res) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const submitLeadershipApplication = async (data: LeadershipRoleApplicationPayload) => {
  try {
     return await requestClient
     .post(`/role-application`, data)
     .then((res) => {
        return res?.data;
      });
  } catch (error) {
    return error as any;
  }
};

export const logout = async () => {
  return await requestClient.get(`v1/accounts/auth/logout/`).then((res) => {
    return res.data;
  });
};

export const forgetPassword = async (data: { otp_request_id: string; otp: string; new_password: string }) => {
  try {
    return await requestClient
      .post(`/auths/reset-password`, data)
      .then((res) => {
        return res?.data;
      });
  } catch (perfect) {
    return perfect;
  }
};