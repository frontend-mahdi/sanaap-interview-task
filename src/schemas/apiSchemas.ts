import { z } from "zod";

export const agencyCodeCheckResponseSchema = z.object({
  exists: z.boolean().optional(),
  error_details: z
    .object({
      fa_details: z.string(),
      en_details: z.string().optional(),
    })
    .optional(),
});

export type AgencyCodeCheckResponse = z.infer<typeof agencyCodeCheckResponseSchema>;

export const provinceSchema = z.object({
  id: z.union([z.number(), z.string()]),
  name: z.string(),
});

export const provincesResponseSchema = z.array(provinceSchema);
export type Province = z.infer<typeof provinceSchema>;

export const countySchema = z.object({
  id: z.union([z.number(), z.string()]),
  name: z.string(),
});

export const countiesResponseSchema = z.array(countySchema);
export type County = z.infer<typeof countySchema>;

export const insuranceBranchSchema = z.object({
  id: z.union([z.number(), z.string()]),
  name: z.string(),
});

export const insuranceBranchesResponseSchema = z.array(insuranceBranchSchema);
export type InsuranceBranch = z.infer<typeof insuranceBranchSchema>;

export const signupResponseSchema = z.object({
  token: z.string(),
});

export type SignupResponse = z.infer<typeof signupResponseSchema>;