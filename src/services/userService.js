import { api } from "../features/interceptors";

export async function suspendUser(userId) {
  try {
    const response = await api.put(`/manageuser/${userId}`);
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message;
    throw new Error(errMsg);
  }
}

export async function deleteUser(userId) {
  try {
    const response = await api.delete(`/manageuser/${userId}`);
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message;
    throw new Error(errMsg);
  }
}

export async function getUserWallets(userId) {
  try {
    const response = await api.get(`/managewallet/${userId}`);
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message;
    throw new Error(errMsg);
  }
}

export async function getUserSettings(userId) {
  try {
    const response = await api.get(`/manageuser/settings/${userId}`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message;
    throw new Error(errMsg);
  }
}

export async function approveWallet(userId) {
  try {
    const response = await api.patch(`/manageuser/${userId}`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message;
    throw new Error(errMsg);
  }
}
