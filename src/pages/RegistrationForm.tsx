import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registrationFormSchema,
  type RegistrationFormData,
} from "../schemas/formSchema";
import { useSignup } from "../hooks/useSignup";
import { useCheckAgencyCode } from "../hooks/useCheckAgencyCode";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import { DEBOUNCE_MS } from "../config/constants";
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
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
     agency_type: "real",
      agent_code: "",
      first_name: "",
      last_name: "",
      province: "",
      county: "",
      Address: "",
      insurance_branch: "",
      phone: "",
      phone_number: "",
      mobile_number: "",
      name: "",
    },
  });

  const signupMutation = useSignup();

  const agentCode = watch("agent_code");
  const debouncedAgentCode = useDebouncedValue(agentCode, DEBOUNCE_MS);
  const codeCheck = useCheckAgencyCode(debouncedAgentCode);

  useEffect(() => {
    if (codeCheck.error) {
      setError("agent_code", {
        type: "server",
        message: codeCheck.error.message,
      });
    } else if (errors.agent_code?.type === "server") {
      clearErrors("agent_code");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeCheck.error, codeCheck.isSuccess]);

if (signupMutation.isSuccess) {
    return (
      <div className="mx-auto mt-16 max-w-md space-y-4 rounded-2xl border border-primary/30 bg-primary-light p-8 text-center dark:bg-gray-900">
        <h2 className="text-lg font-bold text-primary">
          ثبت‌نام با موفقیت انجام شد
        </h2>
        <div className="space-y-2 text-right">
          <div>
            <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
              Access Token
            </p>
            <p className="break-all rounded-lg bg-white p-3 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300">
              {signupMutation.data.access}
            </p>
          </div>
          <div>
            <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
              Refresh Token
            </p>
            <p className="break-all rounded-lg bg-white p-3 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300">
              {signupMutation.data.refresh}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit((data) => {
        if (codeCheck.isError) return;
        signupMutation.mutate(data);
      })}
      noValidate
      className="mx-auto grid w-full max-w-2xl grid-cols-1 gap-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-8"
    >
      <h1 className="mb-2 text-center text-xl font-bold text-primary">
        فرم ثبت‌نام نمایندگی
      </h1>

      <AgentCodeField
        register={register}
        errors={errors}
        serverError={codeCheck.error?.message ?? null}
        isChecking={codeCheck.isFetching}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="نام" error={errors.first_name?.message}>
          <input
            type="text"
            placeholder="نام"
            className={inputClasses}
            {...register("first_name")}
          />
        </Field>

        <Field label="نام خانوادگی" error={errors.last_name?.message}>
          <input
            type="text"
            placeholder="نام خانوادگی"
            className={inputClasses}
            {...register("last_name")}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <LocationFields
          register={register}
          watch={watch}
          errors={errors}
          setValue={setValue}
        />
      </div>

      <Field label="آدرس" error={errors.Address?.message}>
        <textarea rows={4} className={inputClasses} {...register("Address")} />
      </Field>

      <InsuranceBranchSelect
        register={register}
        watch={watch}
        errors={errors}
        setValue={setValue}
      />

      <PhoneField register={register} errors={errors} />

      <NegotiantTypeField register={register} watch={watch} errors={errors} />

      {signupMutation.isError && (
        <p
          className="rounded-lg bg-secondary-light px-3 py-2 text-sm text-secondary"
          role="alert"
        >
          {signupMutation.error.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting || signupMutation.isPending}
        className="mt-2 w-full rounded-lg bg-primary py-3 text-sm font-bold text-white transition hover:bg-primary-dark disabled:opacity-60"
      >
        {signupMutation.isPending ? "در حال ثبت…" : "ثبت نام"}
      </button>
    </form>
  );
}