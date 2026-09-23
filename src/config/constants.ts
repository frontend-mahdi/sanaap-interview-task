export const BASE_API_URL = "https://stage-api.sanaap.co";

export const API_ENDPOINTS = {
  checkAgencyCode: `${BASE_API_URL}/api/v2/app/DEY/agent/verification/signup/check_agency_code/`,
  provinces: `${BASE_API_URL}/base/provinces_wop/`,
  counties: `${BASE_API_URL}/base/counties_wop/`,
  insuranceBranches: `${BASE_API_URL}/api/v2/app/selection_item/insurance_branch/wop_list/`,
  signup: `${BASE_API_URL}/api/v2/app/DEY/agent/verification/signup/`,
} as const;

export const INSURANCE = "DEY";

export const DEBOUNCE_MS = 600;