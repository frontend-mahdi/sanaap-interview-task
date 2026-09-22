import { type FieldErrors, type UseFormRegister, type UseFormWatch } from "react-hook-form";
import type { RegistrationFormData } from "../../schemas/formSchema";
import { Field, inputClasses } from "../ui/Field";

interface NegotiantTypeFieldProps {
  register: UseFormRegister<RegistrationFormData>;
  watch: UseFormWatch<RegistrationFormData>;
  errors: FieldErrors<RegistrationFormData>;
}

export function NegotiantTypeField({
  register,
  watch,
  errors,
}: NegotiantTypeFieldProps) {
  const agencyType = watch("agency_type");

  return (
    <div className="flex flex-col gap-3">
      <Field label="نوع نمایندگی" error={errors.agency_type?.message}>
        <div className="flex items-center gap-6">
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="radio"
              value="real"
              className="h-4 w-4 accent-[#008e9c]"
              {...register("agency_type")}
            />
            حقیقی
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="radio"
              value="legal"
              className="h-4 w-4 accent-[#008e9c]"
              {...register("agency_type")}
            />
            حقوقی
          </label>
        </div>
      </Field>

      {agencyType === "legal" && (
        <Field label="نام نمایندگی" error={errors.name?.message}>
          <input
            type="text"
            placeholder="نام نمایندگی"
            className={inputClasses}
            {...register("name")}
          />
        </Field>
      )}
    </div>
  );
}