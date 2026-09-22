import { apiClient } from "../lib/apiClient";
import { API_ENDPOINTS, INSURANCE } from "../config/constants";
import {
    insuranceBranchesResponseSchema,
    type InsuranceBranch,
} from "../schemas/apiSchemas";

export async function getInsuranceBranches(
  name: string,
  province: string
): Promise<InsuranceBranch[]> {
  const data = await apiClient<unknown>(API_ENDPOINTS.insuranceBranches, {
    params: {
      name,
      province,
      insurance: INSURANCE,
    },
  });
  return insuranceBranchesResponseSchema.parse(data);
}