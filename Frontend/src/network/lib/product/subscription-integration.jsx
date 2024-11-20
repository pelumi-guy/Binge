import axiosInstance from "../../../axiosSettings/httpSetup";
import axiosClient from "../../apiClient";

export function getPlans() {
  return axiosInstance.get("/api/v1/Plan/GetPlanFeatures");
}
