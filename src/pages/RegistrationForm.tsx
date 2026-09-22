import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    registrationFormSchema,
    type RegistrationFormData,
} from "../schemas/formSchema";
import { signup } from "../services/signupService";
import { AgentCodeField } from "../components/form/AgentCodeField";
import { LocationFields } from "../components/form/LocationFields";
import { InsuranceBranchSelect } from "../components/form/InsuranceBranchSelect";
import { PhoneField } from "../components/form/PhoneField";
import { NegotiantTypeField } from "../components/form/NegotiantTypeField";
import { Field, inputClasses } from "../components/ui/Field";

export function RegistrationForm() {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      agency_type: "real",
      agent_code: "",
      province: "",
      county: "",
      Address: "",
      insurance_branch: "",
      phone: "",
      phone_number: "",
      name: "",
    },
  });

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successToken, setSuccessToken] = useState<string | null>(null);

  const onSubmit = async (data: RegistrationFormData) => {
    setSubmitError(null);
    try {
      const res = await signup(data);
      setSuccessToken(res.token);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "خطا در ثبت‌نام");
    }
  };

  if (successToken) {
    return (
      <div className="mx-auto mt-16 max-w-md rounded-2xl border border-primary/30 bg-primary-light p-8 text-center dark:bg-gray-900">
        <h2 className="mb-3 text-lg font-bold text-primary">ثبت‌نام با موفقیت انجام شد</h2>
        <p className="break-all text-sm text-gray-600 dark:text-gray-300">
          توکن: {successToken}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="mx-auto grid w-full max-w-2xl grid-cols-1 gap-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-8"
    >
      <h1 className="mb-2 text-center text-xl font-bold text-primary">
        فرم ثبت‌نام نمایندگی
      </h1>

      <AgentCodeField register={register} errors={errors} setValue={setValue} />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <LocationFields register={register} watch={watch} errors={errors} setValue={setValue} />
      </div>

      <Field label="آدرس" error={errors.Address?.message}>
        <textarea rows={4} className={inputClasses} {...register("Address")} />
      </Field>

      <InsuranceBranchSelect register={register} watch={watch} errors={errors} setValue={setValue} />

      <PhoneField register={register} errors={errors} />

      <NegotiantTypeField register={register} watch={watch} errors={errors} />

      {submitError && (
        <p className="rounded-lg bg-secondary-light px-3 py-2 text-sm text-secondary" role="alert">
          {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 w-full rounded-lg bg-primary py-3 text-sm font-bold text-white transition hover:bg-primary-dark disabled:opacity-60"
      >
        {isSubmitting ? "در حال ثبت…" : "ثبت نام"}
      </button>
    </form>
  );
}