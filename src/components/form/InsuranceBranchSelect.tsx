import { useEffect, useMemo, useRef, useState } from "react";
import { useDeferredValue } from "react";
import { type FieldErrors, type UseFormRegister, type UseFormSetValue, type UseFormWatch } from "react-hook-form";
import { getInsuranceBranches } from "../../services/insuranceBranchService";
import type { InsuranceBranch } from "../../schemas/apiSchemas";
import type { RegistrationFormData } from "../../schemas/formSchema";
import { Field, inputClasses } from "../ui/Field";

interface InsuranceBranchSelectProps {
  register: UseFormRegister<RegistrationFormData>;
  watch: UseFormWatch<RegistrationFormData>;
  errors: FieldErrors<RegistrationFormData>;
  setValue: UseFormSetValue<RegistrationFormData>;
}

export function InsuranceBranchSelect({
  register,
  watch,
  errors,
  setValue,
}: InsuranceBranchSelectProps) {
  const provinceId = watch("province");
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const [branches, setBranches] = useState<InsuranceBranch[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!provinceId) {
      setBranches([]);
      return;
    }
    const controller = new AbortController();
    setLoading(true);
    getInsuranceBranches(deferredSearch, provinceId)
      .then((data) => {
        setBranches(data);
        setError(null);
      })
      .catch((err: Error) => {
        if (err.name !== "AbortError") setError(err.message);
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [deferredSearch, provinceId]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const selectedName = useMemo(
    () => branches.find((b) => String(b.id) === watch("insurance_branch"))?.name,
    [branches, watch]
  );

  return (
    <Field label="شعبه بیمه" error={error ?? errors.insurance_branch?.message}>
      <div ref={containerRef} className="relative">
        <input
          type="text"
          className={inputClasses}
          placeholder={
            provinceId
              ? selectedName ?? "جستجوی شعبه بیمه…"
              : "ابتدا استان را انتخاب کنید"
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
            {loading && (
              <li className="px-3 py-2 text-sm text-gray-500">در حال جستجو…</li>
            )}
            {!loading && branches.length === 0 && (
              <li className="px-3 py-2 text-sm text-gray-500">موردی یافت نشد</li>
            )}
            {!loading &&
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