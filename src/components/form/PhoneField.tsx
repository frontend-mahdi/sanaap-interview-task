import { type FieldErrors, type UseFormRegister } from "react-hook-form";
import type { RegistrationFormData } from "../../schemas/formSchema";

interface PhoneFieldProps {
  register: UseFormRegister<RegistrationFormData>;
  errors: FieldErrors<RegistrationFormData>;
}

export function PhoneField({ register, errors }: PhoneFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
        تلفن ثابت
      </label>
      <div className="flex gap-3" dir="rtl">
        <div className="w-1/4">
          <input
            type="text"
            inputMode="numeric"
            placeholder="کد"
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-900"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-secondary" role="alert">
              {errors.phone.message}
            </p>
          )}
        </div>
        <div className="w-3/4">
          <input
            type="text"
            inputMode="numeric"
            placeholder="شماره تلفن ثابت"
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-900"
            {...register("phone_number")}
          />
          {errors.phone_number && (
            <p className="mt-1 text-xs text-secondary" role="alert">
              {errors.phone_number.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}