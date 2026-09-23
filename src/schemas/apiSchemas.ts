import { z } from "zod";

/* ---------- shared envelope ---------- */

export const errorDetailsSchema = z.object({
  type: z.string().optional(),
  code: z.string().optional(),
  detail: z.string().optional(),
  attr: z.string().optional(),
  fa_details: z.string().optional(),
});

export const envelopeSchema = z.object({
  status_code: z.number(),
  message: z.string().optional(),
  is_success: z.boolean(),
  error_details: errorDetailsSchema.nullable().optional(),
  response: z.unknown(),
});

/* ---------- check agency code ---------- */

export const agencyCodeCheckSchema = envelopeSchema;

export type AgencyCodeCheckResponse = z.infer<typeof agencyCodeCheckSchema>;

/* ---------- provinces: raw array ---------- */

export const provinceSchema = z.object({
  id: z.number(),
  name: z.string(),
}).passthrough();

export const provincesResponseSchema = z.array(provinceSchema);
export type Province = z.infer<typeof provinceSchema>;

/* ---------- counties: raw array ---------- */

export const countySchema = z.object({
  id: z.number(),
  name: z.string(),
}).passthrough();

export const countiesResponseSchema = z.array(countySchema);
export type County = z.infer<typeof countySchema>;

/* ---------- insurance branches: envelope with array response ---------- */

export const insuranceBranchSchema = z.object({
  id: z.number(),
  name: z.string(),
}).passthrough();

export const insuranceBranchesSchema = envelopeSchema.extend({
  response: z.array(insuranceBranchSchema),
});

export type InsuranceBranch = z.infer<typeof insuranceBranchSchema>;
export type InsuranceBranchesResponse = z.infer<typeof insuranceBranchesSchema>;

/* ---------- signup: envelope, token lives in response ---------- */

export const authTokensSchema = z.object({
  refresh: z.string(),
  access: z.string(),
}).passthrough();

export const signupResponseSchema = envelopeSchema.extend({
  response: authTokensSchema,
});

export type AuthTokens = z.infer<typeof authTokensSchema>;
export type SignupResponse = z.infer<typeof signupResponseSchema>;

export function extractTokens(res: SignupResponse): AuthTokens {
  return {
    refresh: res.response.refresh,
    access: res.response.access,
  };
}