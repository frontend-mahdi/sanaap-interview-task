import { useEffect, useRef, useState, useDeferredValue } from "react";
import {
  type Control,
  type FieldErrors,
  type UseFormRegister,
  type UseFormSetValue,
  useWatch,
} from "react-hook-form";
import { useInsuranceBranches } from "../../hooks/useInsuranceBranches";
import type { RegistrationFormData } from "../../schemas/formSchema";
import { Field, inputClasses } from "../ui/Field";

interface InsuranceBranchSelectProps {
  register: UseFormRegister<RegistrationFormData>;
  control: Control<RegistrationFormData>;
  errors: FieldErrors<RegistrationFormData>;
  setValue: UseFormSetValue<RegistrationFormData>;
}

export function InsuranceBranchSelect({
  register,
  control,
  errors,
  setValue,
}: InsuranceBranchSelectProps) {
  const provinceId = useWatch({ control, name: "province" }) ?? "";
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const branchesQuery = useInsuranceBranches(deferredSearch, provinceId);
  const branches = branchesQuery.data ?? [];

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <Field
      label="شعبه بیمه"
      error={branchesQuery.error?.message ?? errors.insurance_branch?.message}
    >
      <div ref={containerRef} className="relative">
        <input
          type="text"
          className={inputClasses}
          placeholder={
            provinceId ? "جستجوی شعبه بیمه…" : "ابتدا استان را انتخاب کنید"
          }
          disabled={!provinceId}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
        />
        {open && provinceId && (
          <ul className="absolute z-10 mt-1 max-h-56 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
            {branchesQuery.isFetching && (
              <li className="px-3 py-2 text-sm text-gray-500">در حال جستجو…</li>
            )}
            {!branchesQuery.isFetching && branches.length === 0 && (
              <li className="px-3 py-2 text-sm text-gray-500">موردی یافت نشد</li>
            )}
            {!branchesQuery.isFetching &&
              branches.map((b) => (
                <li key={b.id}>
                  <button
                    type="button"
                    className="w-full px-3 py-2 text-right text-sm hover:bg-primary-light dark:hover:bg-gray-800"
                    onClick={() => {
                      setValue("insurance_branch", String(b.id), {
                        shouldValidate: true,
                      });
                      setSearch(b.name);
                      setOpen(false);
                    }}
                  >
                    {b.name}
                  </button>
                </li>
              ))}
          </ul>
        )}
        <input type="hidden" {...register("insurance_branch")} />
      </div>
    </Field>
  );
}