import type { ReactNode } from "react";

interface FieldProps {
  label: string;
  error?: string;
  children: ReactNode;
}

export function Field({ label, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-xs text-secondary" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export const inputClasses =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition " +
  "focus:border-primary focus:ring-2 focus:ring-primary/20 " +
  "dark:border-gray-700 dark:bg-gray-900 dark:focus:border-primary " +
  "disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 " +
  "dark:disabled:bg-gray-800 dark:disabled:text-gray-500";