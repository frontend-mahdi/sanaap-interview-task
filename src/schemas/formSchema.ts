import { z } from "zod";

export const negotiantTypeEnum = z.enum(["real", "legal"]);

export const registrationFormSchema = z
  .object({
    agent_code: z.string().min(1, "کد نمایندگی الزامی است"),
    first_name: z.string().min(1, "نام الزامی است"),
    last_name: z.string().min(1, "نام خانوادگی الزامی است"),
    province: z.string().min(1, "انتخاب استان الزامی است"),
    county: z.string().min(1, "انتخاب شهر الزامی است"),
    Address: z.string().min(1, "آدرس الزامی است"),
    insurance_branch: z.string().min(1, "انتخاب شعبه بیمه الزامی است"),
    phone: z
      .string()
      .min(1, "کد شهر الزامی است")
      .regex(/^\d{2,4}$/, "کد شهر معتبر نیست"),
    phone_number: z
      .string()
      .min(1, "شماره تلفن ثابت الزامی است")
      .regex(/^\d{7,8}$/, "شماره تلفن ثابت معتبر نیست"),
    mobile_number: z
      .string()
      .min(1, "شماره موبایل الزامی است")
      .regex(/^09\d{9}$/, "شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود"),
    agency_type: negotiantTypeEnum,
    name: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.agency_type === "legal" && (!data.name || data.name.trim() === "")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["name"],
        message: "نام نمایندگی الزامی است",
      });
    }
  });

export type RegistrationFormData = z.infer<typeof registrationFormSchema>;