import { useMutation } from "@tanstack/react-query";
import { signup } from "../services/signupService";
import type { RegistrationFormData } from "../schemas/formSchema";

export function useSignup() {
  return useMutation({
    mutationFn: (form: RegistrationFormData) => signup(form),
    retry: false,
  });
}