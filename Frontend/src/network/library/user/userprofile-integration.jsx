// import axiosClient from "../../apiClient";
import customAxios from '../../apiClient'

export function updateUser(data) {
    console.log(customAxios.baseURL)
  return customAxios.put(
    "/Authentication/update-user",
    JSON.stringify(data)
  );
}

export function deleteUser(email) {
    console.log(customAxios.baseURL)
  return customAxios.delete(`/Authentication/delete-user/${email}`);
}
