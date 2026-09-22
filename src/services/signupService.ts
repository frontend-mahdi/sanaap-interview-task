import { apiClient } from "../lib/apiClient";
import { API_ENDPOINTS } from "../config/constants";
import { signupResponseSchema, type SignupResponse } from "../schemas/apiSchemas";
import type { RegistrationFormData } from "../schemas/formSchema";

export interface SignupPayload {
  Address: string;
  agency_type: string;
  agent_code: string;
  city_code: string;
  phone: string;
  province: string;
  county: string;
  insurance_branch: string;
  name?: string;
}

export function mapFormToSignupPayload(
  form: RegistrationFormData
): SignupPayload {
  return {
    Address: form.Address,
    agency_type: form.agency_type,
    agent_code: form.agent_code,
    city_code: form.county,
    phone: form.phone,
    province: form.province,
    county: form.county,
    insurance_branch: form.insurance_branch,
    ...(form.agency_type === "legal" && form.name ? { name: form.name } : {}),
  };
}

export async function signup(
  form: RegistrationFormData
): Promise<SignupResponse> {
  const data = await apiClient<unknown>(API_ENDPOINTS.signup, {
    method: "POST",
    body: mapFormToSignupPayload(form),
  });
  return signupResponseSchema.parse(data);
}