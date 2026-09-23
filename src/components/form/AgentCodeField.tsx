import {
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import type { RegistrationFormData } from "../../schemas/formSchema";
import { Field, inputClasses } from "../ui/Field";

interface AgentCodeFieldProps {
  register: UseFormRegister<RegistrationFormData>;
  errors: FieldErrors<RegistrationFormData>;
  serverError: string | null;
  isChecking: boolean;
}

export function AgentCodeField({
  register,
  errors,
  serverError,
  isChecking,
}: AgentCodeFieldProps) {
  return (
    <Field label="کد نمایندگی" error={serverError ?? errors.agent_code?.message}>
      <input
        type="text"
        placeholder="کد نمایندگی"
        className={inputClasses}
        {...register("agent_code")}
      />
      {isChecking && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          در حال بررسی کد…
        </p>
      )}
    </Field>
  );
}