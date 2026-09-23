import { apiClient } from "../lib/apiClient";
import { API_ENDPOINTS } from "../config/constants";
import {
  signupResponseSchema,
  extractTokens,
  type SignupResponse,
  type AuthTokens,
} from "../schemas/apiSchemas";
import type { RegistrationFormData } from "../schemas/formSchema";

export interface SignupPayload {
  Address: string;
  agency_type: string;
  agent_code: string;
  city_code: string;
  phone: string;
  phone_number: string;
  province: string;
  county: string;
  first_name: string;
  last_name: string;
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
    city_code: form.phone,
    phone: form.phone_number,
    phone_number: form.mobile_number,
    province: form.province,
    county: form.county,
    first_name: form.first_name,
    last_name: form.last_name,
    insurance_branch: form.insurance_branch,
    ...(form.agency_type === "legal" && form.name ? { name: form.name } : {}),
  };
}

export async function signup(form: RegistrationFormData): Promise<AuthTokens> {
  const data = await apiClient<unknown>(API_ENDPOINTS.signup, {
    method: "POST",
    body: mapFormToSignupPayload(form),
  });
  const parsed: SignupResponse = signupResponseSchema.parse(data);
  return extractTokens(parsed);
}