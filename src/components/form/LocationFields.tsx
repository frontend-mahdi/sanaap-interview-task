import { useEffect, useState } from "react";
import { type FieldErrors, type UseFormRegister, type UseFormSetValue, type UseFormWatch } from "react-hook-form";
import { getCounties, getProvinces } from "../../services/locationService";
import type { Province, County } from "../../schemas/apiSchemas";
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
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [counties, setCounties] = useState<County[]>([]);
  const [countiesLoading, setCountiesLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    getProvinces()
      .then(setProvinces)
      .catch((err: Error) => setLoadError(err.message));
  }, []);

  useEffect(() => {
    if (!provinceId) {
      setCounties([]);
      return;
    }
    const controller = new AbortController();
    setCountiesLoading(true);
    getCounties(provinceId)
      .then((data) => {
        setCounties(data);
        setLoadError(null);
      })
      .catch((err: Error) => {
        if (err.name !== "AbortError") setLoadError(err.message);
      })
      .finally(() => setCountiesLoading(false));
    return () => controller.abort();
  }, [provinceId]);

  return (
    <>
      <Field label="استان" error={loadError ?? errors.province?.message}>
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
          {provinces.map((p) => (
            <option key={p.id} value={String(p.id)}>
              {p.name}
            </option>
          ))}
        </select>
      </Field>

      <Field label="شهر" error={errors.county?.message}>
        <select
          className={inputClasses}
          defaultValue=""
          disabled={!provinceId || countiesLoading}
          {...register("county")}
        >
          <option value="" disabled>
            {provinceId ? "انتخاب شهر" : "ابتدا استان را انتخاب کنید"}
          </option>
          {counties.map((c) => (
            <option key={c.id} value={String(c.id)}>
              {c.name}
            </option>
          ))}
        </select>
      </Field>
    </>
  );
}