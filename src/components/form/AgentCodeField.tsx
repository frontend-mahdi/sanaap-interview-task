import { useEffect, useState } from "react";
import { type FieldErrors, type UseFormRegister, type UseFormSetValue } from "react-hook-form";
import { checkAgencyCode } from "../../services/agencyCodeService";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import type { RegistrationFormData } from "../../schemas/formSchema";
import { Field, inputClasses } from "../ui/Field";

interface AgentCodeFieldProps {
  register: UseFormRegister<RegistrationFormData>;
  errors: FieldErrors<RegistrationFormData>;
  setValue: UseFormSetValue<RegistrationFormData>;
}

export function AgentCodeField({ register, errors, setValue }: AgentCodeFieldProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);
  const [rawCode, setRawCode] = useState("");
  const debouncedCode = useDebouncedValue(rawCode, 600);

  useEffect(() => {
    if (!debouncedCode.trim()) {
      setServerError(null);
      return;
    }

    const controller = new AbortController();
    setChecking(true);

    checkAgencyCode(debouncedCode)
      .then((res) => {
        if (res.exists) {
          setServerError(
            res.error_details?.fa_details ?? `کد نمایندگی ${debouncedCode} قبلا ثبت شده است`
          );
        } else {
          setServerError(null);
        }
      })
      .catch((err: Error) => {
        if (err.name !== "AbortError") {
          setServerError(err.message);
        }
      })
      .finally(() => setChecking(false));

    return () => controller.abort();
  }, [debouncedCode]);

  return (
    <Field label="کد نمایندگی" error={serverError ?? errors.agent_code?.message}>
      <input
        type="text"
        placeholder="کد نمایندگی"
        className={inputClasses}
        {...register("agent_code", {
          onChange: (e) => {
            setRawCode(e.target.value);
            setServerError(null);
          },
        })}
      />
      {checking && (
        <p className="text-xs text-gray-500 dark:text-gray-400">در حال بررسی کد…</p>
      )}
      <button type="button" hidden onClick={() => setValue("agent_code", rawCode)} />
    </Field>
  );
}