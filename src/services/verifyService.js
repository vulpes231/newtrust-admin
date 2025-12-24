import { api } from "../features/interceptors";

export async function getVerificationData(userId) {
  try {
    const response = await api.get(`/manageverify/${userId}`);
    // console.log(response.data);
    return response.data.data;
  } catch (error) {
    const errMsg = error.response?.data?.message;
    throw new Error(errMsg);
  }
}

export async function approveAccount(formData) {
  const { userId } = formData;
  try {
    const response = await api.post(`/manageuser/${userId}`, formData);
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.message;
    throw new Error(errMsg);
  }
}
