import { type FieldErrors, type UseFormRegister } from "react-hook-form";
import type { RegistrationFormData } from "../../schemas/formSchema";
import { inputClasses } from "../ui/Field";

interface PhoneFieldProps {
  register: UseFormRegister<RegistrationFormData>;
  errors: FieldErrors<RegistrationFormData>;
}

export function PhoneField({ register, errors }: PhoneFieldProps) {
  return (
    <div className="flex flex-col gap-5">
      {/* تلفن ثابت: کد شهر + شماره در یک ردیف با یک لیبل مشترک */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
          تلفن ثابت
        </label>
        <div className="flex flex-row-reverse gap-3">
          <div className="w-1/4">
            <input
              type="text"
              inputMode="numeric"
              placeholder="021"
              className={inputClasses}
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
              placeholder="11223344"
              className={inputClasses}
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

      {/* شماره موبایل */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
          شماره موبایل
        </label>
        <input
          type="text"
          inputMode="numeric"
          dir="ltr"
          placeholder="09123123123"
          className={inputClasses}
          {...register("mobile_number")}
        />
        {errors.mobile_number && (
          <p className="text-xs text-secondary" role="alert">
            {errors.mobile_number.message}
          </p>
        )}
      </div>
    </div>
  );
}