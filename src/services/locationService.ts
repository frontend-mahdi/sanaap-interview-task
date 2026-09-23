import { apiClient } from "../lib/apiClient";
import { API_ENDPOINTS } from "../config/constants";
import {
  provincesResponseSchema,
  countiesResponseSchema,
  type Province,
  type County,
} from "../schemas/apiSchemas";

export async function getProvinces(): Promise<Province[]> {
  const data = await apiClient<unknown>(API_ENDPOINTS.provinces);
  return provincesResponseSchema.parse(data);
}

export async function getCounties(provinceId: string): Promise<County[]> {
  const data = await apiClient<unknown>(API_ENDPOINTS.counties, {
    params: { province: provinceId },
  });
  return countiesResponseSchema.parse(data);
}