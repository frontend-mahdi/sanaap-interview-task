import { apiClient } from "../lib/apiClient";
import { API_ENDPOINTS } from "../config/constants";
import {
  agencyCodeCheckResponseSchema,
  type AgencyCodeCheckResponse,
} from "../schemas/apiSchemas";

export async function checkAgencyCode(
  agentCode: string
): Promise<AgencyCodeCheckResponse> {
  const data = await apiClient<unknown>(API_ENDPOINTS.checkAgencyCode, {
    method: "POST",
    body: { agent_code: agentCode },
  });
  return agencyCodeCheckResponseSchema.parse(data);
}