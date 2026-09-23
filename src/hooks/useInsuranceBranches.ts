import { useQuery } from "@tanstack/react-query";
import { getInsuranceBranches } from "../services/insuranceBranchService";

export function useInsuranceBranches(search: string, provinceId: string) {
  return useQuery({
    queryKey: ["insurance-branches", provinceId, search],
    queryFn: () => getInsuranceBranches(search, provinceId),
    enabled: !!provinceId,
    placeholderData: (prev) => prev,
  });
}