import { type FieldErrors, type UseFormRegister, type UseFormWatch, type UseFormSetValue } from "react-hook-form";
import { useProvinces } from "../../hooks/useProvinces";
import { useCounties } from "../../hooks/useCounties";
import type { RegistrationFormData } from "../../schemas/formSchema";
import { Field, inputClasses } from "../ui/Field";

interface LocationFieldsProps {
  register: UseFormRegister<RegistrationFormData>;
  watch: UseFormWatch<RegistrationFormData>;
  errors: FieldErrors<RegistrationFormData>;
  setValue: UseFormSetValue<RegistrationFormData>;
}

export function LocationFields({ register, watch, errors, setValue }: LocationFieldsProps) {
  const provinceId = watch("province");

  const provincesQuery = useProvinces();
  const countiesQuery = useCounties(provinceId);

  return (
    <>
      <Field
        label="استان"
        error={provincesQuery.error?.message ?? errors.province?.message}
      >
        <select
          className={inputClasses}
          defaultValue=""
          {...register("province", {
            onChange: () => setValue("county", ""),
          })}
        >
          <option value="" disabled>
            انتخاب استان
          </option>
          {provincesQuery.data?.map((p) => (
            <option key={p.id} value={String(p.id)}>
              {p.name}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label="شهر"
        error={countiesQuery.error?.message ?? errors.county?.message}
      >
        <select
          className={inputClasses}
          defaultValue=""
          disabled={!provinceId || countiesQuery.isFetching}
          {...register("county")}
        >
          <option value="" disabled>
            {provinceId ? "انتخاب شهر" : "ابتدا استان را انتخاب کنید"}
          </option>
          {countiesQuery.data?.map((c) => (
            <option key={c.id} value={String(c.id)}>
              {c.name}
            </option>
          ))}
        </select>
      </Field>
    </>
  );
}