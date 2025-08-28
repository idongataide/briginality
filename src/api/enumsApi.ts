// {{baseUrl}}/api/{{apiVersion}}/accounts/profile/timezone/

import { requestClient } from "./baseRequest";


export const getRegions = async () => {
  try {
    return await requestClient
      .get(`/regions`)
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const getClubs = async () => {
  try {
    return await requestClient
      .get(`/clubs`)
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};

export const getClubsCat = async () => {
  try {
    return await requestClient
      .get(`/club-categories`)
      .then((res) => {
        return res?.data;
      });
  } catch (error) {
    return error;
  }
};
